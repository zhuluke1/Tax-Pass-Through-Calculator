import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { quizzes } from '../data/quizData';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

type ProgressScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Progress'>;

interface QuizResult {
  score: number;
  totalQuestions: number;
  date: string;
}

interface QuizResults {
  [quizId: string]: QuizResult;
}

export default function ProgressScreen() {
  const navigation = useNavigation<ProgressScreenNavigationProp>();
  const [quizResults, setQuizResults] = useState<QuizResults>({});
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadQuizResults();
  }, []);
  
  const loadQuizResults = async () => {
    try {
      const results = await AsyncStorage.getItem('quizResults');
      if (results) {
        setQuizResults(JSON.parse(results));
      }
      setLoading(false);
    } catch (error) {
      console.error('Error loading quiz results:', error);
      setLoading(false);
    }
  };
  
  const getQuizTitle = (quizId: string) => {
    const quiz = quizzes.find(q => q.id === quizId);
    return quiz ? quiz.title : 'Unknown Quiz';
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  const calculateOverallProgress = () => {
    if (Object.keys(quizResults).length === 0) return 0;
    
    let totalScore = 0;
    let totalQuestions = 0;
    
    Object.values(quizResults).forEach(result => {
      totalScore += result.score;
      totalQuestions += result.totalQuestions;
    });
    
    return Math.round((totalScore / totalQuestions) * 100);
  };
  
  const getCompletedQuizCount = () => {
    return Object.keys(quizResults).length;
  };
  
  const getTotalQuizCount = () => {
    return quizzes.length;
  };
  
  const getChartData = () => {
    const data = {
      labels: Object.keys(quizResults).map(quizId => {
        const title = getQuizTitle(quizId);
        // Shorten long titles
        return title.length > 10 ? title.substring(0, 10) + '...' : title;
      }),
      datasets: [
        {
          data: Object.values(quizResults).map(result => 
            Math.round((result.score / result.totalQuestions) * 100)
          ),
        },
      ],
    };
    
    return data;
  };
  
  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(52, 152, 219, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.7,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
  };
  
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Your Progress</Text>
        </View>
        <View style={styles.loadingContainer}>
          <Text>Loading your progress...</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Progress</Text>
      </View>
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.overviewContainer}>
          <View style={styles.overviewItem}>
            <Text style={styles.overviewValue}>{calculateOverallProgress()}%</Text>
            <Text style={styles.overviewLabel}>Overall Score</Text>
          </View>
          
          <View style={styles.overviewDivider} />
          
          <View style={styles.overviewItem}>
            <Text style={styles.overviewValue}>{getCompletedQuizCount()}/{getTotalQuizCount()}</Text>
            <Text style={styles.overviewLabel}>Quizzes Completed</Text>
          </View>
        </View>
        
        {Object.keys(quizResults).length > 0 ? (
          <>
            <View style={styles.chartContainer}>
              <Text style={styles.chartTitle}>Quiz Performance</Text>
              <BarChart
                data={getChartData()}
                width={Dimensions.get('window').width - 32}
                height={220}
                chartConfig={chartConfig}
                verticalLabelRotation={30}
                fromZero
                yAxisSuffix="%"
                yAxisLabel=""
                style={styles.chart}
              />
            </View>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Quiz History</Text>
              {Object.entries(quizResults).map(([quizId, result]) => (
                <View key={quizId} style={styles.quizResultCard}>
                  <View style={styles.quizResultHeader}>
                    <Text style={styles.quizResultTitle}>{getQuizTitle(quizId)}</Text>
                    <Text style={styles.quizResultDate}>{formatDate(result.date)}</Text>
                  </View>
                  
                  <View style={styles.quizResultDetails}>
                    <Text style={styles.quizResultScore}>
                      Score: {result.score}/{result.totalQuestions} ({Math.round((result.score / result.totalQuestions) * 100)}%)
                    </Text>
                    
                    <TouchableOpacity 
                      style={styles.retakeButton}
                      onPress={() => navigation.navigate('Quiz', { 
                        quizId, 
                        quizTitle: getQuizTitle(quizId) 
                      })}
                    >
                      <MaterialIcons name="replay" size={16} color="#3498db" />
                      <Text style={styles.retakeButtonText}>Retake</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </>
        ) : (
          <View style={styles.emptyStateContainer}>
            <MaterialIcons name="school" size={64} color="#bdc3c7" />
            <Text style={styles.emptyStateTitle}>No Quizzes Completed Yet</Text>
            <Text style={styles.emptyStateText}>
              Complete quizzes to track your progress and see your improvement over time.
            </Text>
            <TouchableOpacity 
              style={styles.startQuizButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.startQuizButtonText}>Start Learning</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#3498db',
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginLeft: 16,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  overviewContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  overviewItem: {
    flex: 1,
    alignItems: 'center',
  },
  overviewDivider: {
    width: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 16,
  },
  overviewValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 4,
  },
  overviewLabel: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
  },
  chart: {
    borderRadius: 8,
    marginVertical: 8,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
  },
  quizResultCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  quizResultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  quizResultTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  quizResultDate: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  quizResultDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quizResultScore: {
    fontSize: 15,
    color: '#34495e',
  },
  retakeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#3498db',
  },
  retakeButtonText: {
    fontSize: 14,
    color: '#3498db',
    marginLeft: 4,
  },
  emptyStateContainer: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 15,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 24,
  },
  startQuizButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  startQuizButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});