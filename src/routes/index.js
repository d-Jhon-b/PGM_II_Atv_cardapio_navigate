import React, { useState, createContext, useContext } from 'react';
import { Dimensions, StyleSheet, Platform } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import Tela1 from '../screens/tela1';
import Tela2 from '../screens/tela2';
import Tela3 from '../screens/tela3';
import Tela4 from '../screens/tela4';

const NavigationTabContext = createContext();

export function useTabNavigation() {
  return useContext(NavigationTabContext);
}

const renderScene = SceneMap({
  tela1: Tela1,
  tela2: Tela2,
  tela3: Tela3,
  tela4: Tela4,
});

export function TabViewExample() {
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: 'tela1', title: 'Pizza', icon: 'pizza-outline' },
    { key: 'tela2', title: 'Hamburger', icon: 'fast-food-outline' },
    { key: 'tela3', title: 'Bebida', icon: 'wine-outline' },
    { key: 'tela4', title: 'Pedido', icon: 'cart-outline' },
  ]);

  const renderIcon = ({ route, color }) => (
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
    <NavigationTabContext.Provider value={{ setIndex, currentIndex: index }}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeArea}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: Dimensions.get('window').width }}
            renderTabBar={renderTabBar}
            // Desativa o gesture/animation no Web para evitar a quebra no pulo do índice 3 -> 0
            swipeEnabled={Platform.OS !== 'web'}
            animationEnabled={Platform.OS !== 'web'}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </NavigationTabContext.Provider>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#002855' },
  tabBar: { backgroundColor: '#002855', elevation: 8 },
  indicator: { backgroundColor: '#FF9900', height: 3 },
  tabLabel: { fontSize: 11, fontWeight: '700', textTransform: 'none' },
});