import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View,FlatList,TouchableOpacity  } from 'react-native'
import {Card,Image,CheckBox,Button } from 'react-native-elements';
import { connect } from 'react-redux'
import Toast from 'react-native-simple-toast';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/PaymentScreenStyle'

class PaymentScreen extends Component {

  constructor(props){
    super(props)
    let selectedProduct = this.props.navigation.getParam("selectedProduct");
    let quantity = this.props.navigation.getParam("quantity");
    let subscriptionMode = this.props.navigation.getParam("subscriptionMode");

    let orderAmount = (subscriptionMode.days*quantity*selectedProduct.price)-((subscriptionMode.days*quantity*selectedProduct.price *subscriptionMode.discountRate)/100);

    this.state ={
      selectedProduct: selectedProduct,
      quantity: quantity,
      subscriptionMode : subscriptionMode,
      orderAmount : orderAmount ,
    }
    this.setState({'orderAmount' : (this.state.subscriptionMode.days*this.state.quantity*this.state.selectedProduct.price)-((this.state.subscriptionMode.days*this.state.quantity*this.state.selectedProduct.price *this.state.subscriptionMode.discountRate)/100)})
  }

  static navigationOptions = ({ navigation }) => {
      return {
      title: "Order Payment"
    }
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <View style={{marginLeft:"5%"}}>
            <View style={{marginBottom:'6%', marginTop:'2%'}}>
                <Text style={{fontSize:20, fontFamily: 'sans-serif',color:"black"}}>Your ordering {this.state.selectedProduct.title} with an subscription of {this.state.subscriptionMode.subscriptionText}</Text>
            </View>
            <View>
                <Text style={{fontSize:18, fontFamily: 'sans-serif',color:"black"}}>You will have to make an payment of  <Text style={{fontWeight:"bold"}}>{'\u20B9'}{this.state.orderAmount}</Text>  before your first delivery</Text>
            </View>
            <View style={{paddingVertical:'2%',borderBottomWidth:0.6, marginTop:"5%", marginRight:"10%"}}>
              <View style={{}}>
                  <Text style={{fontSize:22, fontFamily: 'sans-serif',color:"black", fontWeight:"bold"}}>Payment Mode</Text>
              </View>
            </View>
            <View>
              <View>
                <TouchableOpacity style={{paddingBottom:10,marginBottom:'3%', marginTop:'7%', borderBottomWidth:0.2,flex: 1,flexDirection: 'row', marginRight:'5%'}}
                 onPress={x => Toast.show('Coming soon to milk man')} >
                <Image
                  source={{uri:"https://www.searchpng.com/wp-content/uploads/2018/11/phone-pe-1024x1024.png"}} 
                  style={{width: 50, height: 50, marginLeft:'5%'}} resizeMode="stretch"/>
                  <Text style={{fontSize:22, fontFamily: 'sans-serif',color:"black", fontWeight:"bold", marginLeft:50,marginTop:12}}>Phone Pe</Text>
                  <Text style={{fontSize:12, fontFamily: 'sans-serif',color:"black", fontWeight:"bold",marginLeft:70,marginTop:20, color:'red'}} >Coming Soon</Text>
                </TouchableOpacity>
              </View> 
              <View>
                <TouchableOpacity style={{paddingBottom:10,marginBottom:'4%', marginTop:'1%', borderBottomWidth:0.2,flex: 1,flexDirection: 'row', marginRight:'5%'}}
                onPress={x => Toast.show('Coming soon to milk man')}>
                <Image
                  source={{uri:"https://www.searchpng.com/wp-content/uploads/2019/02/Paytm-Logo-With-White-Border-PNG-image-1024x325.png"}} 
                  style={{width: 70, height: 50, marginLeft:'5%'}} resizeMode="stretch"/>
                  <Text style={{fontSize:22, fontFamily: 'sans-serif',color:"black", fontWeight:"bold", marginLeft:34,marginTop:12}}>Paytm</Text>
                  <Text style={{fontSize:12, fontFamily: 'sans-serif',color:"black", fontWeight:"bold",marginLeft:100,marginTop:20, color:'red'}} >Coming Soon</Text>
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity style={{paddingBottom:10,marginBottom:'4%', marginTop:'1%', borderBottomWidth:0.2,flex: 1,flexDirection: 'row', marginRight:'5%'}}>
                <Image
                  source={{uri:"https://www.flaticon.com/premium-icon/icons/svg/2182/2182526.svg"}} 
                  style={{width: 60, height: 60, marginLeft:'5%'}} resizeMode="stretch"/>
                  <Text style={{fontSize:22, fontFamily: 'sans-serif',color:"black", fontWeight:"bold", marginLeft:48,marginTop:12}}>Cash On Delivery</Text>
                  <Text style={{fontSize:12, fontFamily: 'sans-serif',color:"black", fontWeight:"bold",marginLeft:70,marginTop:20, color:'red'}} ></Text>
                </TouchableOpacity>
              </View>
               
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentScreen)
