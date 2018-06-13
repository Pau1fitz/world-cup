import React, { Component } from 'react'
import { Text, Image, View, ScrollView, TouchableHighlight} from 'react-native'
import styled from 'styled-components'
import moment from 'moment'

export default class Groups extends Component {

  static navigationOptions = {
    title: 'Groups'
  };

  state = {
    groups: []
  }

  componentDidMount() {
    fetch(`http://localhost:5000/groups`).then(res => {
      return res.json()
    }).then(res => {
      this.setState({
        groups: res
      })
    }).catch(err => {
      console.warn(err) 
    })
  }

  render() {
    
    const {groups} = this.state
    return(
      <View>
        {groups.map(group => {
          return (
            <View key={group.groupName}>
              <Text>Group {group.groupName}</Text>
              <Table>
                <GroupView>
                  {group.teams.map(team => {
                    const logo = `https://raw.githubusercontent.com/Pau1fitz/world-cup/master/images/${team.name.toLowerCase().replace(/ /g,'')}.png`
                    return (
                      <TeamView key={team.name}>
                        <Flag source={{uri: logo}}/>
                        <TeamText>{team.name}</TeamText>
                        <TeamText>{team.won}</TeamText>
                        <TeamText>{team.draw}</TeamText>
                        <TeamText>{team.loss}</TeamText>
                        <TeamText>{team.points}</TeamText>
                      </TeamView>
                    )
                  })}
                </GroupView>
              </Table>
            </View>
          )
        })}
      </View>
    )
  } 

}

const GroupView = styled.View`
  background: #6555DC;
  shadow-color: #6555DC;
  shadow-offset: 3px 6px;
  shadow-opacity: 0.8;
  shadow-radius: 2;
  margin: 10px;
  padding: 10px;
  border-radius: 6px;
`

const Table = styled.View``
const TableHeader = styled.View``

const TeamText = styled.Text`
  color: #fff;
  font-weight: 800;
`

const TeamView = styled.View`
  flex-direction: row;
  margin: 5px 0;
  justify-content: space-between;
`

const Flag = styled.Image`
  width: 26px;
  height: 25px;
`