import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { TabViewExample } from './src/routes/index';
import { CartProvider } from './src/utils/cartContext';
export default function App() {
  return (
    <CartProvider>
      <TabViewExample />
      <StatusBar style="light" />
    </CartProvider>
  );
}

