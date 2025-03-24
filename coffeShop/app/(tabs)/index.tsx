import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Modal,
  TouchableOpacity,
} from "react-native";
import ProductCard from "@/components/ProductCard";
import { useAppContext } from "@/context/AppContext";

export default function HomeScreen() {
  const { products, addOrder } = useAppContext();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleProductPress = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
  };

  const handleAddToOrder = () => {
    if (selectedProduct) {
      addOrder({
        id: `order-${Date.now()}`,
        product: selectedProduct,
        quantity: quantity,
      });
      setSelectedProduct(null);
    }
  };

  const renderQuantitySelector = () => (
    <View style={styles.quantityContainer}>
      <TouchableOpacity
        onPress={() => setQuantity(Math.max(1, quantity - 1))}
        style={styles.quantityButton}
      >
        <Text style={styles.quantityButtonText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.quantityText}>{quantity}</Text>
      <TouchableOpacity
        onPress={() => setQuantity(quantity + 1)}
        style={styles.quantityButton}
      >
        <Text style={styles.quantityButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Nosso Cardápio</Text>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCard
            name={item.name}
            price={item.price}
            description={item.description}
            image={item.image}
            onPress={() => handleProductPress(item)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />

      <Modal
        visible={!!selectedProduct}
        transparent={true}
        animationType="slide"
      >
        {selectedProduct && (
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedProduct.name}</Text>
              <Text style={styles.modalDescription}>
                {selectedProduct.description}
              </Text>
              <Text style={styles.modalPrice}>
                R$ {selectedProduct.price.toFixed(2)}
              </Text>

              {renderQuantitySelector()}

              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleAddToOrder}
                >
                  <Text style={styles.modalButtonText}>
                    Adicionar ao Pedido
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setSelectedProduct(null)}
                >
                  <Text style={styles.modalButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 28,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDescription: {
    color: "#666",
    marginBottom: 10,
    textAlign: "center",
  },
  modalPrice: {
    fontSize: 18,
    color: "#8B4513",
    fontWeight: "bold",
    marginBottom: 15,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  quantityButton: {
    backgroundColor: "#8B4513",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  quantityButtonText: {
    color: "white",
    fontSize: 20,
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 15,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    backgroundColor: "#8B4513",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#666",
  },
  modalButtonText: {
    color: "white",
    textAlign: "center",
  },
});
