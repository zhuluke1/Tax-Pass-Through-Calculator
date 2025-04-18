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
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}