import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { quizzes } from '../data/quizData';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

type QuizResultsRouteProp = RouteProp<RootStackParamList, 'QuizResults'>;
type QuizResultsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'QuizResults'>;

export default function QuizResultsScreen() {
  const route = useRoute<QuizResultsRouteProp>();
  const navigation = useNavigation<QuizResultsNavigationProp>();
  const { score, totalQuestions, quizId } = route.params;
  
  const [quizTitle, setQuizTitle] = useState('');
  const [previousBest, setPreviousBest] = useState<number | null>(null);
  const [isNewBest, setIsNewBest] = useState(false);
  
  useEffect(() => {
    const quiz = quizzes.find(q => q.id === quizId);
    if (quiz) {
      setQuizTitle(quiz.title);
    }
    
    const checkPreviousBest = async () => {
      try {
        const quizResults = await AsyncStorage.getItem('quizResults');
        if (quizResults) {
          const results = JSON.parse(quizResults);
          const previousResults = results[quizId];
          
          if (previousResults && previousResults.score !== undefined) {
            setPreviousBest(previousResults.score);
            setIsNewBest(score > previousResults.score);
          } else {
            setIsNewBest(true);
          }
        } else {
          setIsNewBest(true);
        }
      } catch (error) {
        console.error('Error checking previous best:', error);
      }
    };
    
    checkPreviousBest();
  }, [quizId, score]);
  
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getFeedback = () => {
    if (percentage >= 90) {
      return "Excellent! You have a strong understanding of this topic.";
    } else if (percentage >= 70) {
      return "Good job! You have a solid grasp of the material.";
    } else if (percentage >= 50) {
      return "You're making progress! Review the areas you missed and try again.";
    } else {
      return "Keep studying! Review the material and try again to improve your score.";
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.backButtonText}>← Home</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Quiz Results</Text>
      </View>
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.quizInfoContainer}>
          <Text style={styles.quizTitle}>{quizTitle}</Text>
        </View>
        
        <View style={styles.scoreContainer}>
          <View style={styles.scoreCircle}>
            <Text style={styles.scorePercentage}>{percentage}%</Text>
            <Text style={styles.scoreFraction}>
              {score} / {totalQuestions}
            </Text>
          </View>
          
          {isNewBest && (
            <View style={styles.newBestContainer}>
              <MaterialIcons name="emoji-events" size={24} color="#f39c12" />
              <Text style={styles.newBestText}>New Personal Best!</Text>
            </View>
          )}
          
          {previousBest !== null && !isNewBest && (
            <Text style={styles.previousBestText}>
              Previous best: {previousBest} / {totalQuestions}
            </Text>
          )}
        </View>
        
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackText}>{getFeedback()}</Text>
        </View>
        
        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.retakeButton]} 
            onPress={() => navigation.replace('Quiz', { quizId, quizTitle })}
          >
            <MaterialIcons name="replay" size={20} color="#3498db" />
            <Text style={styles.retakeButtonText}>Retake Quiz</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.studyButton]} 
            onPress={() => navigation.navigate('Reference')}
          >
            <MaterialIcons name="menu-book" size={20} color="#27ae60" />
            <Text style={styles.studyButtonText}>Study Material</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.nextButton} 
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.nextButtonText}>Continue Learning</Text>
          <MaterialIcons name="arrow-forward" size={20} color="white" />
        </TouchableOpacity>
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
    alignItems: 'center',
  },
  quizInfoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  quizTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  scoreCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  scorePercentage: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#3498db',
  },
  scoreFraction: {
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 4,
  },
  newBestContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff8e1',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginTop: 8,
  },
  newBestText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#f39c12',
    marginLeft: 8,
  },
  previousBestText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 8,
  },
  feedbackContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  feedbackText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#34495e',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 8,
  },
  retakeButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#3498db',
  },
  retakeButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3498db',
    marginLeft: 8,
  },
  studyButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#27ae60',
  },
  studyButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#27ae60',
    marginLeft: 8,
  },
  nextButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db',
    borderRadius: 8,
    padding: 16,
    width: '100%',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 8,
  },
});