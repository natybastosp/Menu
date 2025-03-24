import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { useAppContext } from "@/context/AppContext";

export default function ProfileScreen() {
  const { customerData, updateCustomerData } = useAppContext();
  const [name, setName] = useState(customerData.name);
  const [email, setEmail] = useState(customerData.email);
  const [phone, setPhone] = useState(customerData.phone);

  const handleSubmit = () => {
    // Validações básicas
    if (!name || !email || !phone) {
      Alert.alert("Erro", "Todos os campos são obrigatórios");
      return;
    }

    // Validação de email simples
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Erro", "E-mail inválido");
      return;
    }

    // Validação de telefone (formato brasileiro)
    const phoneRegex = /^\(\d{2}\)\s*\d{4,5}-\d{4}$/;
    if (!phoneRegex.test(phone)) {
      Alert.alert("Erro", "Telefone inválido. Use o formato (00) 00000-0000");
      return;
    }

    // Atualiza dados do cliente
    updateCustomerData({ name, email, phone });
    Alert.alert("Sucesso", "Cadastro atualizado com sucesso!");
  };

  const formatPhone = (text: string) => {
    // Remove todos os caracteres que não são dígitos
    const cleaned = text.replace(/\D/g, "");

    // Aplica a máscara de telefone
    let formatted = cleaned;
    if (cleaned.length > 0) {
      formatted = `(${cleaned.slice(0, 2)}`;
      if (cleaned.length > 2) {
        formatted += `) ${cleaned.slice(2, 6)}`;
        if (cleaned.length > 6) {
          formatted += `-${cleaned.slice(6, 10)}`;
        }
      }
    }

    setPhone(formatted);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Cadastro de Cliente</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nome Completo</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Digite seu nome"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Telefone</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={formatPhone}
            placeholder="(00) 00000-0000"
            keyboardType="phone-pad"
            maxLength={15}
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Cadastrar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Mantém os estilos anteriores
  // ... (como no exemplo anterior)
});
