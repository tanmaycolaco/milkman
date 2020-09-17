import React, { Component } from 'react'
import { View,FlatList } from 'react-native'
const  _ = require('lodash');
import { connect } from 'react-redux'
import OrderHistoryCard from '../Components/OrderHistoryCard'
import {getOrders,addOrder,getProductData} from '../Services/FirebaseService'
import {retrieveData} from '../Services/AsyncStorageService'
// Styles
import styles from './Styles/ProductScreenStyle'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
// import styles from './Styles/OrderHistoryScreenStyle'


class OrderHistoryScreen extends Component {
   constructor(props){
    super(props)
    this.state = {
      products: [],
      user:'',
      orderHistorys:[]
    }

    this.cancelOrder = this.cancelOrder.bind(this);
  }

  async componentDidMount() {
    let products = await getProductData();
    let user = await retrieveData("user");
    let orders = await getOrders(user.username);
    let orderHistorys = [];
    for(let orderIndex in orders){
        var order =orders[orderIndex];
        var orderHistory  = {}; 
        var product = _.find(products, {"id":order.productId})
        orderHistory['title'] = product.title;
        orderHistory['imageUrl'] = product.image;
        orderHistory['startDate'] = order.subscriptionStartDate;
        orderHistory['endDate'] = order.subscriptionEndDate;
        orderHistory['isActive'] = order.isActive;
        orderHistory['orderId'] = order.orderId;
        orderHistorys.push(orderHistory);
    }
    this.setState({products:products,user:user,orderHistorys:orderHistorys});
 }
 
  async cancelOrder(id){
    var order =  _.find(this.state.orderHistorys, {orderId:id});
    order.isActive = false;
    await addOrder(this.state.user.username,this.state.orderHistorys);
  }


  render () {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.orderHistorys}
          renderItem={({item}) => <OrderHistoryCard onPressFunction={this.cancelOrder} product={item} title={item.title} imageUrl={item.imageUrl} 
              startDate = {item.startDate} endDate = {item.endDate} orderId = {item.orderId} isActive ={item.isActive}
          />}
        />
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistoryScreen)
