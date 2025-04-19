import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { k1Boxes } from '../data/k1Boxes';
import { MaterialIcons } from '@expo/vector-icons';

type K1GuideScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'K1Guide'>;

export default function K1GuideScreen() {
  const navigation = useNavigation<K1GuideScreenNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBoxes = k1Boxes.filter(box => 
    box.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    box.description.toLowerCase().includes(searchQuery.toLowerCase())
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
        <Text style={styles.headerTitle}>Schedule K-1 Guide</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={24} color="#7f8c8d" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search K-1 boxes..."
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
          Schedule K-1 (Form 1065) is used to report a partner's share of income, deductions, credits, etc. 
          from a partnership. Select a box below to learn more about what it reports and how it affects your tax return.
        </Text>
        
        {filteredBoxes.map((box) => (
          <TouchableOpacity 
            key={box.id}
            style={styles.boxCard}
            onPress={() => navigation.navigate('K1Details', { boxId: box.id })}
          >
            <View style={styles.boxHeader}>
              <Text style={styles.boxTitle}>{box.title}</Text>
              <MaterialIcons name="chevron-right" size={24} color="#3498db" />
            </View>
            <Text style={styles.boxDescription}>{box.description}</Text>
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
  boxCard: {
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
  boxHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  boxTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
  },
  boxDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
  },
});