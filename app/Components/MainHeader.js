import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Platform } from 'react-native';
import {
    Icon, Header, Left, Right, Body
} from 'native-base';
import { NavigationActions, StackActions } from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';
import * as commanFn from '../utility/index';

export default class mainHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            navigationRoute: '',
            navigateFrom: null,
            backButtonDisable: false,
            cartItems: 0,
            role: "",
            Phone: "Phone",
            InPerson: "InPerson"

        }
    }

    componentDidMount = async () => {
        let navigate = this.props.navigate
        await this.setState({
            navigationRoute: navigate.state.routeName,
        })
        let natigateFromScreen = await commanFn.getFromLocalStorge('navigateFrom')
        var role = await commanFn.getFromLocalStorge('role');
        this.setState({
            role: role
        })
        if (role == 'customer' && (global.user.customerGroup === '' || global.user.customerGroup === null || global.user.customerGroup === undefined)) {
            await this.setState({
                backButtonDisable: true
            })
        } else {
            await this.setState({
                backButtonDisable: false
            })
        }
        if (natigateFromScreen !== null) {
            await this.setState({
                navigateFrom: natigateFromScreen
            })
            await commanFn.removeAuthKey('navigateFrom')
        }
    }

    goToHome = (navigate) => {
        navigate.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Home' })]
            })
        );
        navigate.navigate('BottomTab2');
    }

    goToAddNewTask = (navigate) => {
        navigate.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'AddNewTaskScreen' })]
            })
        );
        navigate.navigate('AddNewTaskScreen');
    }

    goToAllTask = (navigate) => {
        navigate.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'AllTask' })]
            })
        );
        navigate.navigate('BottomTab2');
    }

    goToOrderList = (navigate) => {
        navigate.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'OrderList' })]
            })
        );
        navigate.navigate('OrderList');
    }

    goBack = (navigate) => {
        navigate.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Home' })]
                // actions: [NavigationActions.navigate({ routeName: 'SignIn' })]
            })
        );
        navigate.navigate('BottomTab2');

    }

    goToFilters = (navigate) => {

        navigate.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Reports' })]
            })
        );
        navigate.navigate('Reports');

    }

    goToAddReminder = (navigate) => {

        navigate.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'AddReminder' })]
            })
        );
        navigate.navigate('AddReminder');

    }

    render() {
        let navigate = this.props.navigate
        let navigateRought = this.state.navigationRoute
        let backButton

        const backArrowBtn = <Image source={require('../assets/back.png')} resizeMode='cover' style={{ width: 25, height: 25 }} />
        const menuBtn = <Icon name="md-menu" size={30} style={{ color: '#3492d4' }} />
        console.log('............navigate.................', navigate.state.routeName)
        if (navigateRought == "OrderDetail") {
            backButton = (< TouchableOpacity onPress={() => this.goToOrder(navigate)}>
                {backArrowBtn}
            </TouchableOpacity >)
        }
        else if (navigateRought == 'ChangePassword') {
            backButton = (< TouchableOpacity onPress={() => this.goToHome(navigate)}>
                {backArrowBtn}
            </TouchableOpacity >)
        }
        else if (navigateRought == 'ContactUs') {
            backButton = (< TouchableOpacity onPress={() => this.goToHome(navigate)}>
                {backArrowBtn}
            </TouchableOpacity >)
        }
        else if (navigateRought == 'MyProfile') {
            if (this.state.backButtonDisable) {
                backButton = (null)
            } else {
                backButton = (< TouchableOpacity onPress={() => this.goToHome(navigate)}>
                    {backArrowBtn}
                </TouchableOpacity >)
            }
        } else if (navigateRought == 'Home') {
            backButton = (<TouchableOpacity onPress={() => navigate.dispatch(DrawerActions.toggleDrawer())}>
                {menuBtn}
            </TouchableOpacity>)

        } else if (navigateRought == 'AllTask') {
            backButton = (< TouchableOpacity onPress={() => navigate.dispatch(DrawerActions.toggleDrawer())}>
                {menuBtn}
            </TouchableOpacity >)
        }
        else if (navigateRought == 'AddNewTaskScreen') {
            backButton = (< TouchableOpacity onPress={() => this.goToAllTask(navigate)}>
                {backArrowBtn}
            </TouchableOpacity >)
        }
        else if (navigateRought == 'WeeklyCalandar' || navigateRought == 'AddEvent' || navigateRought == 'EditEvent') {
            backButton = (< TouchableOpacity onPress={() => this.goToCalandarScreen(navigate)}>
                {backArrowBtn}
            </TouchableOpacity >)
        }
        else if (navigateRought == 'AddReminder') {
            backButton = (< TouchableOpacity onPress={() => this.goToTaskReminder(navigate)}>
                {backArrowBtn}
            </TouchableOpacity >)
        }
        else if (navigateRought == 'Reports') {
            backButton = (< TouchableOpacity onPress={() => this.goBack(navigate)}>
                {backArrowBtn}
            </TouchableOpacity >)
        }
        else if (navigateRought == 'Filters') {
            backButton = (< TouchableOpacity onPress={() => this.goToFilters(navigate)}>
                {backArrowBtn}
            </TouchableOpacity >)
        }
        else if (navigateRought == 'Custom') {
            backButton = (< TouchableOpacity onPress={() => this.goToAddReminder(navigate)}>
                {backArrowBtn}
            </TouchableOpacity >)
        }
        else {
            backButton = (< TouchableOpacity onPress={() => this.goBack(navigate)}>
                {backArrowBtn}
            </TouchableOpacity >)
        }

        return (
            <Header style={[{ backgroundColor: '#dcf0fe', paddingBottom: 7 }]}>
                <Left>
                    {backButton}
                </Left>
                <Body style={{ flex: 8, alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={require('../assets/logoTask.png')} style={{ width: '48%', height: 50 }} />
                    </View>

                </Body>
                <Right>
                    {null}
                </Right>
            </Header >

        );
    }
}
