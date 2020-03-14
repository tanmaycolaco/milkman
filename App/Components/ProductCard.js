import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import { Button, Icon,Card } from 'react-native-elements';
import styles from './Styles/ProductCardStyle'

export default class ProductCard extends Component {
  // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  
  // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }
  render() {
    return (
      <Card
        title={this.props.title}
        image={{uri:this.props.imageUrl}}>
        <Text style={{ marginBottom: 10 }}>
            {this.props.text}
        </Text>
        <Button
          icon={<Icon name='add' color='#ffffff' />}
          buttonStyle={{ borderRadius:5, marginLeft: 0, marginRight:5, marginBottom: 0}}
          title={'Add '+ this.props.price}
          onPress={() => this.props.onPressFunction(this.props.product)}/>
      </Card>
    )
  }
}
