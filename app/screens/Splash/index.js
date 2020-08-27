import React, { Component } from 'react';
import { View, Image, ImageBackground } from 'react-native';
import styles from './style';
import * as Utility from "../../utility/index"
import { NavigationActions, StackActions } from 'react-navigation';
export default class Splash extends Component {
  componentDidMount() {
    this.timeoutHandle = setTimeout(() => {
      this.retrieveData();
    }, 2000);
  }

  retrieveData = async () => {
    try {
      var token = await Utility.getFromLocalStorge('token');
      console.log('Splash::token', token)
      this.setState({
        isLoading: false
      })
      if (token !== null) {
        var role = await Utility.getFromLocalStorge('role');
        var user = await Utility.getFromLocalStorge('user');
        global.user = JSON.parse(user)
        if (role == 'vendor') {
          this.props.navigation.dispatch(
            StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: 'SignIn' })]
            })
          );
          this.props.navigation.navigate('BottomTab2');
        } else if (role == 'customer' && (global.user.customerGroup === '' || global.user.customerGroup === null || global.user.customerGroup === undefined)) {
          this.props.navigation.navigate('MyProfile')
        }
        else {
          this.props.navigation.dispatch(
            StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: 'SignIn' })]
            })
          );
          this.props.navigation.navigate('BottomTab');
        }
      }
      else {
        this.props.navigation.navigate('SignIn')
      }
    } catch (error) {
      console.log(error)
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }
  componentWillUnmount() {
    clearTimeout(this.timeoutHandle);
  }
  render() {
    return (
      <View style={styles.wrapper}>
        <ImageBackground
          source={require('../../assets/splash_screen.png')}
          style={styles.container}
          resizeMode="cover"></ImageBackground>
      </View>
    );
  }
}
