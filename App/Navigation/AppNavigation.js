import { createAppContainer } from 'react-navigation'
import OrderHistoryScreen from '../Containers/OrderHistoryScreen'
import PaymentScreen from '../Containers/PaymentScreen'
import OrderScreen from '../Containers/OrderScreen'
import MainScreen from '../Containers/MainScreen'
import ProductScreen from '../Containers/ProductScreen'
import RegistrationScreen from '../Containers/RegistrationScreen'
import { createStackNavigator } from 'react-navigation-stack';
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  OrderHistoryScreen: { screen: OrderHistoryScreen },
  PaymentScreen: { screen: PaymentScreen },
  OrderScreen: { screen: OrderScreen },
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
