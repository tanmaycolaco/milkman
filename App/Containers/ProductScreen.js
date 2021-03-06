import React, { Component } from 'react'
import {  View,FlatList,TouchableOpacity } from 'react-native'
import {Overlay,Image, Icon} from 'react-native-elements';
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

    this.navigateToOrderScreen = this.navigateToOrderScreen.bind(this);
    this.navigateToOrderHistoryScreen = this.navigateToOrderHistoryScreen.bind(this);
  }
  
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: "Products",
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('OrderHistoryScreen')}>
          <Icon
            name='history'
            type='font-awesome'
            size={25}
            color='#517fa4'
            iconStyle={{marginRight:15}}/>
        </TouchableOpacity>
      )
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

  navigateToOrderScreen(product){
    this.props.navigation.navigate('OrderScreen', {product:product})
  }

  navigateToOrderHistoryScreen(){
    this.props.navigation.navigate('OrderHistoryScreen')
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.products}
          renderItem={({item}) => <ProductCard onPressFunction={this.navigateToOrderScreen} product={item} title={item.title} imageUrl={item.image} price={item.price} text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lacinia urna semper arcu convallis"}/>}
        />
      </View>
    )
  }
}

export default connect()(ProductScreen)
