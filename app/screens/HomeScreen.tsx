import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { MaterialIcons } from '@expo/vector-icons';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Partnership Tax Expert</Text>
          <Text style={styles.subtitle}>Master Schedule K-1 and Partnership Taxation</Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Learn</Text>
          <View style={styles.cardContainer}>
            <TouchableOpacity 
              style={styles.card} 
              onPress={() => navigation.navigate('Tutorial')}
            >
              <View style={styles.cardIconContainer}>
                <MaterialIcons name="school" size={24} color="#3498db" />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>Tax Basics</Text>
                <Text style={styles.cardDescription}>
                  Learn the fundamentals of partnership taxation
                </Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#bdc3c7" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.card} 
              onPress={() => navigation.navigate('K1Guide')}
            >
              <View style={styles.cardIconContainer}>
                <MaterialIcons name="description" size={24} color="#3498db" />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>Schedule K-1 Guide</Text>
                <Text style={styles.cardDescription}>
                  Detailed explanations of each K-1 box
                </Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#bdc3c7" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.card} 
              onPress={() => navigation.navigate('TaxCases')}
            >
              <View style={styles.cardIconContainer}>
                <MaterialIcons name="gavel" size={24} color="#3498db" />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>Landmark Tax Cases</Text>
                <Text style={styles.cardDescription}>
                  Important court cases that shaped partnership tax law
                </Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#bdc3c7" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Practice</Text>
          <View style={styles.cardContainer}>
            <TouchableOpacity 
              style={styles.card} 
              onPress={() => navigation.navigate('GameLevels')}
            >
              <View style={styles.cardIconContainer}>
                <MaterialIcons name="videogame-asset" size={24} color="#27ae60" />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>Tax Scenarios</Text>
                <Text style={styles.cardDescription}>
                  Apply your knowledge to real-world tax situations
                </Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#bdc3c7" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.card} 
              onPress={() => navigation.navigate('Quiz', { 
                quizId: 'basics', 
                quizTitle: 'Partnership Tax Basics' 
              })}
            >
              <View style={styles.cardIconContainer}>
                <MaterialIcons name="quiz" size={24} color="#27ae60" />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>Tax Quizzes</Text>
                <Text style={styles.cardDescription}>
                  Test your knowledge with interactive quizzes
                </Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#bdc3c7" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Tools</Text>
          <View style={styles.cardContainer}>
            <TouchableOpacity 
              style={styles.card} 
              onPress={() => navigation.navigate('BasisWorksheet')}
            >
              <View style={styles.cardIconContainer}>
                <MaterialIcons name="calculate" size={24} color="#9b59b6" />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>Basis Calculator</Text>
                <Text style={styles.cardDescription}>
                  Calculate your adjusted basis in a partnership interest
                </Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#bdc3c7" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.card} 
              onPress={() => navigation.navigate('Reference')}
            >
              <View style={styles.cardIconContainer}>
                <MaterialIcons name="menu-book" size={24} color="#9b59b6" />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>Tax Reference</Text>
                <Text style={styles.cardDescription}>
                  Quick reference guide for partnership tax rules
                </Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#bdc3c7" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.progressButton} 
          onPress={() => navigation.navigate('Progress')}
        >
          <MaterialIcons name="insights" size={20} color="white" />
          <Text style={styles.progressButtonText}>View Your Progress</Text>
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
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 16,
    paddingLeft: 4,
  },
  cardContainer: {
    gap: 12,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ecf0f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
  },
  progressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3498db',
    borderRadius: 8,
    padding: 14,
    marginTop: 8,
  },
  progressButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 8,
  },
});