import React, { Component } from 'react'
import { ScrollView, Text, Image, View, KeyboardAvoidingView, TextInput} from 'react-native'
import { Button, Icon, Input, Divider } from 'react-native-elements';
import { Images } from '../Themes'
import { StackNavigator } from 'react-navigation';
import {getUserData} from '../Services/FirebaseService'
import Toast from 'react-native-simple-toast';
import {storeData,retrieveData} from '../Services/AsyncStorageService'

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends Component {

  constructor(props){
    super(props)

    this.state = {
      username: '',
      password: '',
    }
  }

  async componentDidMount() {
    // let user = await retrieveData("user");
    // if(user != null){
    //   Toast.show(JSON.stringify(user));
    //   this.props.navigation.navigate('RegistrationScreen')
    // }
  }
  
  static navigationOptions = {
    header: null
}

  render() {  
    async function loginUser(state,props) {
       if(state.username == null||state.username == '' ){
        Toast.show('Username Cannot Be Blank');
        return;
       }
       if(state.password == null||state.password == '' ){
        Toast.show('Password Cannot Be Blank');
        return;
       }
      let user = await getUserData(state.username)
      if(user != null && state.password == user.password){
        props.navigation.navigate('ProductScreen')
        await storeData('user',user);
        return;
      }
      Toast.show('Incorrect Username or Password');
      return;
      
    }
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.login_logo}>
            <Image source={Images.loginlogo} style={styles.logo} />
          </View>

          <View style={styles.section} >
            <Text style={styles.sectionText}>
              Welcome To Milk Man
            </Text>
          </View>

          <View style={styles.login_section}>
            <KeyboardAvoidingView behavior="position">
              <TextInput
                style={styles.login_register_input}
                placeholder='Username'
                onChangeText={(username) => this.setState({username:username})}
              />
              <TextInput
                style={styles.login_register_input}
                placeholder='Password'
                secureTextEntry={true}
                onChangeText={(password) => this.setState({password:password})}
              />

            </KeyboardAvoidingView>
          </View>

          <View style={styles.login_registraion_button_section}>
            <Button
              icon={{
                name: 'arrow-right',
                type: 'font-awesome',
                size: 15,
                color: 'white',
              }}
              buttonStyle={styles.login_button}
              onPress={() => loginUser(this.state,this.props)}
              title="Login"
            />

            <Text style={{fontSize:20, marginLeft:'10%',color:"#607D8B"}}>--------------------------OR------------------------</Text>

            <View style={{ marginTop: 50 }}>
              <Button
                buttonStyle={styles.register_button}
                title="Register"
                type="outline"
                onPress={() => this.props.navigation.navigate('RegistrationScreen')}
              />
            </View>

          </View>

        </ScrollView>
      </View>
    )
  }
}
