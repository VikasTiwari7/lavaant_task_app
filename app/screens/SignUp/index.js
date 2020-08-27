import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView, ImageBackground, Image, TouchableOpacity, Alert, } from 'react-native';
import KeyboardView from '../../screens/KeyboardView';
import TermAndPolicies from '../../screens/TermAndPolicies';
import styles from './style';
import * as Utility from '../../utility/index';
import * as Url from '../../constants/urls'
import * as Service from '../../api/services'
import Loader from '../../Components/Loader'
import { TextInputMask } from 'react-native-masked-text'
import { CheckBox } from 'native-base';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      mobile: '',
      email: '',
      password: '',
      confirmPassword: '',
      isPolicyModal: false,
      isChecked: false,
      isLoading: false,
      role: 'vendor'
    };
  }

  showHidePolicyModal = (btn) => {
    if (btn === 'agree') {
      this.setState({ isChecked: true })
    } else {
      this.setState({ isChecked: false })

    }
    this.setState({ isPolicyModal: !this.state.isPolicyModal })
  }

  register = async () => {
    if (Utility.isFieldEmpty(this.state.email && this.state.password && this.state.firstName && this.state.lastName && this.state.confirmPassword)) {
      Alert.alert("", "Please enter all the fields")
    }

    else if (Utility.isValidEmail(this.state.email)) {
      Alert.alert("", "Please Enter Valid Email")

    }
    else if (Utility.isValidComparedPassword(this.state.password, this.state.confirmPassword)) {
      Alert.alert("", "Pasword Mismatch")
      return
    }
    else if (this.state.isChecked === false) {
      Alert.alert("", "Please Accept terms & conditions")
      return
    }
    else {
      this.setState({ isLoading: true })
      let body = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email.toLowerCase(),
        role: 'vendor',
        password: this.state.password,
        mobileNo: this.mobile.getRawValue(),
      }

      let option = {
        "Content-Type": "application/json",
      }
      try {
        const res = await Service.post(Url.REGISTER_USER_URL, '', body, option)
        if (res.data) {
          this.setState({ isLoading: false })
          this.props.navigation.navigate('SignIn')
        }
        else {
          Alert.alert('', 'Somthing went Wrong')
        }
      } catch (err) {
        this.setState({ isLoading: false })
        Alert.alert('', err.message)
      }
    }


  }

  render() {
    return (
      <KeyboardView behavior="padding" style={styles.wrapper}>
        <ImageBackground
          source={require('../../assets/background.png')}
          style={styles.backgroundImage}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            ref={ref => (this.scrollView = ref)}
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
                  source={require('../../assets/loginR/user.png')}
                  style={styles.icon}
                />
                <View style={[styles.txtInputView]}>
                  <TextInput
                    require
                    allowFontScaling={false}
                    placeholder="Firstname"
                    placeholderTextColor='#fff'
                    onChangeText={(firstName) => this.setState({ firstName })}
                    style={styles.txtInput}
                  />
                </View>
                <View style={[styles.txtInputView, {
                  marginLeft: '5%'
                }]}>
                  <TextInput
                    require
                    placeholder="Lastname"
                    allowFontScaling={false}
                    placeholderTextColor="#fff"
                    onChangeText={(lastName) => this.setState({ lastName })}
                    style={styles.txtInput}
                  />
                </View>
              </View>

              <View style={styles.SectionStyle}>
                <Image
                  source={require('../../assets/loginR/phone.png')}
                  style={styles.icon}
                />
                <View style={styles.txtInputView}>
                  <TextInputMask
                    require
                    ref={(ref) => this.mobile = ref}
                    allowFontScaling={false} require
                    placeholder="Mobile"
                    placeholderTextColor="#fff"
                    type={'custom'}
                    options={{
                      mask: '9999999999'
                    }}
                    keyboardType='numeric'
                    onChangeText={
                      (mobile) => {
                        this.setState({ mobile })

                      }
                    }
                    value={this.state.mobile}
                    style={styles.txtInput}
                  />
                </View>

              </View>

              <View style={styles.SectionStyle}>
                <Image
                  source={require('../../assets/loginR/e-mail.png')}
                  style={styles.icon}
                />
                <View style={styles.txtInputView}>
                  <TextInput
                    require
                    allowFontScaling={false}
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
                <View style={styles.txtInputView}>
                  <TextInput
                    require
                    allowFontScaling={false}
                    placeholder="Password"
                    placeholderTextColor="#fff"
                    secureTextEntry={true}
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
                <View style={styles.txtInputView}>
                  <TextInput
                    require
                    placeholder="Confirm Password"
                    allowFontScaling={false}
                    placeholderTextColor="#fff"
                    secureTextEntry={true}
                    onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                    style={styles.txtInput}
                  />
                </View>
              </View>

              <View style={styles.tncView}>
                <View style={styles.modalSubView}>
                  <View style={styles.checkBoxView}>
                    <CheckBox
                      onPress={() => this.setState({ isChecked: !this.state.isChecked })}
                      checked={this.state.isChecked}
                      style={{ borderColor: '#fff' }}
                    />
                  </View>
                  <View>
                    <TouchableOpacity activeOpacity={1}
                      onPress={() => this.showHidePolicyModal()}>
                      <Text
                        allowFontScaling={false}
                        style={[styles.linkedText]}>
                        Terms and condition
                  </Text>
                      <TermAndPolicies
                        isPolicyModal={this.state.isPolicyModal}
                        showHidePolicyModal={this.showHidePolicyModal}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View>
                <TouchableOpacity style={[styles.LoginBtn, styles.AJ]} onPress={() => {
                  this.register()
                }}>
                  <Text
                    allowFontScaling={false}
                    style={styles.LoginBtnTxt}>REGISTER</Text>
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
                <TouchableOpacity style={[styles.LoginBtn2, styles.AJ]}>
                  <Text
                    allowFontScaling={false}
                    style={styles.LoginBtnTxt2}>Login with Facebook</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.bottomView}>
              <View style={styles.linkView}>
                <Text
                  allowFontScaling={false}
                  style={styles.linkedAccText}>
                  Already have an Account?
            </Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.replace('SignIn')}>
                  <Text
                    allowFontScaling={false}
                    style={styles.linkedText}>
                    {' '}
                    Login{' '}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </KeyboardView>
    );
  }
}
