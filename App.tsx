import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// Import screens
import HomeScreen from './app/screens/HomeScreen';
import TutorialScreen from './app/screens/TutorialScreen';
import GameLevelsScreen from './app/screens/GameLevelsScreen';
import GamePlayScreen from './app/screens/GamePlayScreen';
import ReferenceScreen from './app/screens/ReferenceScreen';
import K1GuideScreen from './app/screens/K1GuideScreen';
import K1DetailsScreen from './app/screens/K1DetailsScreen';
import QuizScreen from './app/screens/QuizScreen';
import QuizResultsScreen from './app/screens/QuizResultsScreen';
import ProgressScreen from './app/screens/ProgressScreen';
import BasisWorksheetScreen from './app/screens/BasisWorksheetScreen';
import TaxCasesScreen from './app/screens/TaxCasesScreen';
import CaseDetailScreen from './app/screens/CaseDetailScreen';

// Import types
import { RootStackParamList } from './types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Tutorial" component={TutorialScreen} />
          <Stack.Screen name="GameLevels" component={GameLevelsScreen} />
          <Stack.Screen name="GamePlay" component={GamePlayScreen} />
          <Stack.Screen name="Reference" component={ReferenceScreen} />
          <Stack.Screen name="K1Guide" component={K1GuideScreen} />
          <Stack.Screen name="K1Details" component={K1DetailsScreen} />
          <Stack.Screen name="Quiz" component={QuizScreen} />
          <Stack.Screen name="QuizResults" component={QuizResultsScreen} />
          <Stack.Screen name="Progress" component={ProgressScreen} />
          <Stack.Screen name="BasisWorksheet" component={BasisWorksheetScreen} />
          <Stack.Screen name="TaxCases" component={TaxCasesScreen} />
          <Stack.Screen name="CaseDetail" component={CaseDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}