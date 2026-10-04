import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function MenuItem({ nome, descricao, preco }) {
  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.title}>{nome}</Text>
        <Text style={styles.description}>{descricao}</Text>
        <Text style={styles.price}>{preco}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  info: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E74C3C',
  },
});