import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { MenuItem } from '../componets/MenuItem';
import { menuData } from '../utils/menuData';
import { useTabNavigation } from '../routes/index';
import { Ionicons } from '@expo/vector-icons';

export default function Tela1() {
  const { setIndex } = useTabNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Cardápio de Pizzas</Text>
      <FlatList
        data={menuData.pizzas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MenuItem item={item} iconName="pizza-outline" />}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={
          <TouchableOpacity style={styles.navButton} onPress={() => setIndex(1)}>
            <Text style={styles.navButtonText}>Ver Hambúrgueres</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFF" />
          </TouchableOpacity>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA', paddingHorizontal: 16 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#002855', marginVertical: 14 },
  listContent: { paddingBottom: 20 },
  navButton: {
      flexDirection: 'row',
      backgroundColor: '#002855',
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 12,
  },
  navButtonText: { color: '#FFF', fontWeight: 'bold', marginRight: 8, fontSize: 15 },
});