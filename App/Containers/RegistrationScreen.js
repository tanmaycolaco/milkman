import React, { Component} from 'react'
import { ScrollView, Text, KeyboardAvoidingView,TextInput } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/RegistrationScreenStyle'

class RegistrationScreen extends Component {

  constructor(props){
    super(props)

    this.state = {
      username: '',
      password: '',
    }
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
        <TextInput
                style={styles.login_register_input}
                placeholder='Username'
                onChangeText={(username) => this.setState({username:username})}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationScreen)
