import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../utils/cartContext';

export function MenuItem({ item, iconName }) {
  const { cartItems, addItem, removeItem } = useCart();
  const quantidade = cartItems[item.id]?.quantidade || 0;

  return (
    <View style={styles.card}>
      <Ionicons name={iconName} size={36} color="#002855" style={styles.icon} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.nome}</Text>
        <Text style={styles.description}>{item.descricao}</Text>
        <Text style={styles.price}>R$ {item.preco.toFixed(2).replace('.', ',')}</Text>
      </View>
      <View style={styles.actions}>
        {quantidade > 0 && (
          <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.btn}>
            <Ionicons name="remove-circle" size={28} color="#E74C3C" />
          </TouchableOpacity>
        )}
        {quantidade > 0 && <Text style={styles.qtyText}>{quantidade}</Text>}
        <TouchableOpacity onPress={() => addItem(item)} style={styles.btn}>
          <Ionicons name="add-circle" size={28} color="#2ECC71" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  description: {
    fontSize: 13,
    color: '#7F8C8D',
    marginVertical: 2,
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#D35400',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    padding: 2,
  },
  qtyText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 6,
  },
});