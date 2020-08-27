
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import styles from "./style"
import { NavigationActions, StackActions } from 'react-navigation';
import { Container } from 'native-base';
import MainHeader from '../../Components/MainHeader'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            isModalVisible: false,
            modalVisible: true,
        };
    }

    goToAllTask = () => {

        this.props.navigation.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'AllTask' })]
            })
        );
        this.props.navigation.navigate('AllTask')
    }

    goBack = (value) => {
        this.setState({
            open: value
        })
    }

    render() {
        return (
            <Container>
                <MainHeader navigate={this.props.navigation} />
                <ScrollView style={styles.Bottom}>
                    <View style={styles.subHeaderView}>
                        <Text style={styles.dateText}>{moment(new Date()).format('MMMM DD, yyyy')}</Text>
                    </View>

                    <View style={styles.mainview}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => this.goToAllTask()}>
                            <View style={[styles.subview, styles.shadow]}>
                                <Image
                                    source={require('../../assets/tasks.png')}
                                    style={styles.taskImg}
                                />
                                <View style={styles.taskView}>
                                    <Text style={styles.taskTxt}>
                                        TASKS</Text></View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Container>
        );
    }
}


