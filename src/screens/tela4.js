import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../utils/cartContext';

export default function Tela4() {
  const { cartItems, getTotal } = useCart();
  const [cep, setCep] = useState('');
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(null);

  const cartList = Object.values(cartItems);

  const buscarCep = async () => {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length !== 8) {
      Alert.alert('Erro', 'Por favor, digite um CEP válido com 8 dígitos.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await response.json();

      if (data.erro) {
        Alert.alert('Erro', 'CEP não encontrado.');
        setAddress(null);
      } else {
        setAddress(data);
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao buscar o CEP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Resumo do Pedido</Text>

      {cartList.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum item adicionado ao carrinho.</Text>
      ) : (
        cartList.map((item) => (
          <View key={item.id} style={styles.itemRow}>
            <Text style={styles.itemName}>{item.quantidade}x {item.nome}</Text>
            <Text style={styles.itemPrice}>
              R$ {(item.preco * item.quantidade).toFixed(2).replace('.', ',')}
            </Text>
          </View>
        ))
      )}

      <View style={styles.totalBox}>
        <Text style={styles.totalLabel}>Total Geral:</Text>
        <Text style={styles.totalAmount}>R$ {getTotal().toFixed(2).replace('.', ',')}</Text>
      </View>

      <Text style={styles.headerTitle}>Endereço de Entrega (viaCEP)</Text>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.input}
          placeholder="Digite o CEP (ex: 08285000)"
          keyboardType="numeric"
          value={cep}
          onChangeText={setCep}
          maxLength={8}
        />
        <TouchableOpacity style={styles.button} onPress={buscarCep}>
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Ionicons name="search" size={20} color="#FFF" />
          )}
        </TouchableOpacity>
      </View>

      {address && (
        <View style={styles.addressBox}>
          <Text style={styles.addressText}><Text style={styles.bold}>Rua:</Text> {address.logradouro}</Text>
          <Text style={styles.addressText}><Text style={styles.bold}>Bairro:</Text> {address.bairro}</Text>
          <Text style={styles.addressText}><Text style={styles.bold}>Cidade:</Text> {address.localidade} - {address.uf}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA', padding: 16 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#002855', marginTop: 12, marginBottom: 8 },
  emptyText: { color: '#7F8C8D', fontStyle: 'italic', marginBottom: 10 },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, borderBottomWidth: 1, borderColor: '#ECF0F1' },
  itemName: { fontSize: 15, color: '#333' },
  itemPrice: { fontSize: 15, fontWeight: 'bold', color: '#27AE60' },
  totalBox: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 14, padding: 12, backgroundColor: '#E8F4F8', borderRadius: 8 },
  totalLabel: { fontSize: 16, fontWeight: 'bold', color: '#002855' },
  totalAmount: { fontSize: 18, fontWeight: 'bold', color: '#E74C3C' },
  searchBox: { flexDirection: 'row', marginBottom: 12 },
  input: { flex: 1, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#BDC3C7', borderRadius: 8, paddingHorizontal: 12, height: 44 },
  button: { backgroundColor: '#002855', justifyContent: 'center', alignItems: 'center', width: 48, marginLeft: 8, borderRadius: 8 },
  addressBox: { backgroundColor: '#FFF', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#BDC3C7', marginBottom: 24 },
  addressText: { fontSize: 14, color: '#333', marginBottom: 4 },
  bold: { fontWeight: 'bold' },
});