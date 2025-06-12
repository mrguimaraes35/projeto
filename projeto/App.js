import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FormScreen from './src/screens/FormScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import { Ionicons } from '@expo/vector-icons';
import StackRoutes from './src/routes/StackRoutes'; // <-- IMPORTADO AQUI


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'Livros') iconName = 'book';
              else if (route.name === 'Adicionar') iconName = 'add-circle';
              else if (route.name === 'Dashboard') iconName = 'stats-chart';
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Livros" component={StackRoutes} />
          <Tab.Screen name="Adicionar" component={FormScreen} />
          <Tab.Screen name="Dashboard" component={DashboardScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}