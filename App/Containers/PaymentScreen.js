import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/PaymentScreenStyle'

class PaymentScreen extends Component {

  constructor(props){
    super(props)
    this.state ={
      selectedProduct: this.props.navigation.getParam("selectedProduct") ,
      quantity: this.props.navigation.getParam("quantity"),
      subscriptionMode : this.props.navigation.getParam("subscriptionMode")
    }
  }
  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Text>{(this.state.subscriptionMode.days*this.state.quantity*this.state.selectedProduct.price)-((this.state.subscriptionMode.days*this.state.quantity*this.state.selectedProduct.price *this.state.subscriptionMode.discountRate)/100)}</Text>
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
