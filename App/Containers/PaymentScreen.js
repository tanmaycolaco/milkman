import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View,FlatList,TouchableOpacity  } from 'react-native'
import {Card,Image,CheckBox,Button,Overlay } from 'react-native-elements';
import { connect } from 'react-redux'
import Toast from 'react-native-simple-toast';
import {getOrders,addOrder} from '../Services/FirebaseService'
import {retrieveData} from '../Services/AsyncStorageService'
import UUIDGenerator from 'react-native-uuid-generator';
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
      overlayVisible : false,
      subscriptionStartDate:"",
      subscriptionEndDate:"",
      orderId:""
    }
    this.setState({'orderAmount' : (this.state.subscriptionMode.days*this.state.quantity*this.state.selectedProduct.price)-((this.state.subscriptionMode.days*this.state.quantity*this.state.selectedProduct.price *this.state.subscriptionMode.discountRate)/100)})
    this.orderProduct = this.orderProduct.bind(this);
    this.navigateToProdctScreen = this.navigateToProdctScreen.bind(this);
  }

  async componentDidMount() {
    let user = await retrieveData("user");
    this.setState({user:user});
 }

  static navigationOptions = ({ navigation }) => {
      return {
      title: "Order Payment"
    }
  }

  
  async orderProduct(){
    let orders = await getOrders(this.state.user.username);
    if(orders == null){
      orders = new Array();
    }
    var orderDate = new Date();
    var subscriptionStartDate = new Date(orderDate);
    var subscriptionEndDate = new Date(orderDate);
    subscriptionStartDate.setDate(orderDate.getDate()+1);
    subscriptionEndDate.setDate(orderDate.getDate()+this.state.subscriptionMode.days);
    var orderId =  await UUIDGenerator.getRandomUUID()

    var order = {
      orderId: orderId,
      orderTime:new Date(),
      productId:this.state.selectedProduct.id,
      subscriptionStartDate : subscriptionStartDate.getTime(),
      subscriptionEndDate : subscriptionEndDate.getTime(),
      quantity: this.state.quantity,
      orderAmount : this.state.orderAmount 
    }
    orders.push(order)
    await addOrder(this.state.user.username,orders);
    this.setState({subscriptionStartDate:subscriptionStartDate.toDateString(),subscriptionEndDate:subscriptionEndDate.toDateString(),overlayVisible:true,orderId:orderId })
  }

  navigateToProdctScreen(){
     this.props.navigation.navigate('ProductScreen')
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Overlay isVisible={this.state.overlayVisible} style={{borderRadius:10}}>
            <View style={{marginLeft:"5%", marginTop:"5%"}}>
              <Text style={{fontSize:19, fontFamily: 'sans-serif',color:"black"}}>Congratulations Subscription Started For {this.state.selectedProduct.title} with id {this.state.orderId}</Text>
            </View>
            <View style={{marginLeft:"5%", marginTop:"5%"}}>
                <Text style={{fontSize:19, fontFamily: 'sans-serif',color:"black"}}>Your subscription duration is from  {this.state.subscriptionStartDate} to {this.state.subscriptionEndDate} </Text>
            </View>
            <View style={{marginLeft:"5%", marginTop:"5%", marginBottom: '20%'}}>
                <Text style={{fontSize:19, fontFamily: 'sans-serif',color:"black"}}>Payment for your subscription is <Text style={{fontWeight:"bold"}}>{'\u20B9'}{this.state.orderAmount}</Text> will be collected during your first delivery on {this.state.subscriptionStartDate} </Text>
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
              onPress={() => this.navigateToProdctScreen()}
              title="Back To Product "
            />
          </Overlay>
          <View style={{marginLeft:"5%"}}>
            <View style={{marginBottom:'6%', marginTop:'2%'}}>
                <Text style={{fontSize:19, fontFamily: 'sans-serif',color:"black"}}>Your ordering {this.state.selectedProduct.title} with an subscription of {this.state.subscriptionMode.subscriptionText}</Text>
            </View>
            <View>
                <Text style={{fontSize:19, fontFamily: 'sans-serif',color:"black"}}> Payment for your subscription is <Text style={{fontWeight:"bold"}}>{'\u20B9'}{this.state.orderAmount}</Text></Text>
            </View>
            <View style={{ marginTop:'3%'}}>
                <Text style={{fontSize:14, color:"red"}}>In case of cash on delivery payment should be made while accepting the first delivery</Text>
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
                <TouchableOpacity style={{paddingBottom:10,marginBottom:'4%', marginTop:'1%', borderBottomWidth:0.2,flex: 1,flexDirection: 'row', marginRight:'5%'}}
                onPress={x => this.orderProduct()}>
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
