import React, { Component } from 'react'
import { Text, Image, TouchableWithoutFeedback, View, ScrollView } from 'react-native'
import Loading from './Loading'
import styled from 'styled-components'
import moment from 'moment'

export default class Fixtures extends Component {

  static navigationOptions = {
    title: 'Fixtures and Results'
  }
  
  state = {
    fixtures: [],
    teams: [],
    showFixture: false,
    loading: true
  }

  componentDidMount() {
    fetch('https://world-cup-russia.herokuapp.com/group-fixtures').then(res => {
      return res.json()
    }).then(fixtures => {
      this.setState({
        fixtures,
        loading: false
      })
    }).catch(err => {
      console.warn(err) 
    })
  }

  render() {
    const { fixtures, loading } = this.state
    
    const result = Object.values(fixtures.reduce((c, v) => {
      let t = v['kickOffTime'].split('T', 1)[0];
      c[t] = c[t] || {date: t,fixtures: []}
      c[t].fixtures.push(v);
      return c;
    }, {}));

    if(loading || fixtures.length === 0) {
      return <Loading />
    }

    return (
      <FixturesView>
        <FixturesScrollView>
          {
            result.map((f, i) => {
              const date = moment(f.date).format('ddd Do MMM')
              return (
                <View key={i}>
                  <Date>{date}</Date>
                  <FixtureContainer key={f.fixture}>
                  {
                    f.fixtures.map((f, i) => {
                      const fixtureText = f.fixture.trim().split(' v ')
                      const logoHome = `https://raw.githubusercontent.com/Pau1fitz/world-cup/master/images/${fixtureText[0].toLowerCase().replace(/ /g,'')}.png`
                      const logoAway = `https://raw.githubusercontent.com/Pau1fitz/world-cup/master/images/${fixtureText[1].toLowerCase().replace(/ /g,'')}.png`
                      const group = f.group

                      return (
                        <TouchableWithoutFeedback
                          key={i}
                          activeOpacity={0.001}
                          onPress={() => {
                            this.props.navigation.navigate('Fixture', {
                            home: fixtureText[0],
                            away: fixtureText[1],
                            date,
                            group
                          });
                        }}
                      >
                      <FixtureTextContainer>
                          <FlexView>
                            <Flag source={{uri: logoHome}}/>
                            <TeamText align={'left'}>{fixtureText[0]}</TeamText>
                          </FlexView>
                          <FlexView>
                            <TimeText>{moment(f.kickOffTime).format('HH:mm')}</TimeText>
                          </FlexView>
                          <FlexView>
                            <TeamText align={'right'}>{fixtureText[1]}</TeamText>
                            <Flag source={{uri: logoAway}}/>
                          </FlexView>
                        </FixtureTextContainer>
                      </TouchableWithoutFeedback>
                      )
                    })
                  }
                  </FixtureContainer>
                </View>
              )
            })
          }
        </FixturesScrollView>
      </FixturesView>
    )
  }
}

const FixturesView = styled.View`
  background: #edeef2;
`
const FixturesScrollView = styled.ScrollView`
  padding: 0 10px;
`
const FixtureContainer = styled.View`
  background: #fff;
  border-radius: 6px;
  padding: 5px;
  shadow-color: #000;
  shadow-offset: 2px 2px;
  shadow-opacity: 0.8;
  shadow-radius: 2;
  margin-bottom: 10px;
`
const Date = styled.Text`
  font-weight: normal;
  font-size: 14px;
  font-weight: 800;
  padding: 10px 0;
  background: #eaeaea;
  color: #000;
`
const Flag = styled.Image`
  width: 26px;
  height: 26px;
  align-self: center;
`
const FixtureTextContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 5px 0;
`
const FlexView = styled.View`
  display: flex;
  flex-direction: row;
`
const TimeText = styled.Text`
  color: #000;
  flex-basis: 20%;
  font-weight: 800;
  font-size: 12px;
`
const TeamText = styled.Text`
  color: #000;
  padding: 10px;
  font-weight: 800;
  flex-basis: 32%;
  font-size: 14px;
  text-align: ${props => props.align};
`

