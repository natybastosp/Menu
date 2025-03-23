import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

// Importação das telas
import HomeScreen from "./src/screens/Home";
import MenuScreen from "./src/screens/Menu";
import RegistrationScreen from "./src/screens/Registration";
import OrderSummaryScreen from "./src/screens/OrderSummary";
import ProfileScreen from "./src/screens/Profile";

// Importação dos contextos
import { CartProvider } from "./src/contexts/CartContext";
import { AuthProvider } from "./src/contexts/AuthContext";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Navegação principal (abas inferiores)
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Início") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Cardápio") {
            iconName = focused ? "restaurant" : "restaurant-outline";
          } else if (route.name === "Perfil") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#e91e63",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Início" component={HomeScreen} />
      <Tab.Screen name="Cardápio" component={MenuScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Navegação Stack para telas que não são abas
export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen
              name="Main"
              component={MainTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Registration"
              component={RegistrationScreen}
              options={{ title: "Cadastro" }}
            />
            <Stack.Screen
              name="OrderSummary"
              component={OrderSummaryScreen}
              options={{ title: "Resumo do Pedido" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </AuthProvider>
  );
}
