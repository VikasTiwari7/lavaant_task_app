import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native';
import {
    Container,
    Card,
} from 'native-base';
import SubHeader from '../../Components/SubHeader'
import MainHeader from '../../Components/MainHeader'
import Loader from '../../Components/Loader'
import styles from './style';
import * as commanFn from '../../utility/index';
import * as Url from '../../constants/urls'
import * as Service from '../../api/services'
import { NavigationActions, StackActions } from 'react-navigation';

export default class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            isLoading: false,

        };
    }


    changePassword = async () => {

    
        if (commanFn.isFieldEmpty(this.state.oldPassword &&
            this.state.newPassword && this.state.confirmPassword)) {
            Alert.alert("", "Please enter all the fields")

        }
        else if (commanFn.isValidComparedPassword(this.state.newPassword, this.state.confirmPassword)) {
            Alert.alert("", "Confirm Password and new password are not same")
        }
        else {
            let token = await commanFn.getFromLocalStorge('token')
            this.setState({
                isLoading: true
            })
            let body = {
                oldPassword: this.state.oldPassword,
                newPassword: this.state.newPassword,
                confirmPassword: this.state.confirmPassword
            }

            if (token) {
                try {
                    let data = await Service.post(Url.ResetPassword_URL, token, body)
                    if (data) {
                        this.setState({
                            isLoading: false
                        })
                        Alert.alert(
                            'Password is updated successfully....',
                            data.message,
                            [
                                {
                                    text: 'OK', onPress: () => {
                                        this.props.navigation.dispatch(
                                            StackActions.reset({
                                                index: 0,
                                                actions: [NavigationActions.navigate({ routeName: 'ChangePassword' })]
                                            })
                                        );
                                        this.props.navigation.navigate('BottomTab');
                                    }
                                },
                            ],
                            { cancelable: false },
                        );


                    }
                    else {
                        this.setState({
                            isLoading: false
                        })
                        Alert.alert('Something went wrong')
                    }
                }
                catch (err) {
                    this.setState({
                        isLoading: false
                    })
                    Alert.alert(err.message)

                }
            }

        }
    }
    render() {
        return (
            <Container>
                <MainHeader navigate={this.props.navigation} />
                <ScrollView>
                    <SubHeader title='CHANGE PASSWORD' />
                    <Loader isLoading={this.state.isLoading} />
                    <View style={styles.mainView}>
                        <View style={styles.cardMainView}>
                            <Card style={styles.shadow}>
                                <View style={styles.cardTextView}>
                                    <View style={styles.SectionStyle}>
                                        <Image
                                            source={require('../../assets/LOCKBlack.png')}
                                            style={styles.icon}
                                            resizeMode='center'
                                        />
                                        <View style={styles.inputStyle}>
                                            <TextInput
                                                allowFontScaling={false}
                                                require
                                                placeholder="Old Password"
                                                placeholderTextColor="#000"
                                                onChangeText={(oldPassword) => this.setState({ oldPassword })}
                                                style={styles.txtInput}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.SectionStyle}>
                                        <Image
                                            source={require('../../assets/LOCKBlack.png')}
                                            style={styles.icon}
                                            resizeMode='center'
                                        />
                                        <View style={styles.inputStyle}>
                                            <TextInput
                                                require
                                                allowFontScaling={false}
                                                placeholder="New Password"
                                                placeholderTextColor="#000"
                                                onChangeText={(newPassword) => this.setState({ newPassword })}
                                                style={styles.txtInput}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.SectionStyle}>
                                        <Image
                                            source={require('../../assets/LOCKBlack.png')}
                                            style={styles.icon}
                                            resizeMode='center'
                                        />
                                        <View style={styles.inputStyle}>
                                            <TextInput
                                                require
                                                allowFontScaling={false}
                                                placeholder="Confirm Password"
                                                placeholderTextColor="#000"
                                                onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                                                style={styles.txtInput}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </Card>
                            <View style={[styles.btnView,styles.shadow]}>
                                <TouchableOpacity style={styles.Btn} onPress={() => {
                                    this.changePassword()
                                }}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.BtnTxt}>CHANGE PASSWORD</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </Container >
        );
    }
}
