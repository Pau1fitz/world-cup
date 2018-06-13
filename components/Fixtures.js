import React, { Component } from 'react';
import { Text, Image, TouchableHighlight, View, ScrollView } from 'react-native';
import styled from 'styled-components';
import moment from 'moment';

export default class Fixtures extends Component {

  static navigationOptions = {
    title: 'Fixtures'
  };
  
  state = {
    fixtures: [],
    teams: [],
    showFixture: false
  }

  componentDidMount() {
    fetch('http://localhost:5000/group-fixtures').then(res => {
      return res.json()
    }).then(res => {
      this.setState({
        fixtures: res
      })
    }).catch(err => {
      console.warn(err) 
    })
  }

  render() {

    const { fixtures } = this.state;
    return (
      <FixturesView>
        <ScrollView>
          {fixtures.map((f, i) => {
            const fixtureText = f.fixture.trim().split(' v ')
            const logoHome = `https://raw.githubusercontent.com/Pau1fitz/world-cup/master/images/${fixtureText[0].toLowerCase().replace(/ /g,'')}.png`
            const logoAway = `https://raw.githubusercontent.com/Pau1fitz/world-cup/master/images/${fixtureText[1].toLowerCase().replace(/ /g,'')}.png`
            return (
              <View key={f.fixture}>
                {i == 0 && (
                  <Date>{moment(f.kickOffTime).format('ddd Do MMM')}</Date>
                )}
                {i != 0 && moment(fixtures[i].kickOffTime).format('ddd Do MMM') != moment(fixtures[i - 1].kickOffTime).format('ddd Do MMM')  && (
                  <Date>{moment(f.kickOffTime).format('ddd Do MMM')}</Date>
                )}
                <TouchableHighlight
                  onPress={() => {
                    this.props.navigation.navigate('Fixture', {
                      home: fixtureText[0],
                      away: fixtureText[1],
                    });
                  }}
                >
                  <FixtureTextContainer>
                    <FlexView>
                      <Flag source={{uri: logoHome}}/>
                      <TeamText>{fixtureText[0]}</TeamText>
                    </FlexView>
                    <FlexView>
                      <FixtureText>{moment(f.kickOffTime).format('HH:mm')}</FixtureText>
                    </FlexView>
                    <FlexView>
                      <TeamText>{fixtureText[1]}</TeamText>
                      <Flag source={{uri: logoAway}}/>
                    </FlexView>
                  </FixtureTextContainer>
                </TouchableHighlight>
              </View>
            )
          })}
        </ScrollView>
      </FixturesView>
    )
  }
}

const FixturesView = styled.View`
  background: #eee;
`

const Date = styled.Text`
  font-weight: normal;
  font-size: 16px;
  text-align: center;
  padding: 5px 0;
  background: #eaeaea;
  margin-bottom: 2px;
`

const Flag = styled.Image`
  width: 20px;
  height: 20px;
  align-self: center;
`

const FixtureTextContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  padding: 5px 0;
`

const FlexView = styled.View`
  display: flex;
  flex-direction: row;
`
const FixtureText = styled.Text`
  color: rgb(51, 51, 51);
  padding: 10px;
  flex-basis: 20%;
`

const TeamText = styled.Text`
  color: rgb(51, 51, 51);
  padding: 10px;
  font-weight: 800;
  flex-basis: 32%;
`
