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
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useAppContext } from "@/context/AppContext";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const { customerData, updateCustomerData } = useAppContext();
  const [name, setName] = useState(customerData.name);
  const [email, setEmail] = useState(customerData.email);
  const [phone, setPhone] = useState(customerData.phone);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = () => {
    // Basic validations
    if (!name || !email || !phone) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Invalid email");
      return;
    }

    // Phone validation (Brazilian format)
    const phoneRegex = /^\(\d{2}\)\s*\d{4,5}-\d{4}$/;
    if (!phoneRegex.test(phone)) {
      Alert.alert(
        "Error",
        "Invalid phone number. Use the format (00) 00000-0000"
      );
      return;
    }

    // Update customer data
    updateCustomerData({ name, email, phone });
    Alert.alert("Success", "Profile updated successfully!");
    setIsEditing(false);
  };

  const formatPhone = (text: string) => {
    // Remove all non-digit characters
    const cleaned = text.replace(/\D/g, "");

    // Apply phone mask
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
      <LinearGradient
        colors={["#8B4513", "#D2691E"]}
        style={styles.gradientBackground}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.profileHeader}>
              <View style={styles.avatarContainer}>
                <Image
                  source={require("@/assets/images/coffeeGroup.png")}
                  style={styles.avatar}
                />
                {/*    <TouchableOpacity
                  style={styles.editAvatarButton}
                  onPress={() =>
                    Alert.alert("Notice", "Avatar editing not implemented")
                  }
                >
                  <Ionicons name="camera" size={20} color="white" />
                </TouchableOpacity> */}
              </View>
              <Text style={styles.welcomeText}>
                {customerData.name
                  ? `Hello, ${customerData.name}`
                  : "My Profile"}
              </Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="person"
                  size={20}
                  color="#8B4513"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="Full Name"
                  editable={isEditing}
                />
              </View>

              <View style={styles.inputContainer}>
                <Ionicons
                  name="mail"
                  size={20}
                  color="#8B4513"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={isEditing}
                />
              </View>

              <View style={styles.inputContainer}>
                <Ionicons
                  name="call"
                  size={20}
                  color="#8B4513"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  value={phone}
                  onChangeText={formatPhone}
                  placeholder="Phone"
                  keyboardType="phone-pad"
                  maxLength={15}
                  editable={isEditing}
                />
              </View>

              <View style={styles.buttonContainer}>
                {!isEditing ? (
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => setIsEditing(true)}
                  >
                    <Ionicons name="create" size={20} color="white" />
                    <Text style={styles.buttonText}>Edit Profile</Text>
                  </TouchableOpacity>
                ) : (
                  <>
                    <TouchableOpacity
                      style={styles.saveButton}
                      onPress={handleSubmit}
                    >
                      <Ionicons name="save" size={20} color="white" />
                      <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={() => {
                        setName(customerData.name);
                        setEmail(customerData.email);
                        setPhone(customerData.phone);
                        setIsEditing(false);
                      }}
                    >
                      <Ionicons name="close" size={20} color="white" />
                      <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
  },
  keyboardAvoidView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 20,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 15,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "white",
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#8B4513",
    borderRadius: 20,
    padding: 5,
  },
  welcomeText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  formContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    marginBottom: 20,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    backgroundColor: "#8B4513",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: "#F44336",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
  },
  buttonText: {
    color: "white",
    marginLeft: 5,
    fontWeight: "bold",
  },
});
