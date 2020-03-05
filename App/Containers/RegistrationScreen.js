import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, TextInput, View, Image } from 'react-native'
import { Button, Icon, Input, Divider } from 'react-native-elements';
import { connect } from 'react-redux'
import { Images } from '../Themes'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/RegistrationScreenStyle'

class RegistrationScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      address: '',

    }
  }
  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <View style={styles.mainContainer}>
      <ScrollView style={styles.container}>
        <View style={styles.login_logo}>
          <Image source={Images.loginlogo} style={styles.logo} />
        </View>
        {/* <View style={styles.section,{marginLeft:"10%",marginBottom:10,marginTop:10}} >
            <Text style={{color:"red",fontSize:19}}>
              Welcome To Milk Man , Please Register
            </Text>
        </View> */}
        <KeyboardAvoidingView behavior='position'>
          <View
            style={styles.register_section}>
            <TextInput
              style={styles.login_register_input}
              placeholder='Username'
              onChangeText={(username) => this.setState({ username: username })}
            />
            <TextInput
              style={styles.login_register_input}
              placeholder='Password'
              secureTextEntry={true}
              onChangeText={(password) => this.setState({ password: password })}
            />

            <TextInput
              style={styles.login_register_input}
              placeholder='Address'
              onChangeText={(address) => this.setState({ address: address })}
              multiline = {true}
              numberOfLines = {50}
            />
          </View>
        </KeyboardAvoidingView>
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
              title="Register"
            />
          </View>
          <Text style={{fontSize:20, marginLeft:'10%',color:"#607D8B"}}>--------------------------OR------------------------</Text>

            <View style={{ marginTop: 50 }}>
              <Button
                buttonStyle={styles.register_button}
                title="Login"
                type="outline"
                onPress={() => this.props.navigation.navigate('LaunchScreen')}
              />
            </View>
      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationScreen)
