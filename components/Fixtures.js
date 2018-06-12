import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import styled from 'styled-components';
import moment from 'moment';

export default class Fixtures extends Component {
  
  state = {
    fixtures: []
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
      <View>
        <StyledHeader />
        <ScrollView>
          {fixtures.map((fixture, i) => {
            const fixtureText = fixture.fixture.trim().split(' v ')
            console.log(fixtureText)
            return (
              <View key={fixture.fixture}>
                {i == 0 && (
                  <Date>{moment(fixture.kickOffTime).format('ddd Do MMM')}</Date>
                )}
                {i != 0 && moment(fixtures[i].kickOffTime).format('ddd Do MMM') != moment(fixtures[i - 1].kickOffTime).format('ddd Do MMM')  && (
                  <Date>{moment(fixture.kickOffTime).format('ddd Do MMM')}</Date>
                )}
                <FixtureTextContainer>
                  <FlexView>
                    <TeamText>{fixtureText[0]}</TeamText>
                  </FlexView>
                  <FlexView>
                    <FixtureText>{moment(fixture.kickOffTime).format('HH:mm')}</FixtureText>
                  </FlexView>
                  <FlexView>
                    <TeamText>{fixtureText[1]}</TeamText>
                  </FlexView>
                </FixtureTextContainer>
              </View>
            )
          })}
        </ScrollView>
      </View>
    )
  }
}

const StyledHeader = styled.View`
	background: rgb(2, 2, 77);
	height: 60px;
	margin-top: 20px;
	flex-direction: row;
	justify-content: space-around;
`

const Date = styled.Text`
  font-weight: normal;
  font-size: 16px;
  text-align: center;
  padding: 5px 0;
  background: #eaeaea;
  margin-bottom: 2px;
`

const FixtureTextContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
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
  flex-basis: 33.333%;
`
