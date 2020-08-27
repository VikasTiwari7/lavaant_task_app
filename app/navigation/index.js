
import React from 'react';
import { Image, Text, View, Platform } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import SplashScreen from '../screens/Splash';
import SignInScreen from '../screens/SignIn';
import SignUpScreen from '../screens/SignUp';
import MyProfileScreen from '../screens/MyProfile';
import ReportsScreen from '../screens/Reports'
import ChangePasswordScreen from '../screens/ChangePassword/'
import TermAndPoliciesScreen from '../screens/TermAndPolicies/'
import ContactUsScreen from '../screens/ContactUs/';
import ForgotPasswordScreen from '../screens/Forgotpassword';
import OtpVerificationScreen from '../screens/OtpVerification';
import ResetPasswordScreen from '../screens/ResetPassword';
import FiltersScreen from '../screens/Filters';
import RemainderScreen from '../screens/RemainderScreen';
import HomeScreen from '../screens/Home';
import AddNewTaskScreen from '../screens/TaskModule/AddNewTaskScreen'
import AllTaskScreen from '../screens/TaskModule/AllTask'
import CategoryScreen from '../screens/TaskModule/CategoryScreen'
import DarwerMenu from '../screens/Drawer/index';

import * as colors from '../constants/colors';

// navigation stack
const AppStack = createStackNavigator(
  {
    TermAndPolicies: {
      screen: TermAndPoliciesScreen,
      navigationOptions: {
        header: null,
      },
    },
    Splash: {
      screen: SplashScreen,
      navigationOptions: {
        header: null,
      },
    },

    SignIn: {
      screen: SignInScreen,
      navigationOptions: {
        header: null,
        visible: false
      },
    },
    SignUp: {
      screen: SignUpScreen,
      navigationOptions: {
        header: null,
        visible: false
      },
    },
    ForgotPassword: {
      screen: ForgotPasswordScreen,
      navigationOptions: {
        header: null,
      },
    },
    OtpVerification: {
      screen: OtpVerificationScreen,
      navigationOptions: {
        header: null,
      },
    },
    ResetPassword: {
      screen: ResetPasswordScreen,
      navigationOptions: {
        header: null,
      },
    },
    MyProfile: {
      screen: MyProfileScreen,
      navigationOptions: {
        header: null,
      },
    },
    Reports: {
      screen: ReportsScreen,
      navigationOptions: {
        header: null,
      },
    },
    Filters: {
      screen: FiltersScreen,
      navigationOptions: {
        header: null,
      },
    },
    ChangePassword: {
      screen: ChangePasswordScreen,
      navigationOptions: {
        header: null
      }
    },
    ContactUs: {
      screen: ContactUsScreen,
      navigationOptions: {
        header: null
      }
    },

    RemainderScreen: {
      screen: RemainderScreen,
      navigationOptions: {
        header: null,
      },
    },


    Home: {
      screen: HomeScreen,
      navigationOptions: {
        header: null,
      },
    },

    AddNewTaskScreen: {
      screen: AddNewTaskScreen,
      navigationOptions: {
        header: null,
      },
    },
    AllTask: {
      screen: AllTaskScreen,
      navigationOptions: {
        header: null,
      },
    },
    CategoryScreen: {
      screen: CategoryScreen,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'Splash',
  },
);

// Drawer
const DrawerNavigator = createDrawerNavigator({
  AllTask: {
    screen: AllTaskScreen,
  },
  MyProfile: {
    screen: MyProfileScreen,
  },
  ChangePassword: {
    screen: ChangePasswordScreen,
  },
  ContactUs: {
    screen: ContactUsScreen,
  },
},
  {
    contentOptions: {
      style: {
        backgroundColor: colors.whiteColor,
        flex: 1,
      }
    },
    navigationOptions: {
      drawerLockMode: 'locked-closed'
    },
    contentComponent: DarwerMenu,
  },
);


// bottom navigation

const TabNavigator = createBottomTabNavigator({
  AllTask: {
    screen: AllTaskScreen,

  },
  Reports: {
    screen: ReportsScreen,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: "Reoprts",

      tabBarIcon: ({ focused, tintColor }) => {
        let icon
        if (navigation.state.routeName === "Reports") {
          icon = focused ? require('../assets/reports_blue.png') :
            require('../assets/reports.png')
        }
        let txt
        if (navigation.state.routeName === "Reports") {
          txt = focused ? <Text style={{ color: "#199bf1", fontSize: 10, fontWeight: "bold" }}>REPORTS</Text> :
            <Text style={{ fontSize: 10, fontWeight: "bold" }}>REPORTS</Text>
        }
        return <View style={{ marginTop: 20, marginBottom: 14, alignItems: 'center' }}><Image
          source={icon}
          style={{
            width: 24,
            height: 24
          }}></Image>
          <Text>{txt}</Text>
        </View>

      }
    })
  },
}, {
  initialRouteName:'AllTask',
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  tabBarOptions: {
    activeTintColor: colors.whiteColor,
    activeBackgroundColor: colors.whiteColor,
    inactiveTintColor: colors.whiteColor,
    inactiveBackgroundColor: colors.whiteColor,
    showIcon: true,
    showLabel: true,
    style: { 
      ...Platform.select({
        ios: {
          height: 25, 
        },
        android:{
          height: 44,
        }
      }),
      elevation: 1, 
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.5,
      shadowRadius: 6,
     },
    tabStyle: {
      alignItems: 'flex-start'
    },
    labelStyle: {
      fontSize: 1,
      fontWeight: "bold",
    }
  }
}
);

const Routes = createAppContainer(
  createSwitchNavigator({
    App: AppStack,
    Drawer: DrawerNavigator,
    BottomTab2: TabNavigator,
  }),
);
export default Routes;
