import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  login_register_input:{
    height: 50,
    borderColor: 'gray',
    borderWidth: 1 ,
    borderRadius:10,
    paddingLeft:20,
    marginBottom:20
  },
  register_section:{
    marginBottom:'2%',
    width:'80%',
    marginLeft:'10%',
    marginTop:'10%'
  },
  login_logo:{
    alignItems: 'center',
    marginTop:'10%'
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  login_registraion_button_section: {
    marginTop :20
  },
  login_button:{
    marginBottom:30,
    borderRadius:15,
    width:'80%',
    marginLeft:'10%',
    height:60,
    backgroundColor:'#F44336'
  },
  register_button:{
    borderRadius:15,
    width:'80%',
    marginLeft:'10%',
    height:60,
    borderColor: '#F44336',
    borderWidth: 1
  }
})