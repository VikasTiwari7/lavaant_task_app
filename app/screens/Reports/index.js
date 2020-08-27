import React, { Component } from 'react';
import {View, Text, ScrollView,Image,} from 'react-native';
import { Container,Card,ListItem,List,} from 'native-base';
import styles from './style';
import SubHeader from '../../Components/SubHeader'
import MainHeader from '../../Components/MainHeader'
import { NavigationActions, StackActions } from 'react-navigation';
import * as Url from '../../constants/urls';
import * as Service from '../../api/services';
import Loader from '../../Components/Loader';
import moment from "moment";
import * as Utility from "../../utility/index"

export default class Reports extends Component {
    constructor(props) {
        super(props);
        this.openFilters = this.openFilters.bind(this)
        this.state = {
            tasks: [],
            name: '',
            address: '',
            isLoading: false,
            queryString: this.props.navigation.state.params ? this.props.navigation.state.params.queryString : ''
        }
    }

    componentDidMount() {
        this.getTaskList();
    }

    getTaskList = async () => {
        let userId = await Utility.getFromLocalStorge('userId');
        const res = await Service.get(Url.TASK_LIST_URL + `userId=${userId}${this.state.queryString}`);
        if (res.isSuccess) {
            this.setState({
                tasks: res.items
            });
        }

    }

    // orderDetail = (item) => {
    //     this.props.navigation.dispatch(
    //         StackActions.reset({
    //             index: 0,
    //             actions: [NavigationActions.navigate({ routeName: 'OrderDetail', item })]
    //         })
    //     );
    //     this.props.navigation.navigate('OrderDetail', item)

    // }
    openFilters() {
        this.props.navigation.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: "Filters" })]
            })
        );
        this.props.navigation.navigate('Filters');
    }

    onFilterPress = () => {
        console.log('Filter button pressed');
    }

    render() {
        return (
            <Container>
                <MainHeader navigate={this.props.navigation} />
                <ScrollView>
                    <SubHeader title="Reports"
                        showFilters={true}
                        onFilterPress={this.openFilters}
                    //navigateTo="Filters" 
                    />
                    <Loader isLoading={this.state.isLoading} />
                    <View style={styles.orderMainView}>
                        {this.state.tasks.length ? <Card>
                            <View style={styles.addressListView}>
                                <List >
                                    {this.state.tasks.map((item, key) =>
                                        <ListItem key={key} 
                                        // onPress={() => this.orderDetail(item)}
                                        >
                                            <Image
                                                source={require('../../assets/reports_blue.png')}
                                                style={styles.icon}
                                            />
                                            <View style={{ width: '50%', }}>
                                                <Text style={styles.textSize} allowFontScaling={false}>{item.details}</Text>
                                                <Text style={styles.textSize} allowFontScaling={false} >{moment(item.dueDate).format('MMMM DD, yyyy')}</Text>
                                            </View>
                                            <View style={styles.orderListDateView}>
                                                <Text allowFontScaling={false} style={styles.orderListDate}>{item.status}</Text>
                                            </View>
                                        </ListItem>
                                    )}
                                </List>
                            </View>
                        </Card> : null}
                    </View>
                </ScrollView>
            </Container>
        );
    }
}
