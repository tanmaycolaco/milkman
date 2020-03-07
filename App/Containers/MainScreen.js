import React, { Component } from 'react'
import { ScrollView, Text, TouchableOpacity } from 'react-native'
import { Button, Icon,Card,Image } from 'react-native-elements';
import { connect } from 'react-redux'
import { Images } from '../Themes'
import MenuCard from '../Components/MenuCard'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/MainScreenStyle'

class MainScreen extends Component {

  static navigationOptions = {
    title: 'Home',
    headerLeft: null
}

  render () {
    return (
      <ScrollView style={styles.container}>
         <Text style={{fontSize:25, marginLeft:"5%", marginBottom:"5%", fontFamily: 'sans-serif-medium', fontWeight: '500' }}>
           Welcome Paarth 
         </Text>     
         <MenuCard 
         title={"Order"} 
         subtext={"Lorem ipsum dolor sit amet, consectetur adipiscing elit"}
         imageUrl={"https://image.flaticon.com/icons/png/512/135/135763.png"}
         navigateScreen={"ProductScreen"}
         navigationObject ={this.props.navigation}
         />

        <MenuCard 
         title={"Active Orders"} 
         subtext={"Lorem ipsum dolor sit amet, consectetur adipiscing elit"}
         imageUrl={"https://img.icons8.com/cute-clipart/64/000000/purchase-order.png"}
         navigateScreen={"ProductScreen"}
         navigationObject ={this.props.navigation}
         />

        <MenuCard 
         title={"Order History"} 
         subtext={"Lorem ipsum dolor sit amet, consectetur adipiscing elit"}
         imageUrl={"https://www.seekpng.com/png/full/508-5089668_order-history-icon-export-csv-blue-icon.png"}
         navigateScreen={"ProductScreen"}
         navigationObject ={this.props.navigation}
         />
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

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
