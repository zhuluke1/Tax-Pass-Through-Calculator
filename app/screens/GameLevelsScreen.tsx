import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../../types/navigation';

type GameLevelsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'GameLevels'>;

interface Level {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  completed: boolean;
  locked: boolean;
}

export default function GameLevelsScreen() {
  const navigation = useNavigation<GameLevelsScreenNavigationProp>();
  const [levels, setLevels] = useState<Level[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLevels = async () => {
      try {
        // Try to get saved progress
        const savedProgress = await AsyncStorage.getItem('gameProgress');
        
        // Default levels
        const defaultLevels: Level[] = [
          {
            id: '1',
            title: 'Partnership Basics',
            description: 'Learn how to calculate basic partnership income allocations',
            difficulty: 'Beginner',
            completed: false,
            locked: false,
          },
          {
            id: '2',
            title: 'Special Allocations',
            description: 'Handle special allocations of income and deductions',
            difficulty: 'Beginner',
            completed: false,
            locked: true,
          },
          {
            id: '3',
            title: 'Partner Basis Calculations',
            description: 'Calculate and adjust partner basis throughout the tax year',
            difficulty: 'Intermediate',
            completed: false,
            locked: true,
          },
          {
            id: '4',
            title: 'Loss Limitations',
            description: 'Apply at-risk and passive activity loss limitations',
            difficulty: 'Intermediate',
            completed: false,
            locked: true,
          },
          {
            id: '5',
            title: 'Section 754 Elections',
            description: 'Handle optional basis adjustments under Section 754',
            difficulty: 'Advanced',
            completed: false,
            locked: true,
          },
        ];
        
        if (savedProgress) {
          // If we have saved progress, use it
          setLevels(JSON.parse(savedProgress));
        } else {
          // Otherwise use default levels
          setLevels(defaultLevels);
          // Save default levels
          await AsyncStorage.setItem('gameProgress', JSON.stringify(defaultLevels));
        }
      } catch (error) {
        console.error('Failed to load game progress:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadLevels();
  }, []);

  const handleLevelPress = (level: Level) => {
    if (level.locked) return;
    
    navigation.navigate('GamePlay', { 
      levelId: level.id,
      levelTitle: level.title
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#2ecc71';
      case 'Intermediate': return '#f39c12';
      case 'Advanced': return '#e74c3c';
      default: return '#3498db';
    }
  };

  const renderLevel = ({ item }: { item: Level }) => (
    <TouchableOpacity
      style={[
        styles.levelCard,
        item.locked && styles.lockedLevel,
        item.completed && styles.completedLevel
      ]}
      onPress={() => handleLevelPress(item)}
      disabled={item.locked}
    >
      <View style={styles.levelHeader}>
        <Text style={styles.levelTitle}>{item.title}</Text>
        <View 
          style={[
            styles.difficultyBadge, 
            { backgroundColor: getDifficultyColor(item.difficulty) }
          ]}
        >
          <Text style={styles.difficultyText}>{item.difficulty}</Text>
        </View>
      </View>
      
      <Text style={styles.levelDescription}>{item.description}</Text>
      
      {item.locked ? (
        <View style={styles.lockedBadge}>
          <Text style={styles.lockedText}>🔒 Complete previous level to unlock</Text>
        </View>
      ) : item.completed ? (
        <View style={styles.completedBadge}>
          <Text style={styles.completedText}>✓ Completed</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading levels...</Text>
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
        <Text style={styles.headerTitle}>Game Levels</Text>
      </View>
      
      <FlatList
        data={levels}
        renderItem={renderLevel}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.levelsList}
      />
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
  levelsList: {
    padding: 16,
  },
  levelCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  levelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  difficultyText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  levelDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 12,
  },
  lockedLevel: {
    opacity: 0.7,
  },
  completedLevel: {
    borderLeftWidth: 4,
    borderLeftColor: '#2ecc71',
  },
  lockedBadge: {
    backgroundColor: '#ecf0f1',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  lockedText: {
    color: '#7f8c8d',
    fontSize: 12,
  },
  completedBadge: {
    backgroundColor: '#e8f8f5',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  completedText: {
    color: '#2ecc71',
    fontSize: 12,
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