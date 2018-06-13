import React, { Component } from 'react'
import { Text, Image, View, ScrollView, TouchableHighlight} from 'react-native'
import styled from 'styled-components'
import moment from 'moment'

export default class Fixtures extends Component {

  static navigationOptions = {
    title: 'Fixture'
  };

  state = {
    form: [],
    team: this.props.navigation.getParam('home')
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

  changeTeam = (team) => {

    this.setState({
      team
    })
  }
  
  render() {
    const { form, team } = this.state

    const teamForm = form.filter(item => {
      return item.team === team 
    })

    return (
      <FixtureView>
        <FixtureHeaderView>
        {
          form.map(item => {
            return (
              <View key={item.team}>
                <CountryView>
                  <Flag source={{uri: `https://raw.githubusercontent.com/Pau1fitz/world-cup/master/images/${item.team.toLowerCase().replace(/ /g,'')}.png`}}/>
                  {
                    item.team === team && (
                      <ActiveTeam>
                        <CountryName>{item.team}</CountryName>   
                      </ActiveTeam> 
                    ) 
                  }
                  {
                    item.team !== team && (
                      <TouchableHighlight onPress={() => this.changeTeam(item.team)}>
                        <CountryName>{item.team}</CountryName>   
                      </TouchableHighlight> 
                    ) 
                  }
                </CountryView>
              </View>
            )
          })
        }
        </FixtureHeaderView>
        <FormHeaderView>
          <FormHeaderText>{team.toUpperCase()} FORM</FormHeaderText>
          {
            teamForm.map(item => {
              return (
                <FormIconView key={item.team}>
                  {item.results.map((result, i) => {
                    const winLossDraw = result.form.replace(/"/g,"")
                    return (
                      winLossDraw === 'W' ? (
                        <FormBox color={'#6dbb00'} key={i}>
                          <WhiteText>W</WhiteText>
                        </FormBox>
                      ) :
                      winLossDraw === 'L' ? (
                        <FormBox color={'#d6181f'} key={i}>
                          <WhiteText>L</WhiteText>
                        </FormBox>
                      ) : (
                        <FormBox color={'rgb(2, 2, 77)'} key={i}>
                          <WhiteText>D</WhiteText>
                        </FormBox>
                      )
                    )
                   })
                  })
                </FormIconView>
              )
            })
          }
        </FormHeaderView>
        {
          teamForm.map(item => {
            return (
              <View key={item.team}>
                {item.results.map(result => {
                  const winLossDraw = result.form.replace(/"/g,"")
                  const date = result.date.split('/')
                  const day = date[0]
                  const month = date[1]
                  const year = date[2].split(' ')[0]
                  return (
                    <View key={result.game}>
                      <Date>{`${day}-${month}-${year}`}</Date>
                      <ResultView>
                        <ResultText>{result.game}</ResultText>
                        {/* {winLossDraw === 'W' && (  
                          <FormBox color={'#6dbb00'}>
                            <WhiteText>W</WhiteText>
                          </FormBox>
                        )}
                        {winLossDraw === 'L' && (
                          <FormBox color={'#d6181f'}>
                            <WhiteText>L</WhiteText>
                          </FormBox>
                        )}
                        {winLossDraw === 'D' && (
                          <FormBox color={'rgb(2, 2, 77)'}>
                            <WhiteText>D</WhiteText>
                          </FormBox>
                        )} */}
                      </ResultView>
                    </View>
                  )
                })}
              </View>
            )
          })
        }
      </FixtureView>
    )
  }
}

const FixtureView = styled.ScrollView`
  margin: 10px;
`
const FixtureHeaderView = styled.View`
  flex-direction: row;
  justify-content: space-between;

`
const CountryView = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  padding-bottom: 5px;
`
const FormIconView = styled.View`
  flex-direction: row;
`
const FormHeaderView = styled.View`
  border-bottom-width: 1;
  border-bottom-color: #eee;
  padding-bottom: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const FormHeaderText = styled.Text`
  font-size: 16px;
  font-weight: 800;
`
const ActiveTeam = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  border-bottom-width: 2;
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
`
const Date = styled.Text`
  font-weight: normal;
  font-size: 14px;
  padding: 5px 0;
  background: #eaeaea;
  margin-bottom: 2px;
`
const ResultView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const ResultText = styled.Text`
  font-size: 16px;
  font-weight: 800;
`
const FormBox = styled.View`
  background: ${props => props.color};
  padding: 5px;
  width: 28px;
  margin-right: 5px;
`
const WhiteText = styled.Text`
  color: #fff;
  text-align: center;
`