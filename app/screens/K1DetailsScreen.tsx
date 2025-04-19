import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { k1Boxes, K1Box } from '../data/k1Boxes';
import { MaterialIcons } from '@expo/vector-icons';

type K1DetailsRouteProp = RouteProp<RootStackParamList, 'K1Details'>;
type K1DetailsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'K1Details'>;

export default function K1DetailsScreen() {
  const route = useRoute<K1DetailsRouteProp>();
  const navigation = useNavigation<K1DetailsNavigationProp>();
  const { boxId } = route.params;
  
  const boxData = k1Boxes.find(box => box.id === boxId);
  
  if (!boxData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Box Details</Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Box information not found</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  const navigateToRelatedBox = (relatedBoxId: string) => {
    navigation.push('K1Details', { boxId: relatedBoxId });
  };

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
        <Text style={styles.headerTitle}>Box Details</Text>
      </View>
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.boxTitleContainer}>
          <Text style={styles.boxTitle}>{boxData.title}</Text>
          <Text style={styles.boxDescription}>{boxData.description}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.detailText}>{boxData.details}</Text>
        </View>
        
        {boxData.examples.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Examples</Text>
            {boxData.examples.map((example, index) => (
              <View key={index} style={styles.exampleCard}>
                <Text style={styles.exampleScenario}>{example.scenario}</Text>
                {example.calculation && (
                  <Text style={styles.exampleCalculation}>{example.calculation}</Text>
                )}
                <Text style={styles.exampleResult}>{example.result}</Text>
              </View>
            ))}
          </View>
        )}
        
        {boxData.tips && boxData.tips.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tax Tips</Text>
            {boxData.tips.map((tip, index) => (
              <View key={index} style={styles.tipContainer}>
                <MaterialIcons name="lightbulb" size={20} color="#f39c12" style={styles.tipIcon} />
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>
        )}
        
        {boxData.relatedBoxes && boxData.relatedBoxes.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Related Boxes</Text>
            {boxData.relatedBoxes.map((relatedBoxId) => {
              const relatedBox = k1Boxes.find(box => box.id === relatedBoxId);
              if (!relatedBox) return null;
              
              return (
                <TouchableOpacity 
                  key={relatedBoxId}
                  style={styles.relatedBoxButton}
                  onPress={() => navigateToRelatedBox(relatedBoxId)}
                >
                  <Text style={styles.relatedBoxTitle}>{relatedBox.title}</Text>
                  <MaterialIcons name="chevron-right" size={20} color="#3498db" />
                </TouchableOpacity>
              );
            })}
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
  boxTitleContainer: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  boxTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  boxDescription: {
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
  detailText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#34495e',
  },
  exampleCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  exampleScenario: {
    fontSize: 15,
    fontWeight: '500',
    color: '#34495e',
    marginBottom: 8,
  },
  exampleCalculation: {
    fontSize: 15,
    fontFamily: 'monospace',
    color: '#2980b9',
    backgroundColor: '#ecf0f1',
    padding: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  exampleResult: {
    fontSize: 15,
    color: '#27ae60',
    fontWeight: '500',
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tipIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  tipText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#34495e',
    flex: 1,
  },
  relatedBoxButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  relatedBoxTitle: {
    fontSize: 15,
    color: '#3498db',
    fontWeight: '500',
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