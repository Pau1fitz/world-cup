import React, { Component } from 'react'
import { Button, View, Text } from 'react-native'
import Fixtures from './components/Fixtures'
import Fixture from './components/Fixture'
import Groups from './components/Groups'
import { createStackNavigator } from 'react-navigation'

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Go to Fixtures"
          onPress={() => this.props.navigation.navigate('Fixtures')}
        />
        <Button
          title="Go to Groups"
          onPress={() => this.props.navigation.navigate('Groups')}
        />
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Fixtures: Fixtures,
    Fixture: Fixture,
    Groups: Groups,
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'rgb(2, 2, 77);',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}