import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppContext } from "@/context/AppContext";

export default function OrdersScreen() {
  const { orders, updateOrders } = useAppContext();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const calculateTotal = () => {
    return orders.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const handleRemoveOrder = (orderId) => {
    // Remove the order with the specified ID
    const updatedOrders = orders.filter((order) => order.id !== orderId);
    updateOrders(updatedOrders);
  };

  const handleRemoveConfirmation = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemName}>{item.product.name}</Text>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemoveConfirmation(item)}
        >
          <Ionicons name="trash" size={20} color="#F44336" />
        </TouchableOpacity>
      </View>
      <View style={styles.itemDetails}>
        <Text>Quantidade: {item.quantity}</Text>
        <Text>R$ {(item.product.price * item.quantity).toFixed(2)}</Text>
      </View>
    </View>
  );

  const ConfirmRemovalModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Remover Item</Text>
          <Text style={styles.modalText}>
            Tem certeza que deseja remover {selectedOrder?.product.name} do
            pedido?
          </Text>
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={styles.modalCancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalConfirmButton}
              onPress={() => {
                handleRemoveOrder(selectedOrder.id);
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalButtonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Meus Pedidos</Text>
      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Seu pedido está vazio</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.id}
          ListFooterComponent={
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>
                Total: R$ {calculateTotal().toFixed(2)}
              </Text>
              <TouchableOpacity style={styles.checkoutButton}>
                <Text style={styles.checkoutButtonText}>Finalizar Pedido</Text>
              </TouchableOpacity>
            </View>
          }
        />
      )}

      <ConfirmRemovalModal />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // ... Existing styles from previous implementation
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  removeButton: {
    padding: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#8B4513",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalCancelButton: {
    backgroundColor: "#666",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
  },
  modalConfirmButton: {
    backgroundColor: "#8B4513",
    padding: 10,
    borderRadius: 10,
    flex: 1,
  },
  modalButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
