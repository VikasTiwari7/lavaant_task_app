import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import styles from './style';
import * as Utility from '../../../utility/index';
import * as Url from '../../../constants/urls';
import * as Service from '../../../api/services';
import Loader from '../../../Components/Loader';
import { Container, Card, DatePicker } from 'native-base';
import SubHeader from '../../../Components/SubHeader';
import MainHeader from '../../../Components/MainHeader';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
import { NavigationActions, StackActions } from 'react-navigation';

export default class AddNewTaskScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      isDay: false,
      isdate: false,
      ismonth: false,
      selected: '',
      selectedCatogory: [],
      catogoryList: [],
      isLoading: false,
      selected2: '',
      uniqueid: '',
      input: 'aaa',
      email: '',
      password: '',
      task: '',
      taskId: '',
      displayDate: null,
    };

    this.state = { chosenDate: new Date() };
    this.setDate = this.setDate.bind(this);
  }
  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }
  showHide = value => {
    this.setState({
      selected: value,
    });
  };
  selectCatogory = item => {
    this.setState({
      selectedCatogory: item.name,
      uniqueid: item.id,
    });
  };
  navigate = value => {
    this.setState({
      selected: value,
    });
    this.props.navigation.navigate('CategoryScreen');
  };
  componentDidMount() {
    let editTask = this.props.navigation.state.params
      ? this.props.navigation.state.params.task
      : null;
    if (editTask) {
      this.setState({
        taskId: editTask.id,
        task: editTask.details,
        chosenDate: editTask.dueDate,
        displayDate: editTask.dueDate,
        selectedCatogory: editTask.category.name,
        uniqueid: editTask.category.id,
        selected2: editTask.reminder,
      });
    }
    this.GetCategory();
  }

  formatDate(date) {
    return moment(date).format('DD/MM/YYYY');
  }
  GetCategory = async () => {
    let token = await Utility.getFromLocalStorge('token');
    let userId = await Utility.getFromLocalStorge('userId');
    await this.setState({
      isLoading: true,
    });
    const res = await Service.get(
      Url.GET_TASKCATEGORIES_URL + `categoryOf=task&id=${userId}`,
      token,
    );
    var responsee = res;
    await this.setState({
      isLoading: false,
    });
    if (res.data) var responsee = res.data;
    console.log('add category ::::response', responsee);

    this.setState({
      isLoading: false,
      catogoryList: responsee,
    });
  };

  selectRemindingDate = value => {
    this.setState({
      selected2: value,
    });
  };

  submit = async () => {
    let token = await Utility.getFromLocalStorge('token');
    let update = false;
    if (
      this.state.task &&
      this.state.chosenDate.toString() &&
      this.state.uniqueid &&
      this.state.selected2
    ) {
      let body = {
        details: this.state.task,
        reminder: this.state.selected2,
        dueDate: this.state.chosenDate.toString(),
        categoryId: this.state.uniqueid,
      };

      console.log('task Body ::: ', body);
      await this.setState({
        isLoading: true,
      });
      let res = null;
      if (this.state.taskId) {
        update = true;
        console.log('updating task');
        res = await Service.put(
          `${Url.UPDATE_TASK_URL}${this.state.taskId}`,
          token,
          body,
        );
        console.log('update task response : ', res);
      } else {
        res = await Service.post(Url.CREATE_TASK_URL, token, body);
      }

      await this.setState({
        isLoading: false,
      });

      // if (res)
      //     var responsee = res
      // console.log("add category ::::response", responsee)

      // this.setState({
      //     isLoading: false,
      // })
      console.log('isSucess', res);
      let resMessage =
        update === true
          ? 'Task Updated Successfully'
          : 'task Created Successfully';

      if (res.isSuccess) {
        Alert.alert(
          '',
          resMessage,
          [{ text: 'OK', onPress: () => this.goToAllTask() }],
          { cancelable: false },
        );
      } else {
        Alert.alert(res.message);
      }
    } else {
      Alert.alert('please enter all the field');
    }
  };
  goToAllTask = () => {
    this.props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'AllTask' })],
      }),
    );
    this.props.navigation.navigate('BottomTab2');
  };
  render() {
    return (
      <Container>
        <MainHeader navigate={this.props.navigation} />
        <SubHeader title="ADD NEW TASK" />
        <Loader isLoading={this.state.isLoading} />
        <ScrollView>
          <View style={{ padding: '6%' }}>
            <Card style={{ minHeight: 200 }}>
              <TextInput
                style={{ paddingLeft: '2%', fontSize: 20 }}
                placeholder="Add Task Info"
                placeholderTextColor='grey'
                placeHolderTextStyle={styles.placeHolderText}
                multiline={true}
                textAlignVertical="top"
                onChangeText={task => this.setState({ task })}
                value={this.state.task}
              />
            </Card>

            <Card style={styles.datePickerView}>
              <DatePicker
                locale={'en'}
                minimumDate={new Date()}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={'fade'}
                date={this.state.chosenDate}
                androidMode={'default'}
                placeHolderText={
                  this.state.displayDate
                    ? this.formatDate(this.state.displayDate)
                    : 'Select Due Date'
                }
                textStyle={styles.dateTxt}
                placeHolderTextStyle={styles.placeHolderText}
                onDateChange={this.setDate}
                disabled={false}
              />
            </Card>

            <Card style={styles.datePickerView}>
              <TextInput
                editable={false}
                value={this.state.selectedCatogory}
                style={styles.addCategoryPlaceHolder}
                placeholderTextColor='grey'
                placeHolderTextStyle={styles.placeHolderText}
                placeholder="Choose/Add Category"
              />

              <TouchableOpacity onPress={() => { this.state.selected == 'Down' ? this.showHide('Up') : this.showHide('Down') } }>
                <View style={styles.upDownArrow}>
                  <Image
                    source = {
                      this.state.selected == 'Down' ?
                        require('../../../assets/up.png')
                        : require('../../../assets/left-arrow.png')
                    }
                    style={styles.dropDownImg2}
                  />
                </View>
              </TouchableOpacity>
            </Card>
            {this.state.selected == 'Down' ? (
              <View style={styles.chooseCatogryView}>
                <ScrollView>
                  {this.state.catogoryList.map((item, key) => (
                    <View key={key} style={styles.catogoryListView}>
                      <TouchableOpacity onPress={() => this.selectCatogory(item)}>
                        <Text style={{ fontSize: 17 }}>{item.name}</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
                <TouchableOpacity activeOpacity={1} onPress={this.navigate}>
                  <View style={styles.addCategoryView}>
                    <Text style={{ fontSize: 17 }}>Add New Category</Text>
                    <Image
                      source={require('../../../assets/add.png')}
                      style={styles.addCategory}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            ) : null}
            {/* </View> */}
          </View>
          <Text style={styles.dataTillRemindingTxt}>Set Reminder</Text>

          <ScrollView horizontal={true}>
            <View style={styles.checkview}>
              <View style={{ marginLeft: 20 }}>
                <View style={styles.checkBoxView}>
                  <View style={styles.flexDirectionView}>
                    <TouchableOpacity
                      onPress={() => this.selectRemindingDate('1day')}>
                      <View style={styles.tickView}>
                        {this.state.selected2 == '1day' ? (
                          <Image
                            source={require('../../../assets/accept.png')}
                            style={styles.imgAcceptView}
                          />
                        ) : null}
                      </View>
                    </TouchableOpacity>
                    <Text style={{ fontWeight: 'bold' }}> 1 day</Text>
                  </View>
                </View>
              </View>
              <View style={{ marginLeft: 20 }}>
                <View style={styles.checkBoxView}>
                  <View style={styles.flexDirectionView}>
                    <TouchableOpacity
                      onPress={() => this.selectRemindingDate('2day')}>
                      <View style={styles.tickView}>
                        {this.state.selected2 == '2day' ? (
                          <Image
                            source={require('../../../assets/accept.png')}
                            style={styles.imgAcceptView}
                          />
                        ) : null}
                      </View>
                    </TouchableOpacity>
                    <Text style={{ fontWeight: 'bold' }}> 2 day</Text>
                  </View>
                </View>
              </View>
              <View style={{ marginLeft: 20 }}>
                <View style={styles.checkBoxView}>
                  <View style={styles.flexDirectionView}>
                    <TouchableOpacity
                      onPress={() => this.selectRemindingDate('1week')}>
                      <View style={styles.tickView}>
                        {this.state.selected2 == '1week' ? (
                          <Image
                            source={require('../../../assets/accept.png')}
                            style={styles.imgAcceptView}
                          />
                        ) : null}
                      </View>
                    </TouchableOpacity>
                    <Text style={{ fontWeight: 'bold' }}> 1 week</Text>
                  </View>
                </View>
              </View>
              <View style={{ marginLeft: 20 }}>
                <View style={styles.checkBoxView}>
                  <View style={styles.flexDirectionView}>
                    <TouchableOpacity
                      onPress={() => this.selectRemindingDate('1month')}>
                      <View style={styles.tickView}>
                        {this.state.selected2 == '1month' ? (
                          <Image
                            source={require('../../../assets/accept.png')}
                            style={styles.imgAcceptView}
                          />
                        ) : null}
                      </View>
                    </TouchableOpacity>
                    <Text style={{ fontWeight: 'bold' }}> 1 month</Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
          <TouchableOpacity
            style={[styles.LoginBtn2, styles.AJ]}
            onPress={() => this.submit()}>
            <Text style={styles.LoginBtnTxt2}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </Container>
    );
  }
}
