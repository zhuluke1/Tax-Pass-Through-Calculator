import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../../types/navigation';

type GamePlayScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'GamePlay'>;
type GamePlayScreenRouteProp = RouteProp<RootStackParamList, 'GamePlay'>;

interface Question {
  id: string;
  text: string;
  explanation: string;
  inputFields: {
    id: string;
    label: string;
    correctAnswer: string;
    userAnswer?: string;
  }[];
}

interface GameScenario {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export default function GamePlayScreen() {
  const navigation = useNavigation<GamePlayScreenNavigationProp>();
  const route = useRoute<GamePlayScreenRouteProp>();
  const { levelId, levelTitle } = route.params;
  
  const [scenario, setScenario] = useState<GameScenario | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{[key: string]: string}>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadScenario();
  }, [levelId]);

  const loadScenario = async () => {
    setLoading(true);
    
    // In a real app, this would come from a database or API
    // For this example, we'll use hardcoded scenarios based on levelId
    let scenarioData: GameScenario;
    
    if (levelId === '1') {
      scenarioData = {
        id: '1',
        title: 'Basic Partnership Allocation',
        description: 'ABC Partnership has two equal partners, Alex and Bailey. For the tax year, the partnership earned $100,000 in ordinary business income and had $20,000 in business expenses.',
        questions: [
          {
            id: '1-1',
            text: 'Calculate each partner\'s distributive share of ordinary business income.',
            explanation: 'Since Alex and Bailey are equal partners (50% each), they each receive half of the net income. Net income is $100,000 - $20,000 = $80,000. Each partner\'s share is $80,000 × 50% = $40,000.',
            inputFields: [
              {
                id: 'alex-income',
                label: 'Alex\'s distributive share ($)',
                correctAnswer: '40000',
              },
              {
                id: 'bailey-income',
                label: 'Bailey\'s distributive share ($)',
                correctAnswer: '40000',
              }
            ]
          },
          {
            id: '1-2',
            text: 'If Alex\'s basis in the partnership was $30,000 at the beginning of the year and no distributions were made, what is Alex\'s ending basis?',
            explanation: 'A partner\'s basis increases by their share of partnership income. Alex\'s beginning basis was $30,000, and their share of income was $40,000. So the ending basis is $30,000 + $40,000 = $70,000.',
            inputFields: [
              {
                id: 'alex-ending-basis',
                label: 'Alex\'s ending basis ($)',
                correctAnswer: '70000',
              }
            ]
          }
        ]
      };
    } else if (levelId === '2') {
      scenarioData = {
        id: '2',
        title: 'Special Allocations',
        description: 'XYZ Partnership has two partners: Xavier (60% profits/losses) and Yara (40% profits/losses). However, their partnership agreement specifies that depreciation deductions are allocated 70% to Xavier and 30% to Yara. For the tax year, the partnership had $150,000 in ordinary income and $50,000 in depreciation deductions.',
        questions: [
          {
            id: '2-1',
            text: 'Calculate each partner\'s distributive share of ordinary income before depreciation.',
            explanation: 'Ordinary income is allocated according to the general profit/loss ratio. Xavier gets 60% of $150,000 = $90,000. Yara gets 40% of $150,000 = $60,000.',
            inputFields: [
              {
                id: 'xavier-ordinary-income',
                label: 'Xavier\'s ordinary income ($)',
                correctAnswer: '90000',
              },
              {
                id: 'yara-ordinary-income',
                label: 'Yara\'s ordinary income ($)',
                correctAnswer: '60000',
              }
            ]
          },
          {
            id: '2-2',
            text: 'Calculate each partner\'s share of depreciation deductions.',
            explanation: 'Depreciation is specially allocated 70/30. Xavier gets 70% of $50,000 = $35,000. Yara gets 30% of $50,000 = $15,000.',
            inputFields: [
              {
                id: 'xavier-depreciation',
                label: 'Xavier\'s depreciation ($)',
                correctAnswer: '35000',
              },
              {
                id: 'yara-depreciation',
                label: 'Yara\'s depreciation ($)',
                correctAnswer: '15000',
              }
            ]
          },
          {
            id: '2-3',
            text: 'Calculate each partner\'s net distributive share after depreciation.',
            explanation: 'Xavier\'s net share is $90,000 - $35,000 = $55,000. Yara\'s net share is $60,000 - $15,000 = $45,000.',
            inputFields: [
              {
                id: 'xavier-net-income',
                label: 'Xavier\'s net income ($)',
                correctAnswer: '55000',
              },
              {
                id: 'yara-net-income',
                label: 'Yara\'s net income ($)',
                correctAnswer: '45000',
              }
            ]
          }
        ]
      };
    } else {
      // Default scenario for other levels (placeholder)
      scenarioData = {
        id: levelId,
        title: 'Coming Soon',
        description: 'This level is under development. Please check back later!',
        questions: [
          {
            id: `${levelId}-1`,
            text: 'This is a placeholder question. What is 2 + 2?',
            explanation: 'The answer is 4, which is the sum of 2 and 2.',
            inputFields: [
              {
                id: 'placeholder',
                label: 'Answer',
                correctAnswer: '4',
              }
            ]
          }
        ]
      };
    }
    
    setScenario(scenarioData);
    setLoading(false);
  };

  const handleInputChange = (fieldId: string, value: string) => {
    setUserAnswers({
      ...userAnswers,
      [fieldId]: value.trim(),
    });
  };

  const checkAnswers = () => {
    if (!scenario) return;
    
    const currentQuestion = scenario.questions[currentQuestionIndex];
    let allCorrect = true;
    
    for (const field of currentQuestion.inputFields) {
      const userAnswer = userAnswers[field.id] || '';
      if (userAnswer !== field.correctAnswer) {
        allCorrect = false;
        break;
      }
    }
    
    setIsCorrect(allCorrect);
    setShowExplanation(true);
    setAttempts(attempts + 1);
    
    if (allCorrect) {
      // If this is the last question and it's correct, mark level as completed
      if (currentQuestionIndex === scenario.questions.length - 1) {
        markLevelAsCompleted();
      }
    }
  };

  const markLevelAsCompleted = async () => {
    try {
      // Get current progress
      const savedProgress = await AsyncStorage.getItem('gameProgress');
      if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        
        // Find and update the completed level
        const updatedProgress = progress.map((level: any) => {
          if (level.id === levelId) {
            return { ...level, completed: true };
          }
          
          // Unlock the next level if it exists
          if (level.id === String(Number(levelId) + 1)) {
            return { ...level, locked: false };
          }
          
          return level;
        });
        
        // Save updated progress
        await AsyncStorage.setItem('gameProgress', JSON.stringify(updatedProgress));
      }
    } catch (error) {
      console.error('Failed to update game progress:', error);
    }
  };

  const handleNextQuestion = () => {
    if (!scenario) return;
    
    if (currentQuestionIndex < scenario.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowExplanation(false);
      setIsCorrect(false);
      setAttempts(0);
      setUserAnswers({});
    } else {
      // Last question completed
      Alert.alert(
        'Level Completed!',
        'Congratulations! You\'ve completed this level.',
        [
          { 
            text: 'Return to Levels', 
            onPress: () => navigation.navigate('GameLevels') 
          }
        ]
      );
    }
  };

  if (loading || !scenario) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading scenario...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const currentQuestion = scenario.questions[currentQuestionIndex];

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
        <Text style={styles.headerTitle}>{levelTitle}</Text>
      </View>
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView style={styles.scrollView}>
          <View style={styles.content}>
            <View style={styles.scenarioCard}>
              <Text style={styles.scenarioTitle}>{scenario.title}</Text>
              <Text style={styles.scenarioDescription}>{scenario.description}</Text>
            </View>
            
            <View style={styles.progressIndicator}>
              <Text style={styles.progressText}>
                Question {currentQuestionIndex + 1} of {scenario.questions.length}
              </Text>
            </View>
            
            <View style={styles.questionCard}>
              <Text style={styles.questionText}>{currentQuestion.text}</Text>
              
              {currentQuestion.inputFields.map((field) => (
                <View key={field.id} style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>{field.label}</Text>
                  <TextInput
                    style={[
                      styles.input,
                      showExplanation && (
                        userAnswers[field.id] === field.correctAnswer 
                          ? styles.correctInput 
                          : styles.incorrectInput
                      )
                    ]}
                    keyboardType="numeric"
                    value={userAnswers[field.id] || ''}
                    onChangeText={(text) => handleInputChange(field.id, text)}
                    editable={!showExplanation}
                  />
                </View>
              ))}
              
              {!showExplanation ? (
                <TouchableOpacity 
                  style={styles.checkButton} 
                  onPress={checkAnswers}
                >
                  <Text style={styles.checkButtonText}>Check Answers</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.explanationContainer}>
                  <View style={[
                    styles.resultBadge,
                    isCorrect ? styles.correctBadge : styles.incorrectBadge
                  ]}>
                    <Text style={styles.resultText}>
                      {isCorrect ? 'Correct!' : 'Try Again'}
                    </Text>
                  </View>
                  
                  <Text style={styles.explanationTitle}>Explanation:</Text>
                  <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>
                  
                  {isCorrect || attempts >= 2 ? (
                    <TouchableOpacity 
                      style={styles.nextButton} 
                      onPress={handleNextQuestion}
                    >
                      <Text style={styles.nextButtonText}>
                        {currentQuestionIndex < scenario.questions.length - 1 
                          ? 'Next Question' 
                          : 'Complete Level'}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity 
                      style={styles.tryAgainButton} 
                      onPress={() => setShowExplanation(false)}
                    >
                      <Text style={styles.tryAgainButtonText}>Try Again</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  scenarioCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  scenarioTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  scenarioDescription: {
    fontSize: 15,
    lineHeight: 22,
    color: '#34495e',
  },
  progressIndicator: {
    marginBottom: 16,
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  questionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#dcdde1',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  correctInput: {
    borderColor: '#2ecc71',
    backgroundColor: '#e8f8f5',
  },
  incorrectInput: {
    borderColor: '#e74c3c',
    backgroundColor: '#fdedec',
  },
  checkButton: {
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  checkButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  explanationContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dcdde1',
  },
  resultBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 12,
  },
  correctBadge: {
    backgroundColor: '#d5f5e3',
  },
  incorrectBadge: {
    backgroundColor: '#fadbd8',
  },
  resultText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#34495e',
    marginBottom: 16,
  },
  nextButton: {
    backgroundColor: '#2ecc71',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tryAgainButton: {
    backgroundColor: '#e74c3c',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  tryAgainButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#7f8c8d',
  },
});