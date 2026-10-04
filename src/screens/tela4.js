import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator, 
  Modal, 
  ScrollView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../utils/cartContext';
import { useTabNavigation } from '../routes/index';

export default function Tela4() {
  const { cartItems, getTotal, clearCart } = useCart();
  const { setIndex } = useTabNavigation();
  const [cep, setCep] = useState('');
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({ title: '', message: '', type: 'info' });

  const cartList = Object.values(cartItems);

  const showAlert = (title, message, type = 'info') => {
    setModalData({ title, message, type });
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    
    if (modalData.type === 'success') {
      clearCart();
      setCep('');
      setAddress(null);
    }
  };

  const handleFinishOrder = () => {
    if (cartList.length === 0) {
      showAlert('Atenção', 'Seu carrinho está vazio. Adicione itens antes de finalizar.', 'warning');
      return;
    }
    showAlert('Sucesso', 'Pedido enviado com sucesso!', 'success');
  };

  const buscarCep = async () => {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length !== 8) {
      showAlert('Atenção', 'Por favor, digite um CEP válido com 8 dígitos.', 'warning');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await response.json();

      if (data.erro) {
        showAlert('Erro', 'CEP não encontrado.', 'error');
        setAddress(null);
      } else {
        setAddress(data);
      }
    } catch (error) {
      showAlert('Erro', 'Ocorreu um erro ao buscar o CEP.', 'error');
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

      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => setIndex(0)}>
          <Ionicons name="arrow-back" size={18} color="#002855" />
          <Text style={styles.backButtonText}>Voltar ao Cardápio</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.finishButton} 
          onPress={handleFinishOrder}
        >
          <Text style={styles.finishButtonText}>Finalizar Pedido</Text>
          <Ionicons name="checkmark-circle-outline" size={18} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Modal Customizado */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons 
              name={
                modalData.type === 'success' ? 'checkmark-circle' : 
                modalData.type === 'error' ? 'close-circle' : 'alert-circle'
              } 
              size={48} 
              color={
                modalData.type === 'success' ? '#27AE60' : 
                modalData.type === 'error' ? '#E74C3C' : '#F39C12'
              } 
            />
            <Text style={styles.modalTitle}>{modalData.title}</Text>
            <Text style={styles.modalMessage}>{modalData.message}</Text>
            
            <TouchableOpacity 
              style={[
                styles.modalButton, 
                { backgroundColor: modalData.type === 'success' ? '#27AE60' : '#002855' }
              ]} 
              onPress={handleCloseModal}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  addressBox: { backgroundColor: '#FFF', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#BDC3C7', marginBottom: 16 },
  addressText: { fontSize: 14, color: '#333', marginBottom: 4 },
  bold: { fontWeight: 'bold' },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 16, paddingBottom: 20 },
  backButton: { flexDirection: 'row', borderWidth: 1, borderColor: '#002855', padding: 12, borderRadius: 8, alignItems: 'center', flex: 0.48, justifyContent: 'center' },
  backButtonText: { color: '#002855', fontWeight: 'bold', marginLeft: 6, fontSize: 13 },
  finishButton: { flexDirection: 'row', backgroundColor: '#27AE60', padding: 12, borderRadius: 8, alignItems: 'center', flex: 0.48, justifyContent: 'center' },
  finishButtonText: { color: '#FFF', fontWeight: 'bold', marginRight: 6, fontSize: 13 },
  
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#002855',
    marginTop: 10,
    marginBottom: 6,
  },
  modalMessage: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 18,
  },
  modalButton: {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});