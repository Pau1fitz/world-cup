import React, { Component } from 'react'
import { Text, Image, View, ScrollView, TouchableHighlight, Linking } from 'react-native'
import Loading from './Loading'
import styled from 'styled-components'
import moment from 'moment'

export default class Headlines extends Component {

  static navigationOptions = {
    title: 'Headlines'
  };

  state = {
    headlines: [],
    loading: true
  }

  componentDidMount() {
    fetch(`https://world-cup-russia.herokuapp.com/headlines`).then(res => {
      return res.json()
    }).then(headlines => {
      this.setState({
        headlines,
        loading: false
      })
    }).catch(err => {
      console.warn(err) 
    })
  }

  render() {

    const { headlines, loading } = this.state

    if(loading || headlines.length === 0) {
      return <Loading />
    }
    
    return(
      <ScrollView>
        {
         headlines.map(h => {
           console.log(h.image)
           return (
             <HeadlineContainer key={h._id}>
              <View>
                <HeadlineImage source={{uri: h.image.replace('http', 'https')}} />
              </View>
              <HeadlineTextContainer>
                <HeadlineText onPress={() => Linking.openURL(h.link)}>
                  {h.headline}
                </HeadlineText>
                <Text>{h.snippet}</Text>
              </HeadlineTextContainer>
             </HeadlineContainer>
           )
         }) 
        }
      </ScrollView>
    )
  } 
}

const HeadlineText = styled.Text`
  font-size: 16px;
  font-weight: 800;
`
const HeadlineContainer = styled.View`
  background: #fff;
  shadow-color: #000;
  shadow-offset: 2px 2px;
  shadow-opacity: 0.8;
  shadow-radius: 2;
  margin: 5px 10px;
  padding: 10px;
  border-radius: 6px;
  flex-direction: row;
`
const HeadlineTextContainer = styled.View`
  flex: 1;
`
const HeadlineImage = styled.Image`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`