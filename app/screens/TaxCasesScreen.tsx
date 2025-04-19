import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { taxCases } from '../data/taxCases';
import { MaterialIcons } from '@expo/vector-icons';

type TaxCasesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'TaxCases'>;

export default function TaxCasesScreen() {
  const navigation = useNavigation<TaxCasesScreenNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredCases = taxCases.filter(taxCase => 
    taxCase.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    taxCase.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
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
        <Text style={styles.headerTitle}>Important Tax Cases</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={24} color="#7f8c8d" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search tax cases..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#7f8c8d"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <MaterialIcons name="clear" size={24} color="#7f8c8d" />
          </TouchableOpacity>
        )}
      </View>
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.introText}>
          These landmark tax cases have shaped partnership taxation rules and principles.
          Understanding these cases will help you apply tax law correctly in complex situations.
        </Text>
        
        {filteredCases.map((taxCase) => (
          <TouchableOpacity 
            key={taxCase.id}
            style={styles.caseCard}
            onPress={() => navigation.navigate('CaseDetail', { caseId: taxCase.id })}
          >
            <View style={styles.caseHeader}>
              <View style={styles.caseTitleContainer}>
                <Text style={styles.caseTitle}>{taxCase.title}</Text>
                <Text style={styles.caseCitation}>{taxCase.citation} ({taxCase.year})</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#3498db" />
            </View>
            <Text style={styles.caseSummary} numberOfLines={2}>
              {taxCase.summary}
            </Text>
          </TouchableOpacity>
        ))}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#2c3e50',
    paddingVertical: 8,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  introText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#34495e',
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  caseCard: {
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
  caseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  caseTitleContainer: {
    flex: 1,
  },
  caseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  caseCitation: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 2,
  },
  caseSummary: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 20,
  },
});