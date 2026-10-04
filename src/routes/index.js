import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import Tela1 from '../screens/tela1';
import Tela2 from '../screens/tela2';
import Tela3 from '../screens/tela3';
import Tela4 from '../screens/tela4';

export function TabViewExample() {
  const [index, setIndex] = useState(0);

  const routes = [
    { key: 'tela1', title: 'Pizza', icon: 'pizza-outline' },
    { key: 'tela2', title: 'Hamburger', icon: 'fast-food-outline' },
    { key: 'tela3', title: 'Bebida', icon: 'wine-outline' },
    { key: 'tela4', title: 'Pedido', icon: 'cart-outline' },
  ];

  const renderScene = SceneMap({
    tela1: Tela1,
    tela2: Tela2,
    tela3: Tela3,
    tela4: Tela4,
  });

  const renderIcon = ({ route, focused, color }) => (
    <Ionicons name={route.icon} size={20} color={color} />
  );

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      renderIcon={renderIcon}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      labelStyle={styles.tabLabel}
      activeColor="#FFFFFF"
      inactiveColor="#A8C3E0"
    />
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: Dimensions.get('window').width }}
          renderTabBar={renderTabBar}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#002855' },
  tabBar: { backgroundColor: '#002855', elevation: 8 },
  indicator: { backgroundColor: '#4CAF50', height: 3 },
  tabLabel: { fontSize: 11, fontWeight: '700', textTransform: 'none' },
});