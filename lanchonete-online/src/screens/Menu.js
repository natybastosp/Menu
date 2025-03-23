import React, { useState, useEffect, useContext } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FoodCard from "../components/FoodCard";
import { CartContext } from "../contexts/CartContext";
import { useNavigation } from "@react-navigation/native";
import { api } from "../services/api";

const MenuScreen = () => {
  const [loading, setLoading] = useState(true);
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { cartItems, getTotalPrice } = useContext(CartContext);
  const navigation = useNavigation();

  useEffect(() => {
    // Carregar dados iniciais
    const loadInitialData = async () => {
      try {
        setLoading(true);

        // Carregar categorias e menu simultaneamente
        const [categoriesResponse, menuResponse] = await Promise.all([
          api.getCategories(),
          api.getMenu(),
        ]);

        setCategories(categoriesResponse);
        setFoods(menuResponse);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Carregar itens quando a categoria mudar
  useEffect(() => {
    const loadCategoryItems = async () => {
      if (selectedCategory === "all" && foods.length > 0) {
        return; // Já temos todos os itens carregados
      }

      try {
        setLoading(true);
        const items = await api.getMenuByCategory(selectedCategory);
        setFoods(items);
      } catch (error) {
        console.error("Erro ao carregar categoria:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCategoryItems();
  }, [selectedCategory]);

  if (loading && foods.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#e91e63" />
        <Text style={styles.loadingText}>Carregando cardápio...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Filtro de categorias */}
      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === item.id && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(item.id)}
          >
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategory === item.id && styles.categoryButtonTextActive,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Lista de produtos */}
      {loading ? (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="small" color="#e91e63" />
        </View>
      ) : (
        <FlatList
          data={foods}
          keyExtractor={(item) => item.id}
          style={styles.foodList}
          contentContainerStyle={styles.foodListContent}
          renderItem={({ item }) => <FoodCard item={item} />}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              Nenhum item encontrado nesta categoria.
            </Text>
          }
        />
      )}

      {/* Botão de carrinho */}
      {cartItems.length > 0 && (
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate("OrderSummary")}
        >
          <View style={styles.cartContent}>
            <View style={styles.cartInfo}>
              <Text style={styles.cartText}>
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)} itens
              </Text>
              <Text style={styles.cartPrice}>
                R$ {getTotalPrice().toFixed(2)}
              </Text>
            </View>
            <View style={styles.cartIcon}>
              <Ionicons name="cart" size={24} color="white" />
            </View>
          </View>
        </TouchableOpacity>
      )}
    </View>
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
  loadingOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  categoriesContainer: {
    backgroundColor: "white",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: "#f2f2f2",
  },
  categoryButtonActive: {
    backgroundColor: "#e91e63",
  },
  categoryButtonText: {
    fontWeight: "500",
    color: "#555",
  },
  categoryButtonTextActive: {
    color: "white",
  },
  foodList: {
    flex: 1,
  },
  foodListContent: {
    padding: 15,
  },
  emptyText: {
    textAlign: "center",
    padding: 20,
    color: "#666",
  },
  cartButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#e91e63",
    borderRadius: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cartContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  cartInfo: {
    flex: 1,
  },
  cartText: {
    color: "white",
    fontWeight: "500",
  },
  cartPrice: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  cartIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MenuScreen;
