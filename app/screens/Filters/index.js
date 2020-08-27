import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, } from 'react-native';
import { Container, Card, ListItem, CheckBox, Body } from 'native-base';
import styles from './style';
import SubHeader from '../../Components/SubHeader'
import MainHeader from '../../Components/MainHeader'
import { NavigationActions, StackActions } from 'react-navigation';
import * as commanFn from '../../utility/index';
import * as Url from '../../constants/urls';
import * as Service from '../../api/services';
import Loader from '../../Components/Loader';
import DatePicker from 'react-native-datepicker'
import moment from "moment";

export default class Filters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            from: '',
            to: '',
            search: '',
            subCategories: [],
            productList: [],
        }
    }
    componentDidMount() {
        this.getProductByCategory();
    }

    goToReports = () => {
        this.props.navigation.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Reports' })]
            })
        );
        this.props.navigation.navigate('Reports', { queryString: this.state.queryString })
    }

    onPressCheckbox(item) {
        const checkedCheckBox = this.state.subCategories.find((cb) => cb.id === item.id);
        checkedCheckBox.checked = !checkedCheckBox.checked;
        let categories = this.state.subCategories.map((category) => {
            return category.id === checkedCheckBox.id ? checkedCheckBox : category
        });
        this.setState({
            subCategories: categories
        })
    }


    getProductByCategory = async () => {
        console.log('inside getProductByCategory....')
        this.setState({
            isLoading: true
        })
        let token = await commanFn.getFromLocalStorge('token')
        let userId = await commanFn.getFromLocalStorge('userId');
        const res = await Service.get(Url.GET_TASKCATEGORIES_URL + `categoryOf=task&id=${userId}`, token)
        if (res.data) {
            let categories = res.data.map(category => ({
                name: category.name,
                id: category.id,
                checked: false
            }));
            console.log('Categories :: ', categories);
            this.setState({
                subCategories: categories,
                isLoading: false
            })
        }
    }

    getSelectedItems(items) {
        return items.filter((selectedItem) => selectedItem.checked)

            .map((item) => {
                return item.id;

            });
    }
    formatDate(date) {
        return moment(date, "DD-MM-YYYY").format('YYYY-MM-DD');
    }
    applyFilters = async () => {
        console.log('inside filter...........................');

        let subCategories = this.getSelectedItems(this.state.subCategories);
        let queryString = '';
        if (this.state.from) {
            queryString = `${queryString}&fromDate=${this.formatDate(this.state.from)}`;
        }
        if (this.state.to) {
            queryString = `${queryString}&toDate=${this.formatDate(this.state.to)}`;
        }
        if (subCategories != null && subCategories.length > 0) {
            queryString = `${queryString}&subCategories=${subCategories}`;
        }

        this.setState({
            queryString: queryString
        });

        this.props.navigation.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Reports' })]
            })
        );
        this.props.navigation.navigate('Reports', { queryString: queryString })
    }
    render() {
        return (
            <Container>
                <MainHeader navigate={this.props.navigation} />
                <ScrollView>
                    <SubHeader
                        title="FILTERS"
                    />
                    <Loader isLoading={this.state.isLoading} />
                    <View style={styles.mainView}>
                        <Card style={styles.card}>
                            <View style={styles.mainDateView}>
                                <Text style={styles.headings}>By Date</Text>
                                <View style={styles.datesMainView}>
                                    <View style={styles.dateIndividualView}>
                                        <Text> From:</Text>
                                        <View style={styles.inputViewStyle}>
                                            <DatePicker
                                                allowFontScaling={false}
                                                showIcon={false}
                                                date={this.state.from}
                                                mode="date"
                                                placeholder=" "
                                                format="DD-MM-YYYY"
                                                confirmBtnText="Confirm"
                                                cancelBtnText="Cancel"
                                                maxDate={new Date()}
                                                customStyles={{
                                                    dateInput: styles.dateInput,
                                                    dateText: styles.dateText,
                                                    placeholderText: styles.placeholderText,
                                                }}
                                                onDateChange={(date) => { this.setState({ from: date }) }}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.dateIndividualView}>
                                        <Text>To:</Text>
                                        <View style={styles.inputViewStyle}>
                                            <DatePicker
                                                allowFontScaling={false}
                                                showIcon={false}
                                                date={this.state.to}
                                                mode="date"
                                                placeholder=" "
                                                format="DD-MM-YYYY"
                                                minDate={this.state.from}
                                                confirmBtnText="Confirm"
                                                cancelBtnText="Cancel"
                                                maxDate={new Date()}
                                                customStyles={{
                                                    dateInput: styles.dateInput,
                                                    dateText: styles.dateText,
                                                    // placeholderText: styles.placeholderText,
                                                    btnTextConfirm: styles.btnTextConfirm,
                                                }}
                                                onDateChange={(date) => { this.setState({ to: date }) }}
                                            />
                                        </View>
                                    </View>
                                </View>

                            </View>
                        </Card>

                        <Card style={[styles.card, { height: 300, overflow: 'hidden' }]}>
                            <View style={{ padding: '5%' }}>
                                <Text style={styles.headings}>By Category</Text>

                                {/* Loop Start for sub category */}
                                <ScrollView nestedScrollEnabled={true}>
                                    {this.state.subCategories.map((item, key) =>
                                        <ListItem key={key} style={{ marginLeft: 0, }}>
                                            <Body>
                                                <Text
                                                    allowFontScaling={false} style={styles.category}>
                                                    {item.name}
                                                </Text>
                                            </Body>
                                            <CheckBox style={styles.checkBox}
                                                checked={item.checked}
                                                onPress={() => this.onPressCheckbox(item)} />

                                        </ListItem>
                                    )}
                                </ScrollView>
                                {/* Loop End for sub category */}

                            </View>
                        </Card>
                        <View>
                            <TouchableOpacity style={[styles.FbBtn, styles.AJ]} onPress={() => this.applyFilters()} >
                                <Text
                                    allowFontScaling={false}
                                    style={styles.LoginBtnTxt2}>Apply Filters</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </Container >
        );
    }
}