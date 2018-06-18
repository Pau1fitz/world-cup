import React, { Component } from 'react'
import { Text, Image, View, ScrollView, TouchableHighlight} from 'react-native'
import Loading from './Loading'
import styled from 'styled-components'
import moment from 'moment'

export default class Groups extends Component {

  static navigationOptions = {
    title: 'Groups'
  };

  state = {
    groups: [],
    loading: true
  }

  componentDidMount() {
    fetch(`https://world-cup-russia.herokuapp.com/groups`).then(res => {
      return res.json()
    }).then(groups => {
      this.setState({
        groups,
        loading: false
      })
    }).catch(err => {
      console.warn(err) 
    })
  }

  render() {
    
    const { groups, loading } = this.state

    if(loading || groups.length === 0) {
      return <Loading />
    }

    return(
      <ScrollView>
        {groups.map(group => {
          return (
            <View key={group.groupName}>
              <GroupHeaderText>Group {group.groupName}</GroupHeaderText>
              <View>
                <GroupView>
                  <GroupHeader>
                    <IconDummy />
                    <TeamDummy>Teams</TeamDummy>
                    <GroupHeaderWLD>D</GroupHeaderWLD>
                    <GroupHeaderWLD>L</GroupHeaderWLD>
                    <GroupHeaderWLD>W</GroupHeaderWLD>
                    <GroupHeaderWLD>Pts</GroupHeaderWLD>
                  </GroupHeader>
                  {group.teams.map(team => {
                    const logo = `https://raw.githubusercontent.com/Pau1fitz/world-cup/master/images/${team.name.toLowerCase().replace(/ /g,'')}.png`
                    return (
                      <TeamView key={team.name}>
                        <Flag source={{uri: logo}}/>
                        <TeamNameText>{team.name}</TeamNameText>
                        <TeamText>{team.draw}</TeamText>
                        <TeamText>{team.loss}</TeamText>
                        <TeamText>{team.won}</TeamText>
                        <TeamText>{team.points}</TeamText>
                      </TeamView>
                    )
                  })}
                </GroupView>
              </View>
            </View>
          )
        })}
      </ScrollView>
    )
  } 

}

const GroupView = styled.View`
  background: #fff;
  shadow-color: #000;
  shadow-offset: 2px 2px;
  shadow-opacity: 0.8;
  shadow-radius: 2;
  margin: 5px 10px;
  padding: 10px;
  border-radius: 6px;
`
const GroupHeaderText = styled.Text`
  margin: 5px 10px;
  font-weight: 800;
`
const GroupHeader = styled.View`
  flex-direction: row;
  border-bottom-color: #eee;
  border-bottom-width: 1px;
`
const TeamDummy = styled.Text`
  flex-basis: 50%;
  color: #000;
  font-weight: 800;
`
const IconDummy = styled.View`
  width: 26px;
  height: 26px;
  margin-right: 10px;
`
const GroupHeaderWLD = styled.Text`
  font-weight: 800;
  flex-basis: 10%;
`
const TeamText = styled.Text`
  color: #000;
  font-weight: 800;
  flex-basis: 11%;
`
const TeamNameText = styled.Text`
  color: #000;
  font-weight: 800;
  flex-basis: 50%;
`
const TeamView = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 5px 0;
  border-bottom-color: #eee;
  border-bottom-width: 1px;
`
const Flag = styled.Image`
  width: 26px;
  height: 26px;
  margin-right: 10px;
`