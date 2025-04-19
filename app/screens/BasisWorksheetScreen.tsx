import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

type BasisWorksheetNavigationProp = NativeStackNavigationProp<RootStackParamList, 'BasisWorksheet'>;

interface BasisItem {
  id: string;
  description: string;
  amount: string;
  type: 'increase' | 'decrease';
}

export default function BasisWorksheetScreen() {
  const navigation = useNavigation<BasisWorksheetNavigationProp>();
  const [initialBasis, setInitialBasis] = useState('');
  const [items, setItems] = useState<BasisItem[]>([]);
  const [savedWorksheets, setSavedWorksheets] = useState<string[]>([]);
  const [currentWorksheetName, setCurrentWorksheetName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  
  useEffect(() => {
    loadSavedWorksheetNames();
  }, []);
  
  const loadSavedWorksheetNames = async () => {
    try {
      const worksheetNames = await AsyncStorage.getItem('basisWorksheetNames');
      if (worksheetNames) {
        setSavedWorksheets(JSON.parse(worksheetNames));
      }
    } catch (error) {
      console.error('Error loading worksheet names:', error);
    }
  };
  
  const addItem = (type: 'increase' | 'decrease') => {
    const newItem: BasisItem = {
      id: Date.now().toString(),
      description: '',
      amount: '',
      type,
    };
    setItems([...items, newItem]);
  };
  
  const updateItem = (id: string, field: 'description' | 'amount', value: string) => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setItems(updatedItems);
  };
  
  const removeItem = (id: string) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
  };
  
  const calculateEndingBasis = () => {
    let basis = parseFloat(initialBasis) || 0;
    
    items.forEach(item => {
      const amount = parseFloat(item.amount) || 0;
      if (item.type === 'increase') {
        basis += amount;
      } else {
        basis -= amount;
      }
    });
    
    return basis;
  };
  
  const saveWorksheet = async () => {
    if (!currentWorksheetName.trim()) {
      Alert.alert('Error', 'Please enter a name for your worksheet');
      return;
    }
    
    try {
      const worksheet = {
        name: currentWorksheetName,
        initialBasis,
        items,
        date: new Date().toISOString(),
      };
      
      await AsyncStorage.setItem(`basisWorksheet_${currentWorksheetName}`, JSON.stringify(worksheet));
      
      const updatedNames = [...savedWorksheets, currentWorksheetName];
      setSavedWorksheets(updatedNames);
      await AsyncStorage.setItem('basisWorksheetNames', JSON.stringify(updatedNames));
      
      setShowSaveDialog(false);
      Alert.alert('Success', 'Worksheet saved successfully');
    } catch (error) {
      console.error('Error saving worksheet:', error);
      Alert.alert('Error', 'Failed to save worksheet');
    }
  };
  
  const loadWorksheet = async (name: string) => {
    try {
      const worksheetJson = await AsyncStorage.getItem(`basisWorksheet_${name}`);
      if (worksheetJson) {
        const worksheet = JSON.parse(worksheetJson);
        setInitialBasis(worksheet.initialBasis);
        setItems(worksheet.items);
        setCurrentWorksheetName(worksheet.name);
      }
    } catch (error) {
      console.error('Error loading worksheet:', error);
      Alert.alert('Error', 'Failed to load worksheet');
    }
  };
  
  const clearWorksheet = () => {
    Alert.alert(
      'Clear Worksheet',
      'Are you sure you want to clear all data?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive',
          onPress: () => {
            setInitialBasis('');
            setItems([]);
            setCurrentWorksheetName('');
          }
        },
      ]
    );
  };
  
  const endingBasis = calculateEndingBasis();
  
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
        <Text style={styles.headerTitle}>Partnership Basis Worksheet</Text>
      </View>
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            Use this worksheet to calculate your adjusted basis in a partnership interest.
            Enter your initial basis and then add increases and decreases throughout the tax year.
          </Text>
        </View>
        
        {currentWorksheetName ? (
          <View style={styles.currentWorksheetContainer}>
            <Text style={styles.currentWorksheetText}>
              Current worksheet: <Text style={styles.currentWorksheetName}>{currentWorksheetName}</Text>
            </Text>
          </View>
        ) : null}
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Initial Basis</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Beginning Basis:</Text>
            <TextInput
              style={styles.input}
              value={initialBasis}
              onChangeText={setInitialBasis}
              placeholder="0.00"
              keyboardType="numeric"
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Increases to Basis</Text>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => addItem('increase')}
            >
              <MaterialIcons name="add" size={20} color="white" />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
          
          {items.filter(item => item.type === 'increase').length === 0 ? (
            <Text style={styles.emptyListText}>No increases added yet</Text>
          ) : (
            items.filter(item => item.type === 'increase').map(item => (
              <View key={item.id} style={styles.itemContainer}>
                <View style={styles.itemInputs}>
                  <TextInput
                    style={styles.descriptionInput}
                    value={item.description}
                    onChangeText={(value) => updateItem(item.id, 'description', value)}
                    placeholder="Description (e.g., Share of income)"
                  />
                  <TextInput
                    style={styles.amountInput}
                    value={item.amount}
                    onChangeText={(value) => updateItem(item.id, 'amount', value)}
                    placeholder="0.00"
                    keyboardType="numeric"
                  />
                </View>
                <TouchableOpacity 
                  style={styles.removeButton}
                  onPress={() => removeItem(item.id)}
                >
                  <MaterialIcons name="remove-circle" size={24} color="#e74c3c" />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Decreases to Basis</Text>
            <TouchableOpacity 
              style={[styles.addButton, styles.decreaseButton]}
              onPress={() => addItem('decrease')}
            >
              <MaterialIcons name="remove" size={20} color="white" />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
          
          {items.filter(item => item.type === 'decrease').length === 0 ? (
            <Text style={styles.emptyListText}>No decreases added yet</Text>
          ) : (
            items.filter(item => item.type === 'decrease').map(item => (
              <View key={item.id} style={styles.itemContainer}>
                <View style={styles.itemInputs}>
                  <TextInput
                    style={styles.descriptionInput}
                    value={item.description}
                    onChangeText={(value) => updateItem(item.id, 'description', value)}
                    placeholder="Description (e.g., Distributions)"
                  />
                  <TextInput
                    style={styles.amountInput}
                    value={item.amount}
                    onChangeText={(value) => updateItem(item.id, 'amount', value)}
                    placeholder="0.00"
                    keyboardType="numeric"
                  />
                </View>
                <TouchableOpacity 
                  style={styles.removeButton}
                  onPress={() => removeItem(item.id)}
                >
                  <MaterialIcons name="remove-circle" size={24} color="#e74c3c" />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
        
        <View style={styles.resultSection}>
          <Text style={styles.resultLabel}>Ending Basis:</Text>
          <Text style={[
            styles.resultValue,
            endingBasis < 0 ? styles.negativeResult : null
          ]}>
            ${endingBasis.toFixed(2)}
          </Text>
          
          {endingBasis < 0 && (
            <View style={styles.warningContainer}>
              <MaterialIcons name="warning" size={20} color="#e74c3c" />
              <Text style={styles.warningText}>
                Negative basis is not allowed for tax purposes. This may indicate that you've received distributions in excess of basis (taxable as capital gain) or that there's an error in your calculations.
              </Text>
            </View>
          )}
        </View>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.clearButton]}
            onPress={clearWorksheet}
          >
            <MaterialIcons name="delete" size={20} color="#e74c3c" />
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.saveButton]}
            onPress={() => setShowSaveDialog(true)}
          >
            <MaterialIcons name="save" size={20} color="#3498db" />
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.loadButton]}
            onPress={() => {
              if (savedWorksheets.length === 0) {
                Alert.alert('No Saved Worksheets', 'You have no saved worksheets to load.');
                return;
              }
              
              Alert.alert(
                'Load Worksheet',
                'Select a worksheet to load:',
                [
                  { text: 'Cancel', style: 'cancel' },
                  ...savedWorksheets.map(name => ({
                    text: name,
                    onPress: () => loadWorksheet(name)
                  }))
                ]
              );
            }}
          >
            <MaterialIcons name="folder-open" size={20} color="#27ae60" />
            <Text style={styles.loadButtonText}>Load</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      {showSaveDialog && (
        <View style={styles.saveDialogOverlay}>
          <View style={styles.saveDialog}>
            <Text style={styles.saveDialogTitle}>Save Worksheet</Text>
            <TextInput
              style={styles.saveDialogInput}
              value={currentWorksheetName}
              onChangeText={setCurrentWorksheetName}
              placeholder="Enter worksheet name"
            />
            <View style={styles.saveDialogButtons}>
              <TouchableOpacity 
                style={[styles.saveDialogButton, styles.saveDialogCancelButton]}
                onPress={() => setShowSaveDialog(false)}
              >
                <Text style={styles.saveDialogCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.saveDialogButton, styles.saveDialogSaveButton]}
                onPress={saveWorksheet}
              >
                <Text style={styles.saveDialogSaveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
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
  infoCard: {
    backgroundColor: '#e8f4f8',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#34495e',
  },
  currentWorksheetContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentWorksheetText: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  currentWorksheetName: {
    fontWeight: 'bold',
    color: '#2c3e50',
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputLabel: {
    fontSize: 16,
    color: '#34495e',
    flex: 1,
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
    color: '#2c3e50',
    width: 120,
    textAlign: 'right',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3498db',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  decreaseButton: {
    backgroundColor: '#e74c3c',
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 4,
  },
  emptyListText: {
    fontSize: 14,
    color: '#7f8c8d',
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 12,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemInputs: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  descriptionInput: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 4,
    padding: 8,
    fontSize: 14,
    color: '#2c3e50',
    marginRight: 8,
  },
  amountInput: {
    width: 100,
    backgroundColor: '#f8f9fa',
    borderRadius: 4,
    padding: 8,
    fontSize: 14,
    color: '#2c3e50',
    textAlign: 'right',
  },
  removeButton: {
    padding: 8,
    marginLeft: 8,
  },
  resultSection: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  resultLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  resultValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#27ae60',
    textAlign: 'center',
    marginVertical: 8,
  },
  negativeResult: {
    color: '#e74c3c',
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fdedec',
    borderRadius: 4,
    padding: 12,
    marginTop: 8,
  },
  warningText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#e74c3c',
    marginLeft: 8,
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
  },
  clearButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e74c3c',
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#e74c3c',
    marginLeft: 8,
  },
  saveButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#3498db',
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3498db',
    marginLeft: 8,
  },
  loadButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#27ae60',
  },
  loadButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#27ae60',
    marginLeft: 8,
  },
  saveDialogOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveDialog: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  saveDialogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
    textAlign: 'center',
  },
  saveDialogInput: {
    backgroundColor: '#f8f9fa',
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 16,
  },
  saveDialogButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveDialogButton: {
    padding: 12,
    borderRadius: 4,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  saveDialogCancelButton: {
    backgroundColor: '#ecf0f1',
  },
  saveDialogCancelText: {
    fontSize: 16,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  saveDialogSaveButton: {
    backgroundColor: '#3498db',
  },
  saveDialogSaveText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
  },
});