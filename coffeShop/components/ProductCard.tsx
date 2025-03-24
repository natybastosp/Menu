import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

type ProductCardProps = {
  name: string;
  price: number;
  image: any;
  description?: string;
  onPress?: () => void;
};

export default function ProductCard({
  name,
  price,
  image,
  description,
  onPress,
}: ProductCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={image} style={styles.image} resizeMode="cover" />
      <View style={styles.details}>
        <Text style={styles.name}>{name}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
        <Text style={styles.price}>R$ {price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  details: {
    padding: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    color: "#666",
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    color: "#8B4513",
    fontWeight: "bold",
  },
});
