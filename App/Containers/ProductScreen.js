import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, Image,TouchableOpacity,FlatList } from 'react-native'
import { Button, Icon, Card } from 'react-native-elements';
import { connect } from 'react-redux'
import { Images } from '../Themes'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ProductScreenStyle'
import ProductCard from '../Components/ProductCard'
import {getProductData} from '../Services/FirebaseService'

class ProductScreen extends Component {

  constructor(props){
    super(props)

    this.state = {
      products: [],
    }
  }

  static navigationOptions = {
    title: "Products",
    headerRight: (
      <TouchableOpacity onPress={() => action()}>
        <Icon
          name='shopping-cart'
          type='font-awesome'
          size={35}
          iconStyle={{marginRight:15}}/>
      </TouchableOpacity>
    )
  }

  async componentDidMount() {
     let products = await getProductData();
     this.setState({products:products});
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.products}
          renderItem={({item}) => <ProductCard title={item.title} imageUrl={item.image} price={item.price} text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lacinia urna semper arcu convallis"}/>}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductScreen)
