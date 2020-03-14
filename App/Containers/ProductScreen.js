import React, { Component } from 'react'
import {  View,FlatList } from 'react-native'
import {Overlay } from 'react-native-elements';
import { connect } from 'react-redux'
import {retrieveData} from '../Services/AsyncStorageService'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ProductScreenStyle'
import ProductCard from '../Components/ProductCard'
import {getProductData,getOrders,addOrder} from '../Services/FirebaseService'

class ProductScreen extends Component {

  constructor(props){
    super(props)

    this.state = {
      products: [],
      user:''
    }

    this.orderProduct = this.orderProduct.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
    title: "Products"
  }
  }

  async componentDidMount() {
     let products = await getProductData();
     let user = await retrieveData("user");
     this.setState({products:products,user:user});
     this.props.navigation.setParams({
      totalCount: 0
    });
  }

  async orderProduct(product){
    let orders = await getOrders(this.state.user.username);
    console.log(orders);
    if(orders == null){
      orders = new Array();
    }
    orders.push({orderTime:new Date(),productId:product.id})
    await addOrder(this.state.user.username,orders);
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.products}
          renderItem={({item}) => <ProductCard onPressFunction={this.orderProduct} product={item} title={item.title} imageUrl={item.image} price={item.price} text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lacinia urna semper arcu convallis"}/>}
        />
      </View>
    )
  }
}

export default connect()(ProductScreen)
