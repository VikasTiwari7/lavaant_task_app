import React, { Component } from 'react'
import { Alert, Text, View, SafeAreaView, Image, TouchableOpacity, ImageBackground } from 'react-native'
import Styles from './style'
import * as Utility from "../../utility/index"
import * as UserService from '../../api/deviceTokenUpdate'
import { NavigationActions, StackActions } from 'react-navigation';
import styles from './style'

export default class DrawerMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pic: "https://cdn3.iconfinder.com/data/icons/social-messaging-productivity-6/128/profile-male-circle2-512.png",
        };

    }

    componentDidUpdate() {
        const isDrawerOpen = this.props.navigation.state.isDrawerOpen;
        if (!isDrawerOpen) {
            this.props.navigation.dispatch(
                StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'AllTask' })]
                })
            );
            this.props.navigation.navigate('BottomTab2');
        }
    }

    resetApp = async () => {
        // remove device token
        await UserService.updateDeviceToken()
        await Utility.removeAuthKey('fcmToken')
        // remove auth token user and id
        await Utility.removeAuthKey('token')
        await Utility.removeAuthKey('user')
        await Utility.removeAuthKey('userId')
        global.favouriteSubCategories = []
        this.props.navigation.navigate('SignIn')
    }

    SignOut = () => {
        Alert.alert(
            "",
            "Do You Want to Sign Out",
            [
                { text: "No", onPress: () => { }, style: "cancel" },
                { text: "Yes", onPress: () => this.resetApp() },
            ],
            { cancelable: false },
        );
        return true;
    }

    Settings = () => {
        this.props.navigation.navigate('EditProfile')
    }

    changePassword = () => {
        this.props.navigation.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'ChangePassword' })]
            })
        );
        this.props.navigation.navigate('ChangePassword')
    }

    contactUs = () => {
        this.props.navigation.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'ContactUs' })]
            })
        );
        this.props.navigation.navigate('ContactUs')
    }

    profile = () => {
        this.props.navigation.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'MyProfile' })]
            })
        );
        this.props.navigation.navigate('MyProfile')
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ImageBackground
                    source={require('../../assets/bg_draw.png')}
                    style={Styles.backgroundImage}
                    resizeMode='cover'
                    resizeMethod='scale'>
                    <View style={Styles.container}>
                        <View style={styles.profilePicMainView}>
                            <ImageBackground source={{ uri: global.user.profilePic || this.state.pic }} style={styles.profilePicBackground}>
                                <Image source={require('../../assets/polygon2.png')} style={styles.profilePic} />
                            </ImageBackground>
                        </View>
                        <View style={styles.divider}></View>
                        <View style={styles.userDetailView}>
                            <Text
                                allowFontScaling={false}
                            >{this.state.name}</Text>
                            <Text
                                allowFontScaling={false}
                                style={styles.color}>{this.state.email}</Text>
                        </View>
                        <View style={{ marginLeft: 20, }}>
                            <TouchableOpacity onPress={this.profile}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={require('../../assets/user.png')} style={Styles.icon} />
                                    <Text
                                        allowFontScaling={false}
                                        style={Styles.txt}>My Profile</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.changePassword}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={require('../../assets/sidemenu/lockNew.png')} style={Styles.icon} />
                                    <Text
                                        allowFontScaling={false}
                                        style={Styles.txt}>Change Password</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.contactUs}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={require('../../assets/sidemenu/setting.png')} style={Styles.icon} />
                                    <Text
                                        allowFontScaling={false}
                                        style={Styles.txt}>Contact Us</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.SignOut()}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={require('../../assets/sidemenu/logoutNew.png')} style={Styles.icon} />
                                    <Text
                                        allowFontScaling={false}
                                        style={Styles.txt} >Log Out</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </SafeAreaView>
        )
    }
}