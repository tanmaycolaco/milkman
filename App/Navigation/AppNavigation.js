import { createAppContainer } from 'react-navigation'
import MainScreen from '../Containers/MainScreen'
import ProductScreen from '../Containers/ProductScreen'
import RegistrationScreen from '../Containers/RegistrationScreen'
import { createStackNavigator } from 'react-navigation-stack';
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  MainScreen: { screen: MainScreen },
  ProductScreen: { screen: ProductScreen},
  RegistrationScreen: { screen: RegistrationScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'screen',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
