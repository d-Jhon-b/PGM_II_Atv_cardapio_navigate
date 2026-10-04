import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { MenuItem } from '../componets/MenuItem';
import { menuData } from '../utils/menuData';

export default function Tela1() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>🍕 Nossas Pizzas</Text>
      <FlatList
        data={menuData.pizzas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MenuItem nome={item.nome} descricao={item.descricao} preco={item.preco} />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#D35400',
    marginVertical: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
});