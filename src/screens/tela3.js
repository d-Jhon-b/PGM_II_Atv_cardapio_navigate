import React from 'react';
import { View, Text, FlatList, StyleSheet,TouchableOpacity } from 'react-native';
import { MenuItem } from '../componets/MenuItem';
import { menuData } from '../utils/menuData';
import { useTabNavigation } from '../routes/index';
import { Ionicons } from '@expo/vector-icons';


export default function Tela3() {
    const { setIndex } = useTabNavigation();
    return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Bebidas Geladas</Text>
      <FlatList
        data={menuData.bebidas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MenuItem item={item} iconName="wine-outline" />}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.navButtonSecondary} onPress={() => setIndex(1)}>
              <Ionicons name="arrow-back" size={18} color="#002855" />
              <Text style={styles.navButtonTextSecondary}>Hambúrgueres</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButtonCart} onPress={() => setIndex(3)}>
              <Text style={styles.navButtonText}>Ir ao Pedido</Text>
              <Ionicons name="cart-outline" size={18} color="#FFF" />
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA', paddingHorizontal: 16 },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#002855', marginVertical: 14 },
    listContent: { paddingBottom: 20 },
    buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
    navButtonCart: {
        flexDirection: 'row',
        backgroundColor: '#2ECC71',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        flex: 0.48,
        justifyContent: 'center',
    },
    navButtonSecondary: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#002855',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        flex: 0.48,
        justifyContent: 'center',
    },
    navButtonText: { color: '#FFF', fontWeight: 'bold', marginRight: 8, fontSize: 14 },
    navButtonTextSecondary: { color: '#002855', fontWeight: 'bold', marginLeft: 8, fontSize: 14 },
});