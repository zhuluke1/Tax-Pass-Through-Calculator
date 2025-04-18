import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

type TutorialScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Tutorial'>;

export default function TutorialScreen() {
  const navigation = useNavigation<TutorialScreenNavigationProp>();

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
        <Text style={styles.headerTitle}>Partnership Tax Tutorial</Text>
      </View>
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What is Pass-Through Taxation?</Text>
          <Text style={styles.paragraph}>
            Pass-through taxation is a tax system where business income "passes through" the business entity to the owners or partners. 
            The business itself doesn't pay income taxes - instead, profits and losses are reported on the individual tax returns of the owners.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Partnership Taxation Basics</Text>
          <Text style={styles.paragraph}>
            Partnerships file Form 1065 (U.S. Return of Partnership Income) which is an informational return. The partnership then issues 
            Schedule K-1 forms to each partner showing their share of income, deductions, credits, etc.
          </Text>
          
          <View style={styles.bulletPoints}>
            <Text style={styles.bulletPoint}>• Partners pay tax on their share of partnership income regardless of distributions</Text>
            <Text style={styles.bulletPoint}>• Partnership losses can offset other income (subject to limitations)</Text>
            <Text style={styles.bulletPoint}>• Special allocations are possible if they have "substantial economic effect"</Text>
            <Text style={styles.bulletPoint}>• Partners' basis in their partnership interest changes annually</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Partnership Tax Concepts</Text>
          
          <Text style={styles.subheading}>1. Partnership Basis</Text>
          <Text style={styles.paragraph}>
            A partner's basis in their partnership interest is crucial for determining gain/loss on disposition and the ability to deduct losses.
          </Text>
          
          <Text style={styles.subheading}>2. Distributive Share</Text>
          <Text style={styles.paragraph}>
            Each partner's share of income, gain, loss, deduction, or credit as determined by the partnership agreement.
          </Text>
          
          <Text style={styles.subheading}>3. Self-Employment Tax</Text>
          <Text style={styles.paragraph}>
            General partners typically pay self-employment tax on their distributive share of ordinary business income.
          </Text>
        </View>
        
        <TouchableOpacity 
          style={styles.nextButton} 
          onPress={() => navigation.navigate('GameLevels')}
        >
          <Text style={styles.nextButtonText}>Start Playing →</Text>
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
    padding: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
  },
  subheading: {
    fontSize: 17,
    fontWeight: '600',
    color: '#34495e',
    marginTop: 16,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 22,
    color: '#34495e',
    marginBottom: 12,
  },
  bulletPoints: {
    marginTop: 8,
    marginLeft: 8,
  },
  bulletPoint: {
    fontSize: 15,
    lineHeight: 22,
    color: '#34495e',
    marginBottom: 8,
  },
  nextButton: {
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});