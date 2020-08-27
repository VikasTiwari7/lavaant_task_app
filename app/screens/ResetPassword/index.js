import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    ImageBackground,
    Image,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import KeyboardView from '../../screens/KeyboardView';
import styles from './style';
import * as Utility from '../../utility/index';
import * as Url from '../../constants/urls'
import * as Service from '../../api/services'
import Loader from '../../Components/Loader'

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPassword: '',
            confirmPassword: '',
            isLoading: false
        };
    }
    resetPassword = async () => {
        this.setState({
            isLoading: true
        })
        if (Utility.isFieldEmpty(this.state.newPassword && this.state.confirmPassword)) {
            Alert.alert("", "Both fields are mandatory")
        }
        else if (Utility.isValidComparedPassword(this.state.newPassword, this.state.confirmPassword)) {
            Alert.alert("Password and confirm pasword doesnot match!!")
            return
        } else {
            let otpVerifyToken = await Utility.getFromLocalStorge('otpVerifyToken');
            let body = {
                newPassword: this.state.newPassword,
                otpVerifyToken: otpVerifyToken,
            }

            try {
                const res = await Service.put(Url.FORGOTPASSWORD_URL, null, body)
                this.setState({
                    isLoading: false
                })
                console.log('resetPassword::RES', res);

                if (res.isSuccess == true) {
                    this.props.navigation.navigate('SignIn')
                }
                else {
                    Alert.alert('Error', res.message)
                }
            }
            catch (err) {
                this.setState({
                    isLoading: false
                })
                Alert.alert("Something went wrong")
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
                            <View style={styles.mainView}>
                                <Text style={styles.resetPasswordHeading}>Set new password</Text>
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
                                        placeholder="Enter new password"
                                        secureTextEntry={true}
                                        placeholderTextColor="#fff"
                                        onChangeText={(newPassword) => this.setState({ newPassword })}
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
                                        placeholder="Confirm new password"
                                        secureTextEntry={true}
                                        placeholderTextColor="#fff"
                                        onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                                        style={styles.txtInput}
                                    />
                                </View>
                            </View>

                            <View >
                                <TouchableOpacity
                                    style={[styles.LoginBtn, styles.AJ]}
                                    onPress={() => this.resetPassword()}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.LoginBtnTxt}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                            <View >
                                <TouchableOpacity
                                    style={[styles.LoginBtn, styles.AJ]}
                                    onPress={() => this.props.navigation.navigate('SignIn')}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.LoginBtnTxt}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>



                    </ScrollView>
                </ImageBackground>
            </KeyboardView >
        );
    }

}

