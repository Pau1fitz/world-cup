import React, { Component } from 'react'
import { Button, View, Text, Image, TouchableWithoutFeedback } from 'react-native'
import FixturesAndResults from './components/FixturesAndResults'
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
      <HomeView>
        <Header>
          <Logo
            source={require('./images/WC.png')}
            />
        </Header>
        <Menu>
          <ButtonContainer>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('FixturesAndResults')}>
              <HomeText>Fixtures & Results</HomeText>
            </TouchableWithoutFeedback>
          </ButtonContainer>
          <ButtonContainer>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Groups')}>
              <HomeText>Groups</HomeText>
            </TouchableWithoutFeedback>
          </ButtonContainer>
          <ButtonContainer>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('TopScorers')}>
              <HomeText>Top Scorers</HomeText>
            </TouchableWithoutFeedback>
          </ButtonContainer>
          <ButtonContainer>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('TopAssists')}>
              <HomeText>Top Assists</HomeText>
            </TouchableWithoutFeedback>
          </ButtonContainer>
          <ButtonContainer>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Headlines')}>
              <HomeText>Headlines</HomeText>
            </TouchableWithoutFeedback>
          </ButtonContainer>
        </Menu>
      </HomeView>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    FixturesAndResults: FixturesAndResults,
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
`
const HomeView = styled.View`
  flex-direction: row;
  margin-top: 25px;
`
const Logo = styled.Image`
  width: 100px;
  height: 100px;
`
const Menu = styled.View`
  background: #fff;
  shadow-color: #000;
  shadow-offset: 2px 2px;
  shadow-opacity: 0.8;
  shadow-radius: 2;
  margin: 5px 10px;
  padding: 10px;
  border-radius: 6px;
  flex: 1;
  justify-content: center;
`
const ButtonContainer = styled.View`
  border-bottom-color: #eee;
  border-bottom-width: 1px;
`
const HomeText = styled.Text`
  font-size: 14px;
  padding: 10px 0;
`