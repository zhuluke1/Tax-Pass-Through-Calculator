import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

type ReferenceScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Reference'>;

export default function ReferenceScreen() {
  const navigation = useNavigation<ReferenceScreenNavigationProp>();

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
        <Text style={styles.headerTitle}>Tax Reference Guide</Text>
      </View>
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Partnership Tax Basics</Text>
          
          <View style={styles.referenceItem}>
            <Text style={styles.referenceTitle}>Pass-Through Entity</Text>
            <Text style={styles.referenceText}>
              A partnership is a pass-through entity, meaning it doesn't pay income tax itself. 
              Instead, profits and losses "pass through" to the partners, who report their share on their individual tax returns.
            </Text>
          </View>
          
          <View style={styles.referenceItem}>
            <Text style={styles.referenceTitle}>Partnership Tax Forms</Text>
            <Text style={styles.referenceText}>
              • Form 1065: U.S. Return of Partnership Income (filed by the partnership)
              {'\n'}• Schedule K-1: Partner's Share of Income, Deductions, Credits, etc. (issued to each partner)
            </Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Partner's Basis Calculation</Text>
          
          <View style={styles.referenceItem}>
            <Text style={styles.referenceTitle}>Initial Basis</Text>
            <Text style={styles.referenceText}>
              A partner's initial basis equals:
              {'\n'}• Cash contributed
              {'\n'}• Adjusted basis of property contributed
              {'\n'}• Share of partnership liabilities
            </Text>
          </View>
          
          <View style={styles.referenceItem}>
            <Text style={styles.referenceTitle}>Annual Basis Adjustments</Text>
            <Text style={styles.referenceText}>
              Increases to basis:
              {'\n'}• Partner's share of partnership income
              {'\n'}• Partner's share of tax-exempt income
              {'\n'}• Increases in partner's share of liabilities
              {'\n'}
              {'\n'}Decreases to basis:
              {'\n'}• Partner's share of partnership losses
              {'\n'}• Partner's share of nondeductible expenses
              {'\n'}• Distributions to the partner
              {'\n'}• Decreases in partner's share of liabilities
            </Text>
          </View>
          
          <View style={styles.formula}>
            <Text style={styles.formulaTitle}>Basis Formula</Text>
            <Text style={styles.formulaText}>
              Beginning Basis
              {'\n'}+ Income Items
              {'\n'}+ Increases in Liabilities
              {'\n'}- Loss Items
              {'\n'}- Distributions
              {'\n'}- Decreases in Liabilities
              {'\n'}= Ending Basis
            </Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Special Allocations</Text>
          
          <View style={styles.referenceItem}>
            <Text style={styles.referenceText}>
              Partnerships can allocate specific items of income, gain, loss, deduction, or credit 
              differently from the general profit and loss sharing ratio if the allocation has "substantial economic effect."
            </Text>
          </View>
          
          <View style={styles.referenceItem}>
            <Text style={styles.referenceTitle}>Requirements for Substantial Economic Effect</Text>
            <Text style={styles.referenceText}>
              1. Capital accounts must be maintained according to tax regulations
              {'\n'}2. Liquidating distributions must be made according to capital account balances
              {'\n'}3. Partners with deficit capital accounts must restore the deficit
            </Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Loss Limitations</Text>
          
          <View style={styles.referenceItem}>
            <Text style={styles.referenceTitle}>Basis Limitation</Text>
            <Text style={styles.referenceText}>
              A partner cannot deduct losses in excess of their basis in the partnership interest.
              Losses in excess of basis are suspended and can be used in future years when basis increases.
            </Text>
          </View>
          
          <View style={styles.referenceItem}>
            <Text style={styles.referenceTitle}>At-Risk Limitation</Text>
            <Text style={styles.referenceText}>
              Partners can only deduct losses to the extent they are "at risk" in the activity.
              Generally, a partner is at risk for:
              {'\n'}• Money and adjusted basis of property contributed
              {'\n'}• Amounts borrowed for which the partner is personally liable
            </Text>
          </View>
          
          <View style={styles.referenceItem}>
            <Text style={styles.referenceTitle}>Passive Activity Loss Limitation</Text>
            <Text style={styles.referenceText}>
              If a partner doesn't materially participate in the partnership business,
              losses are considered passive and can only offset passive income.
            </Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Self-Employment Tax</Text>
          
          <View style={styles.referenceItem}>
            <Text style={styles.referenceText}>
              General partners typically pay self-employment tax on their distributive share of ordinary business income.
              Limited partners are generally exempt from self-employment tax on their distributive share,
              except for guaranteed payments for services.
            </Text>
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
    marginBottom: 16,
  },
  referenceItem: {
    marginBottom: 16,
  },
  referenceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 8,
  },
  referenceText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#34495e',
  },
  formula: {
    backgroundColor: '#eef2f7',
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  formulaTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 8,
    textAlign: 'center',
  },
  formulaText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#34495e',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
});