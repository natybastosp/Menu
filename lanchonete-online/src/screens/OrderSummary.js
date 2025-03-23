import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CartContext } from "../contexts/CartContext";
import { AuthContext } from "../contexts/AuthContext";
import CartItem from "../components/CartItem";
import { useNavigation } from "@react-navigation/native";
import { api } from "../services/api";

const OrderSummaryScreen = () => {
  const { cartItems, getTotalPrice, clearCart } = useContext(CartContext);
  const { user, isLoggedIn } = useContext(AuthContext);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!isLoggedIn) {
      Alert.alert(
        "Login necessário",
        "Você precisa estar logado para finalizar o pedido.",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Fazer login",
            onPress: () => navigation.navigate("Registration"),
          },
        ]
      );
      return;
    }

    if (cartItems.length === 0) {
      Alert.alert(
        "Carrinho vazio",
        "Adicione itens ao carrinho para finalizar o pedido."
      );
      return;
    }

    try {
      setLoading(true);

      // Preparar dados do pedido
      const orderData = {
        items: cartItems,
        totalPrice: getTotalPrice(),
        user: {
          id: user.id,
          name: user.name,
          address: user.address,
          phone: user.phone,
        },
        orderDate: new Date().toISOString(),
      };

      // Enviar pedido para a API
      const result = await api.placeOrder(orderData);

      // Limpar carrinho após confirmar pedido
      clearCart();

      // Exibir confirmação
      Alert.alert(
        "Pedido realizado com sucesso!",
        `Seu pedido #${result.orderId} foi confirmado e será entregue em aproximadamente ${result.estimatedTime}.`,
        [{ text: "OK", onPress: () => navigation.navigate("Início") }]
      );
    } catch (error) {
      console.error("Erro ao realizar pedido:", error);
      Alert.alert(
        "Falha ao processar pedido",
        "Ocorreu um erro ao processar seu pedido. Tente novamente mais tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.cartContainer}>
          <Text style={styles.sectionTitle}>Itens do pedido</Text>

          {cartItems.length === 0 ? (
            <View style={styles.emptyCartContainer}>
              <Ionicons name="cart-outline" size={64} color="#ccc" />
              <Text style={styles.emptyCartText}>Seu carrinho está vazio</Text>
              <TouchableOpacity
                style={styles.continueButton}
                onPress={() => navigation.navigate("Cardápio")}
              >
                <Text style={styles.continueButtonText}>Ver cardápio</Text>
              </TouchableOpacity>
            </View>
          ) : (
            cartItems.map((item) => <CartItem key={item.id} item={item} />)
          )}
        </View>

        {cartItems.length > 0 && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Resumo</Text>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>
                  R$ {getTotalPrice().toFixed(2)}
                </Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Taxa de entrega</Text>
                <Text style={styles.summaryValue}>R$ 5.00</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.summaryItem}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>
                  R$ {(getTotalPrice() + 5).toFixed(2)}
                </Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Forma de pagamento</Text>
              <TouchableOpacity style={styles.paymentOption}>
                <Ionicons name="cash-outline" size={24} color="#555" />
                <Text style={styles.paymentOptionText}>Dinheiro</Text>
                <Ionicons name="checkmark-circle" size={24} color="#e91e63" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.paymentOption}>
                <Ionicons name="card-outline" size={24} color="#555" />
                <Text style={styles.paymentOptionText}>Cartão de crédito</Text>
                <Ionicons name="ellipse-outline" size={24} color="#ccc" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.paymentOption}>
                <Ionicons name="wallet-outline" size={24} color="#555" />
                <Text style={styles.paymentOptionText}>Pix</Text>
                <Ionicons name="ellipse-outline" size={24} color="#ccc" />
              </TouchableOpacity>
            </View>

            {!isLoggedIn && (
              <View style={styles.section}>
                <Text style={styles.warningText}>
                  Você precisa estar logado para finalizar o pedido.
                </Text>
                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={() => navigation.navigate("Registration")}
                >
                  <Text style={styles.loginButtonText}>Fazer login</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </ScrollView>

      {cartItems.length > 0 && (
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[
              styles.checkoutButton,
              isLoggedIn ? {} : styles.checkoutButtonDisabled,
            ]}
            onPress={handleCheckout}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text style={styles.checkoutButtonText}>Finalizar pedido</Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollContainer: */
