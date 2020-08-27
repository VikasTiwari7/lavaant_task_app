import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import styles from './style';
import { Container, CheckBox } from 'native-base';
import MainHeader from '../../../Components/MainHeader'
import { NavigationActions, StackActions } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import Loader from '../../../Components/Loader'
import * as Utility from '../../../utility/index';
import * as Url from '../../../constants/urls';
import * as Service from '../../../api/services';
import moment from "moment";

export default class AllTask extends Component {
    constructor(props) {
        super(props);

        let lastTap = null;
        this.state = {
            key: 0,
            selectedCategory: '',
            isModalVisible: false,
            isModalVisible1: false,
            chosenDate: new Date(),
            checked: false,
            isDate: false,
            completed: false,
            tasks: [],
            categoryList: [],
            isLoading: false,
            sortByName: false,
            sortByDate: false,
            sortByStatus: false,
            sortBy: '',
            taskStauts: '',
            scrollWidth: 0,
            scrollPosition: 0,
            categoryScrollWidth: 0,
            route: "AllTask"
        }
        this.setDate = this.setDate.bind(this);
    }

    setDate(newDate) {
        this.setState({ chosenDate: newDate });
    }
    _showModal = () => {
        if (this.state.isModalVisible) {
            this.setState({ isModalVisible: false })
        }
        else {
            this.setState({ isModalVisible: true })
        }

    }
    _hideModal = () => {
        this.setState({ isModalVisible: false })
    }

    goToCategoryScreen = async () => {
        this._hideModal();
        await Utility.setInLocalStorge('route', this.state.route)
        this.props.navigation.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'CategoryScreen' })]
            })
        );
        this.props.navigation.navigate('CategoryScreen')
    }

    async getSortedTasks() {
        console.log('sorting tasks');
        this._hideModal();
        this.setState({
            isLoading: true,
        });
        let taskList = await this.getTasks('all');
        this.setState({
            tasks: taskList,
            isLoading: false
        });
    }
    openSettingsModal = (task) => {
        this.setState({
            isModalVisible1: !this.state.isModalVisible1,
            taskSettings: task,
            completed: task.status == 'completed',
            taskStauts: task.status
        });

    }


    hideSettingsModal = () => {
        this.setState({ isModalVisible1: false })
    }

    updateTaskStatus = async (task, status) => {
        console.log('inside UPDATE TASK ........................', task)
        let token = await Utility.getFromLocalStorge('token');
        const res = await Service.put(`${Url.PUT_UPDATE_TASK_BY_STATUS_URL}${task.id}?status=${status}`, token)
        return res.data;
    }

    async completeTask(item) {
        this.hideSettingsModal();
        this.setState({
            isLoading: true
        });
        let status = item.status == 'completed' ? 'pending' : 'completed';
        console.log('status of completed :: ', status)
        let completedTask = await this.updateTaskStatus(item, status);
        let tasks = this.state.tasks.map((task) => {
            return task.id === completedTask.id ? completedTask : task
        });

        this.setState({
            tasks: tasks,
            isLoading: false
        });
    }

    async pauseTask(item) {
        this.hideSettingsModal()
        this.setState({
            isLoading: true
        });
        let status = item.status == 'pending' ? 'paused' : 'pending';
        console.log('status of pending', status)
        let completedTask = await this.updateTaskStatus(item, status);
        let tasks = this.state.tasks.map((task) => {
            return task.id === completedTask.id ? completedTask : task
        });

        this.setState({
            tasks: tasks,
            isLoading: false
        });
    }
    handleDoubleTap = async (item) => {

        const now = Date.now();
        if (this.lastTap && (now - this.lastTap) < 300) {
            this.setState({
                isLoading: true
            })
            let completedTask = await this.updateTaskStatus(item, 'completed');
            let tasks = this.state.tasks.map((task) => {
                return task.id === completedTask.id ? completedTask : task
            });

            this.setState({
                tasks: tasks,
                isLoading: false
            });
        }
        else {
            this.lastTap = now;
        }
    }

    setModalVisible(visible) {
        this.setState({ isModalVisible: visible });
    }
    setModalVisible1(visible) {
        this.setState({ isModalVisible1: visible });
    }

    goToAddNewTask = async () => {
        await Utility.setInLocalStorge('route', "AddNewTAskScreen")
        this.props.navigation.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'AddNewTaskScreen' })]
            })
        );
        this.props.navigation.navigate('AddNewTaskScreen')
    }

    editTask = (task) => {

        this.props.navigation.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'AddNewTaskScreen' })]
            })
        );
        this.props.navigation.navigate('AddNewTaskScreen', { task: task })
    }

    async componentDidMount() {
        this.getCategories();
        let taskList = await this.getTasks('all');
        this.setState({
            tasks: taskList,
            selectedCategory: 'all'
        });
    }

    getCategories = async () => {
        let token = await Utility.getFromLocalStorge('token');
        let userId = await Utility.getFromLocalStorge('userId');
        const res = await Service.get(Url.GET_TASKCATEGORIES_URL + `categoryOf=task&id=${userId}`, token)
        if (res.data) {
            res.data.splice(0, 0, { name: "All", id: "all" });
            this.setState({
                isLoading: false,
                categoryList: res.data
            })
        }
    }

    sortBy = async (value) => {
        let sortBy = '';
        if (value == 'Date' && !this.state.sortByDate) {
            this.setState({
                sortByDate: !this.state.sortByDate,
                sortByName: false,
                sortByStatus: false
            });
            sortBy = sortBy + '&sortByDate=asce';
        }
        if (value === 'Name' && !this.state.sortByName) {
            this.setState({
                sortByName: !this.state.sortByName,
                sortByDate: false,
                sortByStatus: false
            });
            sortBy = sortBy + '&sortByName=asce';
        }
        if (value == 'Status' && !this.state.sortByStatus) {
            this.setState({
                sortByStatus: !this.state.sortByStatus,
                sortByDate: false,
                sortByName: false
            });
            sortBy = sortBy + '&sortByCompletedFirst=asce';
        }
        await this.setState({
            sortBy: sortBy
        });
        this.getSortedTasks();
    }

    getTasks = async (categoryId) => {
        let sortBy = this.state.sortBy;
        let token = await Utility.getFromLocalStorge('token');
        let userId = await Utility.getFromLocalStorge('userId');
        const res = await Service.get(Url.GET_TASKLIST_URL + `category=${categoryId}&user=${userId}${sortBy}`, token)
        return res.data ? res.data : []
    }
    getTasksByCategory = async (item) => {
        console.log('inside get task ', item.name)
        this.setState({
            selectedCategory: item.id
        });
        let taskList = await this.getTasks(item.id);
        this.setState({
            tasks: taskList,
            isLoading: false
        });
    }

    confirmDelete = async (task) => {
        Alert.alert(
            "Task will be deleted.",
            "Are you sure you want to delete?",
            [
                {
                    text: "Ok",
                    onPress: () => this.deleteTask(task),
                },
                { text: "Cancel", onPress: () => console.log("Cancel Pressed") }
            ]);
    }

    deleteTask = async (task) => {
        this.hideSettingsModal();
        console.log('inside delete ');
        this.setState({
            isLoading: true,
        })
        let token = await Utility.getFromLocalStorge('token');
        const res = await Service.deleteApi(`${Url.DELETE_TASK_URL}${task.id}`, token)
        if (res.data) {
            this.setState({
                isLoading: false,

            })

            // Alert.alert('', res.message);
            let taskList = await this.getTasks(this.state.selectedCategory);
            this.setState({
                tasks: taskList,
                selectedCategory: this.state.selectedCategory,
                isLoading: false
            });

        }
    }

    onLayout = (event) => {
        let scrollWidth = event.nativeEvent.layout.width;
        this.setState({
            scrollWidth: scrollWidth - (scrollWidth * 0.2) // reduced 20% width
        });
    }

    getScrollPosition(scrollDirection) {
        let scrollPosition = 0;
        let isScrollToEnd = this.state.scrollPosition >= this.state.categoryScrollWidth;
        let isScrollToStart = this.state.scrollPosition <= 0;
        if (scrollDirection === 'right' && !isScrollToEnd) {
            scrollPosition = this.state.scrollPosition + this.state.scrollWidth;
        } else if (scrollDirection === 'left' && !isScrollToStart) {
            scrollPosition = this.state.scrollPosition - this.state.scrollWidth;
        } else {
            scrollPosition = this.state.scrollPosition;
        }
        this.setState({ scrollPosition: scrollPosition });
        return scrollPosition;
    }
    onScrollViewLayout = (event) => {
        this.setState({
            categoryScrollWidth: event.nativeEvent.layout.width
        });
    }
    render() {
        return (
            <Container>
                <MainHeader navigate={this.props.navigation} />
                <ScrollView>
                    <View style={styles.subHeaderView}>
                        <Text style={styles.dateText}>{moment(new Date()).format('MMMM D, yyyy')}</Text>
                    </View>
                    <Loader isLoading={this.state.isLoading} />
                    <View style={styles.tabView}>

                        {/* view1 */}
                        <View
                            onLayout={this.onLayout}
                            style={styles.layoutView}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.scroll.scrollTo({ x: this.getScrollPosition('left'), animated: true })
                                }}
                            >
                                <View style={styles.scrollButtonView}>
                                    <Image
                                        source={require('../../../assets/left.png')}
                                        style={styles.scrollButton}
                                    />
                                </View>
                            </TouchableOpacity>
                            <ScrollView horizontal={true}
                                onLayout={this.onScrollViewLayout}
                                showsHorizontalScrollIndicator={false}
                                ref={(node) => this.scroll = node}>
                                {/* TASKCATEGORIES LOOP START */}
                                {this.state.categoryList.map((item, key) => (

                                    <View key= {key} style={{
                                        marginRight: 15, borderBottomWidth: item.id === this.state.selectedCategory ? 5 : 0
                                    }}>
                                        <TouchableOpacity onPress={() => this.getTasksByCategory(item)} >
                                            <View style={styles.catagoryView}></View>
                                            <Text >{item.name}</Text>

                                        </TouchableOpacity>
                                    </View>
                                    // </View>
                                ))}
                            </ScrollView>
                            {/* TASKCATEGORIES LOOP END */}
                            <View style={styles.scrollButtonView}>

                                <TouchableOpacity
                                    onPress={() => {
                                        this.scroll.scrollTo({ x: this.getScrollPosition('right'), animated: true })
                                    }}>
                                    <View style={styles.scrollButtonView}>
                                        <Image
                                            source={require('../../../assets/right.png')}
                                            style={styles.scrollButton}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* view2 */}
                        <View style={styles.tabRightImgView}>

                            <TouchableOpacity onPress={() => this._showModal()}>
                                <Image
                                    source={require('../../../assets/sort.png')}
                                    style={styles.image1}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Modal
                        position='absolute'
                        backdropOpacity={0.5}
                        backdropColor="black"
                        hasBackdrop={true}
                        isVisible={this.state.isModalVisible}
                        // visible={this.state.isModalVisible}
                        onBackdropPress={() => this._hideModal()}
                        onRequestClose={() => this._hideModal()}>
                        <View style={[styles.modalMainView, { width: 200 }]}>
                            <View style={styles.modalSubView}>
                                <View style={styles.checkBoxView}>
                                    <CheckBox
                                        onPress={() => this.sortBy('Date')}
                                        checked={this.state.sortByDate}
                                        style={styles.add}
                                    />
                                </View>
                                <View>
                                    <Text style={styles.textInModal}>
                                        Sort by Date
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.modalSubView}>
                                <View style={styles.checkBoxView}>
                                    <CheckBox
                                        onPress={() => this.sortBy('Name')}
                                        checked={this.state.sortByName}
                                        style={styles.add}
                                    />
                                </View>
                                <View>
                                    <Text style={styles.textInModal}>Sort by Name</Text>
                                </View>
                            </View>
                            <View style={styles.modalSubView}>
                                <View style={styles.checkBoxView}>
                                    <CheckBox
                                        onPress={() => this.sortBy('Status')}
                                        checked={this.state.sortByStatus}
                                        style={styles.add}
                                    />
                                </View>
                                <View>
                                    <Text style={styles.textInModal}>Completed First</Text>
                                </View>
                            </View>

                            <TouchableOpacity onPress={() => this.goToCategoryScreen()} activeOpacity={1} style={styles.modalSubView}>
                                <View style={[styles.checkBoxView, { marginLeft: 0 }]}>
                                    <Image
                                        source={require('../../../assets/special_ints..png')}
                                        style={styles.add}
                                    />
                                </View>
                                <View>
                                    <Text style={[styles.textInModal, { paddingLeft: 0 }]}>Add New Category</Text>
                                </View>
                            </TouchableOpacity>

                        </View>

                    </Modal>
                    <View style={styles.borderWidth}></View>
                    {

                        this.state.tasks.map((item, key) => (
                            <View key={key} style={styles.headerview}>
                                <View style={styles.subview}>
                                    <Text style={styles.dateTxt}>{moment(item.dueDate).format("D")}</Text>
                                    <Text style={styles.monthTxt}>{moment(item.dueDate).format("MMMM")}</Text>
                                </View>
                                <ScrollView
                                    showsHorizontalScrollIndicator={false}
                                    horizontal={true}>
                                    <View style={styles.subview1}>
                                        <TouchableOpacity
                                            onPress={() =>
                                                this.handleDoubleTap(item)
                                            }>
                                            <Text style={{
                                                textDecorationLine: item.status === 'completed'
                                                    ? 'line-through' : 'none',
                                            }}>

                                                <Text>{item.details}</Text>
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => this.openSettingsModal(item)}>
                                            <Image source={require('../../../assets/settings.png')} style={styles.image2} />
                                            <Modal
                                                backdropOpacity={0.1}
                                                backdropColor="black"
                                                hasBackdrop={true}
                                                isVisible={this.state.isModalVisible1}
                                                // transparent={true}
                                                position='absolute'
                                                onBackdropPress={() => this.hideSettingsModal()}
                                            >
                                                <View style={styles.modalMainView}>
                                                    <TouchableOpacity style={styles.modalSubView} onPress={() => this.editTask(this.state.taskSettings)}>
                                                        <Image
                                                            source={require('../../../assets/settings.png')}
                                                            style={styles.add}
                                                        />
                                                        <Text style={styles.textInModal}>Edit</Text>
                                                    </TouchableOpacity>

                                                    <TouchableOpacity style={styles.modalSubView} onPress={() => this.confirmDelete(this.state.taskSettings)}>
                                                        <Image
                                                            source={require('../../../assets/delete.png')}
                                                            style={styles.add}
                                                        />
                                                        <Text style={styles.textInModal}>Delete</Text>
                                                    </TouchableOpacity>


                                                    <View style={styles.modalSubView}>
                                                        <View style={styles.checkBoxView}>
                                                            <CheckBox
                                                                onPress={() => { this.completeTask(this.state.taskSettings) }}
                                                                checked={this.state.completed}
                                                                style={styles.add}
                                                            />
                                                        </View>
                                                        <View>
                                                            <Text style={styles.textInModal}>Completed</Text>
                                                        </View>
                                                    </View>
                                                    <TouchableOpacity style={styles.modalSubView} onPress={() => this.pauseTask(this.state.taskSettings)
                                                    }>
                                                        {this.state.taskStauts === 'paused'
                                                            ?
                                                            <Image
                                                                source={require('../../../assets/bluePause.png')}
                                                                style={styles.add}
                                                            />
                                                            :
                                                            <Image
                                                                source={require('../../../assets/grayPause.png')}
                                                                style={styles.add}
                                                            />
                                                        }

                                                        <Text style={styles.textInModal}>Pause</Text>

                                                    </TouchableOpacity>
                                                </View>


                                            </Modal>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                        ))
                    }

                    <View style={styles.headerview}>
                        <View style={styles.subview}>

                        </View>
                        <View style={styles.subview1}>
                            <TouchableOpacity
                                activeOpacity={10}
                                onPress={this.heloo
                                }>

                                <Text style={styles.doubleTabTxt}> {"Double tap the task and it will \n be mark done"}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.margin}>

                        <TouchableOpacity onPress={() => this.goToAddNewTask()}>
                            <View style={styles.addImgView}>
                                <Image
                                    source={require('../../../assets/add.png')}
                                    style={styles.image}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </Container >
        )
    }
}

