import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import {
  createMaterialTopTabNavigator,
  createAppContainer,
  createStackNavigator
} from 'react-navigation';

import { setLocalNotification } from './utils/helpers';
import Constants from 'expo-constants';
import { purple, blue, white, } from './utils/colors';
import { MaterialIcons } from '@expo/vector-icons';
import AddDeck from './components/AddDeck';
import DeckList from './components/DeckList';
import Deck from './components/Deck';

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = createMaterialTopTabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Deck List',
      tabBarIcon: ({ tintColor }) => <MaterialIcons name='list' color={tintColor} />,
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Entry',
      tabBarIcon: ({ tintColor }) => <MaterialIcons name='playlist-add' size={30} color={tintColor} />
    }
  },
}, {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: white,
      showIcon: true,
      style: {
        height: 60,
        backgroundColor: blue,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
)

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null,
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    })
  }
})

const AppContainer = createAppContainer(MainNavigator);

export default class App extends Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <UdaciStatusBar backgroundColor={purple} barStyle='light-content' />
          <AppContainer />
        </View>
      </Provider>
    );
  }
}
