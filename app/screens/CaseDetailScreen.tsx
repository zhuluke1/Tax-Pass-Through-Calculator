import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { taxCases } from '../data/taxCases';
import { MaterialIcons } from '@expo/vector-icons';

type CaseDetailRouteProp = RouteProp<RootStackParamList, 'CaseDetail'>;
type CaseDetailNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CaseDetail'>;

export default function CaseDetailScreen() {
  const route = useRoute<CaseDetailRouteProp>();
  const navigation = useNavigation<CaseDetailNavigationProp>();
  const { caseId } = route.params;
  
  const caseData = taxCases.find(taxCase => taxCase.id === caseId);
  
  if (!caseData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Case Details</Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Case information not found</Text>
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
        <Text style={styles.headerTitle}>Case Details</Text>
      </View>
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.caseTitleContainer}>
          <Text style={styles.caseTitle}>{caseData.title}</Text>
          <Text style={styles.caseCitation}>{caseData.citation} ({caseData.year})</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.summaryText}>{caseData.summary}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Points</Text>
          {caseData.keyPoints.map((point, index) => (
            <View key={index} style={styles.keyPointContainer}>
              <MaterialIcons name="check-circle" size={20} color="#27ae60" style={styles.keyPointIcon} />
              <Text style={styles.keyPointText}>{point}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Impact on Partnership Taxation</Text>
          <Text style={styles.impactText}>{caseData.impact}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Application in Practice</Text>
          <View style={styles.practiceContainer}>
            <Text style={styles.practiceText}>
              When applying the principles from {caseData.title}, tax practitioners should consider:
            </Text>
            <View style={styles.practicePointContainer}>
              <MaterialIcons name="lightbulb" size={20} color="#f39c12" style={styles.practicePointIcon} />
              <Text style={styles.practicePointText}>
                Document the business purpose and economic substance of partnership arrangements
              </Text>
            </View>
            <View style={styles.practicePointContainer}>
              <MaterialIcons name="lightbulb" size={20} color="#f39c12" style={styles.practicePointIcon} />
              <Text style={styles.practicePointText}>
                Ensure that partnership allocations have substantial economic effect
              </Text>
            </View>
            <View style={styles.practicePointContainer}>
              <MaterialIcons name="lightbulb" size={20} color="#f39c12" style={styles.practicePointIcon} />
              <Text style={styles.practicePointText}>
                Be aware of how this case might affect IRS scrutiny of similar transactions
              </Text>
            </View>
          </View>
        </View>
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
  caseTitleContainer: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  caseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  caseCitation: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
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
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#34495e',
  },
  keyPointContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  keyPointIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  keyPointText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#34495e',
    flex: 1,
  },
  impactText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#34495e',
  },
  practiceContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
  },
  practiceText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#34495e',
    marginBottom: 12,
  },
  practicePointContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  practicePointIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  practicePointText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#34495e',
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
  },
});