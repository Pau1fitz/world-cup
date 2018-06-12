import React, { Component } from 'react'
import { Text, Image, View, ScrollView} from 'react-native'
import styled from 'styled-components'
import moment from 'moment'


export default class Fixtures extends Component {

  static navigationOptions = {
    title: 'Fixture'
  };

  state = {
    form: []
  }

  componentDidMount() {

    const { navigation } = this.props

    console.log(`http://localhost:5000/form/${navigation.getParam('home')}/${navigation.getParam('away')}`)

    fetch(`http://localhost:5000/form/${navigation.getParam('home')}/${navigation.getParam('away')}`).then(res => {
      return res.json()
    }).then(res => {
      console.log(res)
      this.setState({
        form: res
      })
    }).catch(err => {
      console.warn(err) 
    })
  }
  
  render() {
    const { form } = this.state
    return (
      <FixtureView>
        {
          form.map(item => {
            return (
              <View key={item.team}>
                <CountryView>
                  <Flag source={{uri: `https://raw.githubusercontent.com/Pau1fitz/world-cup/master/images/${item.team.toLowerCase().replace(/ /g,'')}.png`}}/>
                  <CountryName>{item.team}</CountryName>
                </CountryView>
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
                        {winLossDraw === 'W' && (
                          <WinBox>
                            <WhiteText>W</WhiteText>
                          </WinBox>
                        )}
                        {winLossDraw === 'L' && (
                          <LossBox>
                            <WhiteText>L</WhiteText>
                          </LossBox>
                        )}
                        {winLossDraw === 'D' && (
                          <DrawBox>
                            <WhiteText>D</WhiteText>
                          </DrawBox>
                        )}
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
const CountryView = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`
const Flag = styled.Image`
  width: 40px;
  height: 40px;
`
const CountryName = styled.Text`
  font-size: 18px;
  font-weight: 800;
  margin-left: 10px;
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
const WinBox = styled.View`
  background: #6dbb00;
  padding: 5px;
  width: 28px;
  border-radius: 14px;
`
const LossBox = styled.View`
  background: #d6181f;
  padding: 5px;
  width: 28px;
  border-radius: 14px;
`
const DrawBox = styled.View`
  background: rgb(2, 2, 77);
  padding: 5px;
  width: 28px;
  border-radius: 14px;
`
const WhiteText = styled.Text`
  color: #fff;
  text-align: center;
`