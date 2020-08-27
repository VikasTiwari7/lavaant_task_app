import React, { Component } from 'react';
import { View, Text, TextInput, ImageBackground, Image, TouchableOpacity, ScrollView, Alert, BackHandler } from 'react-native';
import KeyboardView from '../../screens/KeyboardView';
import styles from './style';
import * as Utility from '../../utility/index';
import * as pushNotifications from '../../utility/pushNotification';
import * as Url from '../../constants/urls'
import * as Service from '../../api/services'
import Loader from '../../Components/Loader'
import { NavigationActions, StackActions } from 'react-navigation';
import HandleBack from "../../Components/HandleBack";
// import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { LoginManager } from 'react-native-fbsdk'
import { LoginButton,AccessToken,GraphRequest,GraphRequestManager} from 'react-native-fbsdk';
export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmpassword: '',
      isLoading: false,
      

    };
    this.logout()
  }

  login = async () => {
    let email = this.state.email.trim()
    if (Utility.isFieldEmpty(this.state.email && this.state.password && this.state.confirmpassword)) {
      Alert.alert("", "Please enter all the fields")
    }
    else if (Utility.isValidEmail(email)) {
      Alert.alert("", "Please Enter Valid Email")
    }
    else if (this.state.password !== this.state.confirmpassword) {
      Alert.alert("Password mismatch")
      console.log("passMissMatch")
    }

    else {
     
      let body = {
        email: email.toLowerCase(),
        password: this.state.password,
        app: "task"
      }

      console.log("body", body)
      this.setState({
        isLoading: true
      })
      try {
        const res = await Service.post(Url.LOGIN_URL, '', body)
        console.log('data', res)
        if (res.data) {
          console.log('login::data', res.data)
          this.setState({
            isLoading: false
          })
          global.user = res.data;
          await Utility.setInLocalStorge('user', JSON.stringify(global.user))
          Utility.setInLocalStorge('token', res.data.token)
          Utility.setInLocalStorge('userId', res.data.id)
          Utility.setInLocalStorge('role', res.data.role)
          await pushNotifications.pushNotification()
          if (res.data.role.toLowerCase() == 'vendor') {
            this.props.navigation.dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'SignIn' })]
              })
            );
            this.props.navigation.navigate('BottomTab2');
          }
          else {
            Alert.alert('', 'Please create new account with diffrent email first')
          }
        }
        else {
          Alert.alert('', res.err.message)
          console.log('err-res', res)
          this.setState({
            isLoading: false
          })
        }

      } catch (err) {
        this.setState({
          isLoading: false
        })
        Alert.alert('', err.message)
        console.log('err', err)
      }
    }
  };

  onBack = () => {
    BackHandler.exitApp()
    return true;
  }
 

 handleFacebookLogin =()=> {
  LoginManager.logInWithPermissions(['public_profile', 'email']).then((result) => {
    if (result.isCancelled) {
      console.log('Login cancelled');
    } else {
      
      AccessToken.getCurrentAccessToken()
      .then((user) => {
          // alert("Facebook accessToken:\n" + user.accessToken + "\n\naccessTokenSource: " + user.accessTokenSource + "\n\nuserID: " + user.userID)
          console.log(user);
          return user
      })
      .then((user) => {
          const responseInfoCallback = async(error, result) => {
            console.log("result",error)
              if (error) {
                  console.log("errrrreeeee",error)
                  alert('Error fetching data: ' + error.toString());
              } else {
                  console.log("user details",result)
                 
                 
                  this.setUserData(result)
              }
          }



          const infoRequest = new GraphRequest('/me', {
              accessToken: user.accessToken,
              parameters: {
                  fields: {
                      string: 'email,name,first_name,last_name'
                  }
              }
          }, responseInfoCallback);

          // Start the graph request.
          new GraphRequestManager()
              .addRequest(infoRequest)
              .start()
      })
    }
  }
  )}
  setUserData=async(result)=>{
    console.log("gotohome",result.email)
    
    let body={
      facebookId:result.id,
      firstName:result.first_name,
      lastName:result.last_name,
      email:result.email||"",

    }
    console.log("body",body)
    this.setState({
      isLoading: true
    })
    const res = await Service.post(Url.FACEBOOK_LOGIN, '', body)
    console.log("response",res)
    this.setState({
      isLoading: false
    })
    global.user = res.data;
    await Utility.setInLocalStorge('user', JSON.stringify(global.user))
    Utility.setInLocalStorge('token', res.data.token)
    Utility.setInLocalStorge('userId', res.data.id)
    Utility.setInLocalStorge('role', res.data.role)
    if(res.data.role=="vendor"){
   this.goToHome()
    }
    else{
      Alert.alert('', 'Please create new account with diffrent email first')
    }
  }
  goToHome=()=>{
    this.props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'SignIn' })]
      })
    );
    this.props.navigation.navigate('BottomTab2');
  }
  logout=()=> {
   console.log("logout")
    LoginManager.logOut();
  }
  render() {
    return (
      <HandleBack onBack={this.onBack}>
        <KeyboardView behavior="padding" style={styles.wrapper}>
          <ImageBackground
            source={require('../../assets/background.png')}
            style={styles.backgroundImage}>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              ref={ref => (this.scrollView = ref)}
              onContentSizeChange={(contentWidth, contentHeight) => {
                this.scrollView.scrollToEnd({ animated: true });
              }}
            >
              <View style={styles.logoContainer}>
                <Image
                  source={require('../../assets/logo.png')}
                  style={styles.logo}
                />
              </View>
              <View style={styles.formView}>
                <Loader isLoading={this.state.isLoading} />
                <View style={styles.SectionStyle}>
                  <Image
                    source={require('../../assets/loginR/e-mail.png')}
                    style={styles.icon}
                  />
                  <View style={styles.textInputView}>
                    <TextInput
                      allowFontScaling={false}
                      require
                      placeholder="E-mail id"
                      placeholderTextColor="#fff"
                      onChangeText={(email) => this.setState({ email })}
                      style={styles.txtInput}
                    />
                  </View>

                </View>
                <View style={styles.SectionStyle}>
                  <Image
                    source={require('../../assets/loginR/password.png')}
                    style={styles.icon}
                  />
                  <View style={styles.textInputView}>
                    <TextInput
                      require
                      allowFontScaling={false}
                      placeholder="Password"
                      secureTextEntry={true}
                      placeholderTextColor="#fff"
                      onChangeText={(password) => this.setState({ password })}
                      style={styles.txtInput}
                    />
                  </View>
                </View>
                <View style={styles.SectionStyle}>
                  <Image
                    source={require('../../assets/loginR/password.png')}
                    style={styles.icon}
                  />
                  <View style={styles.textInputView}>
                    <TextInput
                      require
                      allowFontScaling={false}
                      placeholder="Confirm Password"
                      secureTextEntry={true}
                      placeholderTextColor="#fff"
                      onChangeText={(confirmpassword) => this.setState({ confirmpassword })}
                      style={styles.txtInput}
                    />
                  </View>
                </View>
                <View>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPassword')}>
                    <Text allowFontScaling={false}
                      style={styles.forgotPasswordText}>
                      Forgot password?
                    </Text>
                  </TouchableOpacity>
                </View>
                <View >
                  <TouchableOpacity
                    style={[styles.LoginBtn, styles.AJ]}
                    onPress={() => this.login()}>
                    <Text
                      allowFontScaling={false}
                      style={styles.LoginBtnTxt}>LOGIN</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <Text
                    allowFontScaling={false}
                    style={styles.orTxt}>
                    OR
              </Text>
                </View>
                <View>
                  <TouchableOpacity style={[styles.FbBtn, styles.AJ]} onPress={this.handleFacebookLogin}>
                    <Text
                      allowFontScaling={false}
                      style={styles.LoginBtnTxt2}>Login with facebook</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </ImageBackground>
        </KeyboardView >
      </HandleBack>
    );
  }

}

