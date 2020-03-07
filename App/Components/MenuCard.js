import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text,TouchableOpacity } from 'react-native'
import {Card,Image } from 'react-native-elements';

export default class MenuCard extends Component {
    constructor(props){
        super(props)
    
        this.action = this.action.bind(this);
      }

      action(){
        this.props.navigationObject.navigate(this.props.navigateScreen)
      }

  render() {
    return (
        <Card 
        containerStyle={{backgroundColor: 'white', borderWidth:2, borderRadius:10}}>
        <TouchableOpacity onPress={() => this.action()} style={{flex: 1, flexDirection: 'row'}}>
        <View>
            <Image source={{uri:this.props.imageUrl}}  
          style={{width: 120, height: 120}} resizeMode="stretch"/>
        </View>
        <View>
            <Text style={{fontSize:20, marginLeft:"5%", marginBottom:"2%", fontFamily: 'sans-serif-medium', fontWeight: '500',color:"black" }}>
               {this.props.title}
            </Text>
            <Text style={{fontSize:15, marginLeft:"5%", marginBottom:"10%", fontFamily: 'sans-serif-medium', fontWeight: '500',width:"60%",color:"black" }}>
              {this.props.subtext}
            </Text>
        </View>
        </TouchableOpacity>
       </Card>
    )
  }
}
