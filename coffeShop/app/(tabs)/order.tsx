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
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppContext } from "@/context/AppContext";
import { LinearGradient } from "expo-linear-gradient";

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
    const updatedOrders = orders.filter((order) => order.id !== orderId);
    updateOrders(updatedOrders);
  };

  const handleRemoveConfirmation = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItemContainer}>
      <View style={styles.orderItemContent}>
        <View style={styles.orderItemDetails}>
          <Text style={styles.orderItemName}>{item.product.name}</Text>
          <View style={styles.orderItemQuantityPrice}>
            <View style={styles.quantityBadge}>
              <Text style={styles.quantityText}>{item.quantity}</Text>
            </View>
            <Text style={styles.orderItemPrice}>
              R$ {(item.product.price * item.quantity).toFixed(2)}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemoveConfirmation(item)}
        >
          <Ionicons name="trash" size={24} color="#F44336" />
        </TouchableOpacity>
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
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Remove Item</Text>
          <Text style={styles.modalMessage}>
            Are you sure you want to remove {selectedOrder?.product.name} from
            the order?
          </Text>
          <View style={styles.modalActions}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.confirmButton]}
              onPress={() => {
                handleRemoveOrder(selectedOrder.id);
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#8B4513", "#D2691E"]}
        style={styles.gradientBackground}
      >
        <Text style={styles.screenTitle}>My order</Text>
        {orders.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <Ionicons name="basket" size={100} color="rgba(255,255,255,0.5)" />
            <Text style={styles.emptyStateText}>Your cart is empty</Text>
            <Text style={styles.emptyStateSubtext}>
              Add some items to get started
            </Text>
          </View>
        ) : (
          <View style={styles.orderListContainer}>
            <FlatList
              data={orders}
              renderItem={renderOrderItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.orderList}
              showsVerticalScrollIndicator={false}
            />
            <View style={styles.orderSummary}>
              <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>
                  R$ {calculateTotal().toFixed(2)}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.checkoutButton}
                onPress={() =>
                  Alert.alert("Em desenvolvimento", "Checkout em breve!")
                }
              >
                <Text style={styles.checkoutButtonText}>Checkout</Text>
                <Ionicons name="cart" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <ConfirmRemovalModal />
      </LinearGradient>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
    paddingTop: 20,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.7,
  },
  emptyStateText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
  },
  emptyStateSubtext: {
    color: "white",
    fontSize: 16,
    marginTop: 10,
  },
  orderListContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
  },
  orderList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  orderItemContainer: {
    marginBottom: 15,
    backgroundColor: "#F5F5F5",
    borderRadius: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orderItemContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  orderItemDetails: {
    flex: 1,
  },
  orderItemName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  orderItemQuantityPrice: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityBadge: {
    backgroundColor: "#8B4513",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginRight: 10,
  },
  quantityText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  orderItemPrice: {
    fontSize: 16,
    color: "#8B4513",
    fontWeight: "bold",
  },
  removeButton: {
    padding: 10,
  },
  orderSummary: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  totalLabel: {
    fontSize: 18,
    color: "#666",
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#8B4513",
  },
  checkoutButton: {
    backgroundColor: "#8B4513",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 10,
  },
  checkoutButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: width * 0.85,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#8B4513",
    marginBottom: 15,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#E0E0E0",
  },
  confirmButton: {
    backgroundColor: "#8B4513",
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
