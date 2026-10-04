import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { MenuItem } from '../componets/MenuItem';
import { menuData } from '../utils/menuData';

export default function Tela2() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Hambúrgueres Artesanais</Text>
      <FlatList
        data={menuData.hamburgueres}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MenuItem item={item} iconName="fast-food-outline" />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA', paddingHorizontal: 16 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#002855', marginVertical: 14 },
  listContent: { paddingBottom: 20 },
});