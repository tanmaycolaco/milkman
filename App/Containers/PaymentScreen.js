import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View } from 'react-native'
import { connect } from 'react-redux'
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
            <View style={{paddingVertical:'2%',borderBottomWidth:0.5, marginTop:"5%", marginRight:"10%"}}>
              <View style={{}}>
                  <Text style={{fontSize:20, fontFamily: 'sans-serif',color:"black", fontWeight:"bold"}}>Payment Mode</Text>
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
