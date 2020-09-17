import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import { Button, Icon,Card } from 'react-native-elements';

export default class OrderHistoryCard extends Component {
  render() {
    return (
      <Card
        title={this.props.title}
        image={{uri:this.props.imageUrl}}>
        <View style={{marginTop:'1%'}}>
            <Text style={{fontSize:18, fontFamily: 'sans-serif',color:"black"}} >Amount-   <Text style={{}}>{'\u20B9'} {this.props.orderAmount}</Text></Text>
       </View>
       <View style={{marginTop:'1%'}}>
            <Text style={{fontSize:18, fontFamily: 'sans-serif',color:"black"}} >Start Date :- {new Date(this.props.startDate).toDateString()}</Text>
       </View>
       <View style={{marginTop:'1%', marginBottom:'1%'}}>
            <Text style={{fontSize:18, fontFamily: 'sans-serif',color:"black"}} >End Date :- {new Date(this.props.endDate).toDateString()}</Text>
       </View>
       {this.props.isActive && new Date(this.props.endDate).getTime() > new Date().getTime() &&
               <Button
               buttonStyle={{ borderRadius:5, marginLeft: 0, marginRight:5, marginBottom: 0}}
               title={'Cancel Order'}
               onPress={() => this.props.onPressFunction(this.props.orderId)}/>
       }

       {!this.props.isActive &&
                <View><Text style={{fontSize:18, fontFamily: 'sans-serif',color:"red", fontWeight:"bold"}} >Subscription Cancelled</Text></View>
        }

        {this.props.isActive && new Date(this.props.endDate).getTime() < new Date().getTime() &&
               <View><Text style={{fontSize:18, fontFamily: 'sans-serif',color:"green", fontWeight:"bold"}}>Subscription Ended successfully </Text></View>
        }

      </Card>
    )
  }
}