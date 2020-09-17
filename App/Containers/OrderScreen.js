import React, { Component } from 'react'
import { ScrollView, Text, View,FlatList } from 'react-native'
import {Card,Image,CheckBox,Button } from 'react-native-elements';
import { connect } from 'react-redux'
import NumericInput from 'react-native-numeric-input'
import styles from './Styles/OrderScreenStyle'
import {getOrders,addOrder} from '../Services/FirebaseService'
import {retrieveData} from '../Services/AsyncStorageService'

class OrderScreen extends Component {

  constructor(props){
    super(props)

    this.state = {
      subscriptionMode:[
        {
          days:365,
          discountRate:20,
          subscriptionType:"yearly",
          subscriptionText:"Yearly (365 Days)",
          isSelected:true
        },
        {
          days:30,
          discountRate:15,
          subscriptionType:"monthly",
          subscriptionText:"Monthly (30 Days)",
          isSelected:false
        },
        {
          days:"07",
          discountRate:10,
          subscriptionType:"weekly",
          subscriptionText:"Weekly (7 Days)",
          isSelected:false
        },
        {
          days:"01",
          discountRate:5,
          subscriptionType:"singleOrder",
          subscriptionText:"Single Order",
          isSelected:false
        },
        
      ],
      selectedsubscriptionMode:{
        days:365,
        discountRate:20,
        subscriptionType:"yearly",
        subscriptionText:"Yearly (365 Days)",
        isSelected:true
      },
      quantity:1,
      selectedProduct:this.props.navigation.getParam("product")   
    }

    this.selectSubscriptionPlan = this.selectSubscriptionPlan.bind(this);

    this.navigateToPaymentScreen = this.navigateToPaymentScreen.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
      return {
      title: "Order Summary"
    }
  }

  async componentDidMount() {
    let user = await retrieveData("user");
    this.setState({user:user});
    this.props.navigation.setParams({
     totalCount: 0
   });
 }

  selectSubscriptionPlan(subscriptionType){
    var subscriptionMode = this.state.subscriptionMode;
      for(var i=0 ; i < subscriptionMode.length ; i++){
          if(subscriptionMode[i].subscriptionType == subscriptionType){
              subscriptionMode[i].isSelected = true
              this.setState({selectedsubscriptionMode:subscriptionMode[i]});
          }else{
            subscriptionMode[i].isSelected = false
          }
      }
      this.setState({subscriptionMode:subscriptionMode});
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

  navigateToPaymentScreen(){
    var selectedSubscriptionMode;
    for(let subscriptionMode of this.state.subscriptionMode){
          if(subscriptionMode.isSelected){
            selectedSubscriptionMode = subscriptionMode;
            break;
          }
    }
    this.props.navigation.navigate('PaymentScreen', {selectedProduct:this.state.selectedProduct,quantity:this.state.quantity, subscriptionMode: selectedSubscriptionMode });
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <View style={{borderWidth:2,marginTop:'5%',borderColor:'#eeeeee'}}>
          <View style={{marginLeft:'5%',flex: 1, flexDirection: 'row',marginTop:20}}>
            <View>
              <Image
              source={{uri:this.state.selectedProduct.image}} 
              style={{width: 100, height: 100, marginBottom:10, marginTop:10}} resizeMode="stretch"/>
            </View>
            <View style={{}}>
              <Text 
                style={{fontSize:20, marginLeft:"25%", marginBottom:"2%", fontFamily: 'sans-serif',color:"black" }} >
                {this.state.selectedProduct.title}
              </Text>
              <NumericInput containerStyle={{marginLeft:"25%",marginTop:"5%"}}
              onChange={value => this.setState({quantity:value})} value={this.state.quantity} minValue={1} />
            </View>
          </View>
        </View>
        <View style={{marginTop:'10%',fontFamily: 'sans-serif',color:"black",fontSize:20}}>
          <Text style={{fontFamily: 'sans-serif',marginLeft:"5%",color:"black",fontSize:18, marginBottom:"2%"}}>Subscription Type</Text>
          <View>
            <FlatList
            data={this.state.subscriptionMode}
            renderItem={({item}) => 
            <CheckBox
            id={item.subscriptionType}
            checked={item.isSelected}
            onPress={() => this.selectSubscriptionPlan(item.subscriptionType)}
            title={
            <View>
              <Text style={{fontFamily: 'sans-serif',marginLeft:"5%",paddingTop:12,color:"#424242",fontSize:12}}>{item.subscriptionText}</Text>
              <Text style={{fontFamily: 'sans-serif',marginLeft:"5%",marginTop:5,fontSize:10,color:"#00c853",fontWeight:"bold"}}>{item.discountRate}% Discount On {item.subscriptionText} Subscription </Text>
            </View>
            }
            containerStyle={{borderWidth:0,margin:0}}
          />}
          contentContainerStyle={{ marginBottom: 10}}
          />
          </View>
        </View>
        <View style={{marginTop:'5%',fontFamily: 'sans-serif',color:"black",fontSize:20,borderBottomWidth:2, paddingBottom:10,borderColor:'#eeeeee'}}>
          <Text style={{fontFamily: 'sans-serif',marginLeft:"5%",color:"black",fontSize:18}}>Price Details</Text>
        </View>
        <View style={{marginTop:'5%',flex: 1, flexDirection: 'row'}}>
          <View style={{marginLeft:"5%"}}>
            <Text style={{fontFamily: 'sans-serif',marginLeft:"5%",color:"#424242",fontSize:16}}>Price</Text>
          </View>
          <View style={{marginLeft:"40%"}}>
            <Text style={{fontFamily: 'sans-serif',marginLeft:"5%",color:"#424242",fontSize:16}}>{'\u20B9'} {this.state.selectedProduct.price}</Text>
          </View>
        </View>

        <View style={{marginTop:'5%',flex: 1, flexDirection: 'row'}}>
          <View style={{marginLeft:"5%"}}>
            <Text style={{fontFamily: 'sans-serif',marginLeft:"5%",color:"#424242",fontSize:16}}>Quantity</Text>
          </View>
          <View style={{marginLeft:"40%"}}>
          <Text style={{fontFamily: 'sans-serif',marginLeft:"1%",color:"#424242",fontSize:16}}>{this.state.quantity}</Text>
          </View>
        </View>

        <View style={{marginTop:'5%',flex: 1, flexDirection: 'row'}}>
          <View style={{marginLeft:"5%"}}>
            <Text style={{fontFamily: 'sans-serif',marginLeft:"4%",color:"#424242",fontSize:16}}>Subscription {"\n"} Days</Text>
          </View>
          <View style={{marginLeft:"27%"}}>
          <Text style={{fontFamily: 'sans-serif',marginLeft:"5%",color:"#424242",fontSize:16}}>{this.state.selectedsubscriptionMode.days}</Text>
          </View>
        </View>

        <View style={{marginTop:'5%',flex: 1, flexDirection: 'row'}}>
          <View style={{marginLeft:"5%"}}>
            <Text style={{fontFamily: 'sans-serif',marginLeft:"4%",color:"#424242",fontSize:16}}>Subscription {"\n"} Discount</Text>
          </View>
          <View style={{marginLeft:"27%"}}>
          <Text style={{fontFamily: 'sans-serif',marginLeft:"5%",color:"#424242",fontSize:16}}>{this.state.selectedsubscriptionMode.discountRate}%</Text>
          </View>
        </View>

        <View style={{marginTop:'5%',marginBottom:"10%",flex: 1, flexDirection: 'row' ,borderTopWidth:2,borderColor:'#eeeeee'}}>
          <View style={{marginLeft:"5%",marginTop:'3%'}}>
            <Text style={{fontFamily: 'sans-serif',marginLeft:"4%",color:"#424242",fontSize:16}}>Final Price</Text>
          </View>
          <View style={{marginLeft:"27%",marginTop:'3%'}}>
          <Text style={{fontFamily: 'sans-serif',marginLeft:"5%",color:"#424242",fontSize:16}}>{'\u20B9'} 
          {(this.state.selectedsubscriptionMode.days*this.state.quantity*this.state.selectedProduct.price)-((this.state.selectedsubscriptionMode.days*this.state.quantity*this.state.selectedProduct.price *this.state.selectedsubscriptionMode.discountRate)/100)}</Text>
          </View>
        </View>

        <Button
              icon={{
                name: 'arrow-right',
                type: 'font-awesome',
                size: 15,
                color: 'white',
              }}
              buttonStyle={{
                marginBottom:30,
                borderRadius:15,
                width:'80%',
                marginLeft:'10%',
                height:60,
                backgroundColor:'#F44336'
              }}
              onPress={() => this.navigateToPaymentScreen()}
              title="Confirm Order"
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen)
