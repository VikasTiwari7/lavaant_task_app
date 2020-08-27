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
import KeyboardView from '../KeyboardView';
import styles from './style';
import * as Utility from '../../utility/index';
import Loader from '../../Components/Loader'
import * as Url from '../../constants/urls'
import * as Service from '../../api/services'
export default class OtpVerification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            otp1: '',
            otp2: '',
            otp3: '',
            otp4: '',
            isLoading: false
        };
    }

    otpVerification = async () => {
        let otp = this.state.otp1 + this.state.otp2 + this.state.otp3 + this.state.otp4
        if (!Utility.isValidOtp(otp)) {
            Alert.alert("Enter Valid otp")
            return
        } else {
            this.setState({
                isLoading: true
            })
            let otpVerifyToken = await Utility.getFromLocalStorge('otpVerifyToken');
            try {
                let res = await Service.put(Url.VERIFY_OTP_URL + `?otp=${otp}&otpVerifyToken=${otpVerifyToken}`, null, {})
                this.setState({
                    isLoading: false
                })
                if (res.isSuccess == true) {
                    this.props.navigation.navigate('ResetPassword')
                }
                else if (res.isSuccess == false) {
                    alert(res.error)
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
                                <Text style={styles.emailVerificationHeading}>Otp Verification</Text>
                            </View>
                            <View style={styles.mainView}>
                                <Text style={styles.subHeading}>
                                    Please enter 4 digit otp sent on your email "{this.props.navigation.state.params.email}"
                       </Text>
                            </View>

                            <View style={styles.paswordTextInputView}>
                                <View style={styles.paswordTextInput}>
                                    <TextInput
                                        style={styles.TextInputstyles}
                                        maxLength={1}
                                        keyboardType='numeric'
                                        ref="input_1"
                                        onChangeText={otp1 => {
                                            this.setState({ otp1 })
                                            if (otp1) this.refs.input_2.focus(); //assumption is TextInput ref is input_2
                                        }}
                                    />
                                </View>

                                <View style={styles.paswordTextInput}>
                                    <TextInput
                                        style={styles.TextInputstyles}
                                        maxLength={1}
                                        keyboardType='numeric'
                                        ref="input_2"
                                        onChangeText={otp2 => {
                                            this.setState({ otp2 })
                                            if (otp2) this.refs.input_3.focus(); //assumption is TextInput ref is input_2
                                        }}
                                    />
                                </View>

                                <View style={styles.paswordTextInput}>
                                    <TextInput
                                        style={styles.TextInputstyles}
                                        maxLength={1}
                                        keyboardType='numeric'
                                        ref="input_3"
                                        onChangeText={otp3 => {
                                            this.setState({ otp3 })
                                            if (otp3) this.refs.input_4.focus(); //assumption is TextInput ref is input_2
                                        }}
                                    />
                                </View>

                                <View style={styles.paswordTextInput}>
                                    <TextInput
                                        style={styles.TextInputstyles}
                                        maxLength={1}
                                        keyboardType='numeric'
                                        // selectionColor={colors.primaryColor}
                                        ref="input_4"
                                        onChangeText={(otp4) => this.setState({ otp4 })}
                                    />
                                </View>
                            </View>


                            <View >
                                <TouchableOpacity
                                    style={[styles.LoginBtn, styles.AJ]}
                                    onPress={() => this.otpVerification()}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.LoginBtnTxt}>Verify otp</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </KeyboardView >
        );
    }

}

