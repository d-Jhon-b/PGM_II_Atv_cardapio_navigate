import React, { useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Tela1 from '../screens/tela1';
import Tela2 from '../screens/tela2';
import Tela3 from '../screens/tela3';

export function TabViewExample() {
  const [index, setIndex] = useState(0);

  const routes = [
    { key: 'tela1', title: 'Pizza' },
    { key: 'tela2', title: 'Hamburger' },
    { key: 'tela3', title: 'Bebida' },
  ];

  const renderScene = SceneMap({
    tela1: Tela1,
    tela2: Tela2,
    tela3: Tela3,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
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
  safeArea: {
    flex: 1,
    backgroundColor: '#002855',
  },
  tabBar: {
    backgroundColor: '#002855',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  indicator: {
    backgroundColor: '#FF9900',
    height: 4,
    borderRadius: 2,
  },
  tabLabel: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});