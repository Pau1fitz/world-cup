import React, { Component } from 'react'
import { Button, View, Text, Image } from 'react-native'
import Fixtures from './components/Fixtures'
import Fixture from './components/Fixture'
import Groups from './components/Groups'
import Headlines from './components/Headlines'
import List from './components/ListHOC'
import { createStackNavigator } from 'react-navigation'
import styled from 'styled-components'

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    return (
      <View>
        <Header>
          <Logo
            source={require('./images/WC.png')}
            />
          <FIFAText>FIFA 2018</FIFAText>
        </Header>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Button
            title="Fixtures"
            onPress={() => this.props.navigation.navigate('Fixtures and Results')}
          />
          <Button
            title="Groups"
            onPress={() => this.props.navigation.navigate('Groups')}
          />
          <Button
            title="Top Scorers"
            onPress={() => this.props.navigation.navigate('TopScorers')}
          />
          <Button
            title="Top Assists"
            onPress={() => this.props.navigation.navigate('TopAssists')}
          />
          <Button
            title="Headlines"
            onPress={() => this.props.navigation.navigate('Headlines')}
          />
        </View>
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
    Headlines: Headlines,
    TopScorers: List('Top Scorers', 'https://world-cup-russia.herokuapp.com/top-scorers'),
    TopAssists: List('Top Assists', 'https://world-cup-russia.herokuapp.com/top-assists'),
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#0e2446',
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

const Header = styled.View`
  flex-direction: row;
  align-items: center;
`
const FIFAText = styled.Text`
  font-weight: 800;
  margin-left: -5px;
`
const Logo = styled.Image`
  width: 100px;
  height: 100px;
`