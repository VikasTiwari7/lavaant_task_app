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

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            isLoading: false
        };
    }


    forgotpassword = async () => {
        if (Utility.isFieldEmpty(this.state.email)) {
            Alert.alert("", "Please enter Email")
        }
        else if (Utility.isValidEmail(this.state.email)) {
            Alert.alert("", "Please Enter Valid Email")
        }
        else {
            let body = {
                email: this.state.email.toLowerCase(),

            }
            try {
                this.setState({
                    isLoading: true
                })
                const res = await Service.put(Url.SEND_OTP_URL, null, body)
                if (res.data) {
                    this.setState({
                        isLoading: false
                    })
                    Utility.setInLocalStorge('otpVerifyToken', res.data.otpVerifyToken)
                    this.props.navigation.navigate('OtpVerification', { email: this.state.email })
                }
                else {
                    this.setState({
                        isLoading: false
                    })
                    console.log('error ', res.error)
                    Alert.alert('', res.error)
                }
            } catch (err) {
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
                        <View style={styles.backButtonView}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                                <Image source={require('../../assets/back.png')} resizeMode='cover' style={{ width: 30, height: 30 }} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.logoContainer}>
                            <Image
                                source={require('../../assets/logo.png')}
                                style={styles.logo}
                            />
                        </View>
                        <View style={styles.formView}>
                            <Loader isLoading={this.state.isLoading} />

                            <View style={styles.mainView}>
                                <Text style={styles.forgotPasswordText}>Forgot Password</Text>
                            </View>
                            <View style={styles.mainView}>
                                <Text style={styles.colorWhite}>Please enter your email address.To ensure security of your account, OTP code will be sent to your email </Text>
                            </View>
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
                                        placeholderTextColor={"#fff"}
                                        onChangeText={(email) => this.setState({ email })}
                                        style={styles.txtInput}
                                    />
                                </View>
                            </View>

                            <View >
                                <TouchableOpacity
                                    style={[styles.LoginBtn, styles.AJ]}
                                    onPress={() => this.forgotpassword()}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.LoginBtnTxt}>Send otp</Text>
                                </TouchableOpacity>
                            </View>


                        </View>


                    </ScrollView>
                </ImageBackground>
            </KeyboardView >
        );
    }

}

