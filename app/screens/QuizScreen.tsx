import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { quizzes, QuizQuestion } from '../data/quizData';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

type QuizRouteProp = RouteProp<RootStackParamList, 'Quiz'>;
type QuizNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Quiz'>;

export default function QuizScreen() {
  const route = useRoute<QuizRouteProp>();
  const navigation = useNavigation<QuizNavigationProp>();
  const { quizId, quizTitle } = route.params;
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  
  useEffect(() => {
    const quizData = quizzes.find(q => q.id === quizId);
    if (quizData) {
      setQuiz(quizData.questions);
    } else {
      Alert.alert('Error', 'Quiz not found');
      navigation.goBack();
    }
  }, [quizId]);
  
  const handleOptionSelect = (optionIndex: number) => {
    if (isAnswered) return;
    
    setSelectedOption(optionIndex);
    setIsAnswered(true);
    
    if (optionIndex === quiz[currentQuestionIndex]?.correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }
  };
  
  const handleNext = async () => {
    if (currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Quiz completed
      try {
        // Save quiz result
        const quizResults = await AsyncStorage.getItem('quizResults');
        const results = quizResults ? JSON.parse(quizResults) : {};
        
        results[quizId] = {
          score,
          totalQuestions: quiz.length,
          date: new Date().toISOString(),
        };
        
        await AsyncStorage.setItem('quizResults', JSON.stringify(results));
        
        // Navigate to results screen
        navigation.replace('QuizResults', {
          score,
          totalQuestions: quiz.length,
          quizId,
        });
      } catch (error) {
        console.error('Error saving quiz results:', error);
        navigation.replace('QuizResults', {
          score,
          totalQuestions: quiz.length,
          quizId,
        });
      }
    }
  };
  
  if (quiz.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{quizTitle}</Text>
        </View>
        <View style={styles.loadingContainer}>
          <Text>Loading quiz questions...</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  const currentQuestion = quiz[currentQuestionIndex];
  
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
        <Text style={styles.headerTitle}>{quizTitle}</Text>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${((currentQuestionIndex + 1) / quiz.length) * 100}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          Question {currentQuestionIndex + 1} of {quiz.length}
        </Text>
      </View>
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
        </View>
        
        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedOption === index && isAnswered && 
                  (index === currentQuestion.correctAnswer ? styles.correctOption : styles.incorrectOption),
                selectedOption === null && styles.optionButtonDefault
              ]}
              onPress={() => handleOptionSelect(index)}
              disabled={isAnswered}
            >
              <Text style={[
                styles.optionText,
                selectedOption === index && isAnswered && 
                  (index === currentQuestion.correctAnswer ? styles.correctOptionText : styles.incorrectOptionText)
              ]}>
                {option}
              </Text>
              {isAnswered && index === currentQuestion.correctAnswer && (
                <MaterialIcons name="check-circle" size={24} color="#27ae60" style={styles.optionIcon} />
              )}
              {isAnswered && selectedOption === index && index !== currentQuestion.correctAnswer && (
                <MaterialIcons name="cancel" size={24} color="#e74c3c" style={styles.optionIcon} />
              )}
            </TouchableOpacity>
          ))}
        </View>
        
        {isAnswered && (
          <View style={styles.explanationContainer}>
            <Text style={styles.explanationTitle}>Explanation:</Text>
            <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>
          </View>
        )}
        
        {isAnswered && (
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {currentQuestionIndex < quiz.length - 1 ? 'Next Question' : 'See Results'}
            </Text>
            <MaterialIcons name="arrow-forward" size={20} color="white" />
          </TouchableOpacity>
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
  progressContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#ecf0f1',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3498db',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'right',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  questionContainer: {
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
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    lineHeight: 26,
  },
  optionsContainer: {
    marginBottom: 16,
  },
  optionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  optionButtonDefault: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  correctOption: {
    backgroundColor: '#e8f8f5',
    borderWidth: 1,
    borderColor: '#27ae60',
  },
  incorrectOption: {
    backgroundColor: '#fdedec',
    borderWidth: 1,
    borderColor: '#e74c3c',
  },
  optionText: {
    fontSize: 16,
    color: '#34495e',
    flex: 1,
  },
  correctOptionText: {
    color: '#27ae60',
    fontWeight: '500',
  },
  incorrectOptionText: {
    color: '#e74c3c',
    fontWeight: '500',
  },
  optionIcon: {
    marginLeft: 8,
  },
  explanationContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#34495e',
  },
  nextButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db',
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});