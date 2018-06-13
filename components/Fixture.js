import React, { Component } from 'react'
import { Text, Image, View, ScrollView, TouchableHighlight} from 'react-native'
import styled from 'styled-components'

export default class Fixtures extends Component {

  static navigationOptions = {
    title: 'Fixture'
  };

  state = {
    form: [],
    team: this.props.navigation.getParam('home'),
    date: this.props.navigation.getParam('date'),
    group: this.props.navigation.getParam('group'),
  }

  componentDidMount() {
    const { navigation } = this.props
    fetch(`http://localhost:5000/form/${navigation.getParam('home')}/${navigation.getParam('away')}`).then(res => {
      return res.json()
    }).then(res => {
      this.setState({
        form: res
      })
    }).catch(err => {
      console.warn(err) 
    })
  }
  
  render() {
    const { form, date, group } = this.state

    return (
      <ScrollView>
        <FixtureHeaderView>
        {
          form.map((item, i) => {
            return (
              <View key={i}>
                <CountryView>
                  <Flag source={{uri: `https://raw.githubusercontent.com/Pau1fitz/world-cup/master/images/${item.team.toLowerCase().replace(/ /g,'')}.png`}}/>
                    <ActiveTeam>
                      <CountryName>{item.team}</CountryName>
                    </ActiveTeam> 
                </CountryView>
              </View>
            )
          })
        }
        </FixtureHeaderView>
        <FixtureDateContainer>
            <FixtureDate>Group {group}</FixtureDate>
            <FixtureDate>{date}</FixtureDate>
        </FixtureDateContainer>
        {
          form.map(item => {
            return (
              <ResultView key={item.team}>
                <FormView>
                  <FormText>{item.team.toUpperCase()} FORM</FormText>
                </FormView>
                {
                  item.results.map(result => {
                    const date = result.date.split('/')
                    const day = date[0]
                    const month = date[1]
                    const year = date[2].split(' ')[0]
                    const winLossDraw = result.form.replace(/"/g,"")
                    return (
                      <View key={result.date}>
                        <ResultTextView>
                          <ResultText>{result.game}</ResultText>
                          <ResultText>{`${day}-${month}-${year}`}</ResultText>
                          {winLossDraw === 'W' ? (
                          <FormBox color={'#6dbb00'} key>
                            <WhiteText>W</WhiteText>
                          </FormBox>
                          ) :
                          winLossDraw === 'L' ? (
                            <FormBox color={'#d6181f'}>
                              <WhiteText>L</WhiteText>
                            </FormBox>
                          ) : (
                            <FormBox color={'rgb(2, 2, 77)'}>
                              <WhiteText>D</WhiteText>
                            </FormBox>
                          )
                        }
                        </ResultTextView>
                      </View>
                    )
                  })
                }
            </ResultView>
            )
          })
        }
      </ScrollView>
    )
  }
}

const FixtureHeaderView = styled.View`
  justify-content: space-between;
  background: #6555DC;
  flex-direction: row;
  padding: 10px;
  height: 50px;
`
const CountryView = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  padding-bottom: 5px;
`
const FixtureDateContainer = styled.View`
  background: #6555DC;
  shadow-color: #6555DC;
  shadow-offset: 3px 6px;
  shadow-opacity: 0.8;
  shadow-radius: 2;
  padding-bottom: 12px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
`
const FixtureDate = styled.Text`
  color: #fff;
  text-align: center;
  margin-bottom: 2px;
`
const ActiveTeam = styled.View`
  flex-direction: row;
`
const Flag = styled.Image`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`
const CountryName = styled.Text`
  font-size: 18px;
  font-weight: 800;
  margin-top: 10px;
  color: #fff;
`
const FormBox = styled.View`
  background: ${props => props.color};
  padding: 5px;
  width: 28px;
  height: 28px;
  border-radius: 14px;
`
const WhiteText = styled.Text`
  color: #fff;
  text-align: center;
`
const FormView = styled.View`
  border-bottom-color: #fff;
  border-bottom-width: 1;
  margin-bottom: 6px;
`
const ResultTextView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const ResultText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 800;
  padding: 10px 0;
`
const FormText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 800;
  padding: 10px 0;
`
const ResultView = styled.View`
  background: #6555DC;
  shadow-color: #6555DC;
  shadow-offset: 3px 6px;
  shadow-opacity: 0.8;
  shadow-radius: 2;
  margin: 10px;
  padding: 10px;
  border-radius: 6px;
`