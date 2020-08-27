import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import * as colors from '../constants/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../utility/index';
import { NavigationActions, StackActions } from 'react-navigation';
import { StyleSheet } from 'react-native';
import { Card, } from 'native-base';
//import Modal from '../screens/Modal/index';

export default class SubHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            displayAdd: false,
            search: '',
            isModalVisible: false
        }
    }
    componentDidMount = async () => {
        if (this.props.navigate && this.props.navigateTo) {
            this.setState({
                displayAdd: true
            })
        }


    }


    handleFilterPress = () => {
        this.props.onFilterPress?.();
    }
    ViewAllPress = () => {
        this.props.ViewAllPress?.();
    }

    handleSearch = () => {
        this.props.onSearchVendor?.();
    }
    goToAddVendor = () => {
        let screenName = this.props.navigateTo;
        this.props.navigate.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: screenName })]
            })
        );
        this.props.navigate.navigate('AddVendor');
    }

    render() {
        const addVenderButton = (<TouchableOpacity onPress={() => this.goToAddVendor()}>

            <Image source={require('../assets/add_vendor.png')} style={{ width: 30, height: 22, }} />
        </TouchableOpacity>);

        const addDropdownButton = (
            // <Modal ref={instance => { this.child = instance; }}></Modal>
            <TouchableOpacity onPress={this.handleFilterPress} >
                <Image source={require('../assets/reportFilter.png')} style={{ width: 32, height: 31 }} />
            </TouchableOpacity >

        );
        const ViewAll = (
            // <Modal ref={instance => { this.child = instance; }}></Modal>
            <TouchableOpacity onPress={this.ViewAllPress} >
                <Text style={{ color: 'white', fontSize: 20, textDecorationLine: "underline", textAlign: "right" }}>ViewAll</Text>
            </TouchableOpacity >

        );

        const searchBar = (
            <Card style={{ width: '90%', alignSelf: 'center', marginBottom: '5%', borderRadius: 5 }}>
                <View style={styles.searchView} >
                    <TextInput
                        style={styles.searchTextInput}
                        placeholder="search"
                        placeholderTextColor="grey"
                        onChangeText={(search) => this.setState({ search: search })}
                    // style={styles.loginTxtInput}
                    />
                    <TouchableOpacity onPress={() => this.props.onSearchVendor(this.state.search)} >
                        <Image source={require('../assets/search.png')} style={styles.searchIcon} />
                    </TouchableOpacity>
                </View>
            </Card>
        );
        return (
            <View style={styles.mainView}>
                <View style={styles.subView1}>
                    <View style={styles.showFilterMainView}>
                        <View style={styles.showFilterBtn}>
                            {this.props.showFilters ? addDropdownButton : null}
                        </View>
                        <View style={styles.alignTitle}>
                            <Text
                                allowFontScaling={false}
                                style={styles.title}>
                                {this.props.title}</Text>
                        </View>
                        <View style={styles.addVenderMainView}>
                            {this.state.displayAdd ? addVenderButton : null}
                        </View>
                    </View>
                    <View style={styles.showViewAll}>
                        {this.props.showViewAll ? ViewAll : null}
                    </View>
                </View>

                {this.props.displaySearchBar ? searchBar : null}
                <View style={styles.subView2}>
                    {this.props.leftTitle ? <View >
                        <Text style={[{ textAlign: 'left' }, styles.searchBarTitle]}>
                            {this.props.leftTitle}
                        </Text>
                    </View> : null}
                    {this.props.middleTitle ? <View >
                        <Text style={[{ textAlign: 'center' }, styles.searchBarTitle]}>
                            {this.props.middleTitle}
                        </Text>
                    </View> : null}
                    {this.props.rightTitle ? <View >
                        <Text style={[{ textAlign: 'right' }, styles.searchBarTitle]}>
                            {this.props.rightTitle}
                        </Text>
                    </View> : null}


                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: 'column',
        minHeight: 80,
        backgroundColor: colors.primaryColor,
        justifyContent: 'center',
    },
    subView1: { justifyContent: 'center', },
    subView2: { margin: '2%', },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: wp('5%'),
        color: 'white',
        textTransform: 'uppercase',

    },
    addVenderMainView:{ padding: 10, width: '20%', paddingLeft: 20 },
    alignTitle:{ alignSelf: 'center', },
    searchBarTitle: { color: 'white', fontWeight: 'bold', fontSize: wp('5%') },
    showFilterBtn: { width: '20%', justifyContent: 'center', alignItems: 'center' },
    showViewAll:{ bottom: 10, marginRight: 10 },
    showFilterMainView:{ height: 50, flexDirection: 'row', justifyContent: 'space-between', },
    searchView: {
        flexDirection: 'row',
        width: '100%',
        height: 35,
    },
    searchTextInput: {
        width: '80%',
        height: 35,
        marginLeft: 5,
    },
    searchIcon: {
        // flex: 1,
        width: 30,
        height: 30,
        resizeMode: 'contain',
        marginTop: '1%',
    },
});