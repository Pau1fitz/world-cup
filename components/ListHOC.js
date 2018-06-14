import React, { Component } from 'react' 
import { View, Text } from 'react-native'
import Loading from './Loading'
import styled from 'styled-components'

export default HOCList = (title, api) => {
  return class List extends Component {
    
    static navigationOptions = {
      title
    }
    
    state = {
      items: [],
      loading: true
    }
    
    componentDidMount() {
      fetch(api)
      .then((r) => r.json())
      .then((items) => this.setState({
        items,
        loading: false
      }))
    }
      
    render() {
      const { items, loading } = this.state

      if(loading || items.length === 0) {
        return <Loading />
      }
      
      return (
        <ItemContainer>
          {items.map((item, i) => {
            const flag = `https://raw.githubusercontent.com/Pau1fitz/world-cup/master/images/${item.team.toLowerCase().replace(/ /g,'')}.png`
            return (
              <ItemBox key={i}>
                <ItemPosition>{i + 1}</ItemPosition>
                <Flag source={{uri: flag}}/>
                <ItemText>{item.name}</ItemText>
                <ItemText>{item.team}</ItemText>
                <ItemText>{item.amount}</ItemText>
              </ItemBox>
            )
          })}
        </ItemContainer>
      )
    }
  }
}

const ItemContainer = styled.View`
  background: #fff;
  border-radius: 6px;
  padding: 5px;
  shadow-color: #000;
  shadow-offset: 2px 2px;
  shadow-opacity: 0.8;
  shadow-radius: 2;
  margin-bottom: 10px;
`
const ItemBox = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-color: #eee;
  border-bottom-width: 1px;
`
const Flag = styled.Image`
  width: 26px;
  height: 26px;
  margin-left: 10px;
`
const ItemPosition = styled.Text`
  color: #000;
  padding: 10px;
  font-weight: 800;
  font-size: 14px;
  width: 20px;
`
const ItemText = styled.Text`
  color: #000;
  padding: 10px;
  font-weight: 800;
  font-size: 14px;
  flex-basis: 38%;
`