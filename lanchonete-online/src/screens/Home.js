import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { api } from "../services/api";

const HomeScreen = () => {
  const { user, isLoggedIn } = useContext(AuthContext);
  const navigation = useNavigation();
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Carregar banners e categorias da API simulada
        const [bannersData, categoriesData] = await Promise.all([
          api.getBanners(),
          api.getHomeCategories(),
        ]);

        setBanners(bannersData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Erro ao carregar dados da home:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#e91e63" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho com boas-vindas */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>
            {isLoggedIn ? `Olá, ${user.name}!` : "Bem-vindo!"}
          </Text>
          <Text style={styles.subText}>O que você vai pedir hoje?</Text>
        </View>
        {!isLoggedIn && (
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate("Registration")}
          >
            <Text style={styles.loginButtonText}>Entrar</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Banners promocionais */}
      <Text style={styles.sectionTitle}>Promoções</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.bannersContainer}
      >
        {banners.map((banner) => (
          <View key={banner.id} style={styles.bannerCard}>
            <Image source={{ uri: banner.image }} style={styles.bannerImage} />
            <Text style={styles.bannerTitle}>{banner.title}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Categorias */}
      <Text style={styles.sectionTitle}>Categorias</Text>
      <View style={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryCard}
            onPress={() => {
              navigation.navigate("Cardápio");
              // Poderia passar a categoria como parâmetro
              // navigation.navigate('Cardápio', { category: category.category });
            }}
          >
            <Ionicons name={category.icon} size={24} color="#e91e63" />
            <Text style={styles.categoryName}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Ações rápidas */}
      <Text style={styles.sectionTitle}>Ações rápidas</Text>
      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("Cardápio")}
        >
          <Ionicons name="menu-outline" size={24} color="white" />
          <Text style={styles.actionButtonText}>Ver Cardápio</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("OrderSummary")}
        >
          <Ionicons name="cart-outline" size={24} color="white" />
          <Text style={styles.actionButtonText}>Meu Pedido</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "white",
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  subText: {
    fontSize: 16,
    color: "#777",
    marginTop: 4,
  },
  loginButton: {
    backgroundColor: "#e91e63",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  loginButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  bannersContainer: {
    paddingVertical: 5,
  },
  bannerCard: {
    marginLeft: 20,
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    width: 300,
  },
  bannerImage: {
    width: 300,
    height: 150,
  },
  bannerTitle: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontWeight: "bold",
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 15,
    justifyContent: "space-between",
  },
  categoryCard: {
    backgroundColor: "white",
    width: "48%",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryName: {
    marginTop: 8,
    fontWeight: "500",
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: "#e91e63",
    borderRadius: 10,
    padding: 15,
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 8,
  },
});

export default HomeScreen;
