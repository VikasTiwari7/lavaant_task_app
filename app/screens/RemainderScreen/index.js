import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import styles from './style';
import {
  Container,
  Button,
  DatePicker,
  Switch,
} from 'native-base';
import SubHeader from '../../Components/SubHeader'
import MainHeader from '../../Components/MainHeader'
import { ScrollView } from 'react-native-gesture-handler';

export default class RemainderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TextInputValueHolder: '',
      time: '',
      isDatePickerVisible: false,
      componentDidMount() {
        this.state = { SwitchValue: false };
      }
    };
    this.state = { chosenDate: new Date() };
    this.setDate = this.setDate.bind(this);
  }

  showDatePicker = () => {
    this.setState({
      isDatePickerVisible: true,
    })
  };

  hideDatePicker = () => {
    this.setState({
      isDatePickerVisible: false
    })
  };

  handleConfirm = date => {

    var newDate = moment(date)
      .utcOffset('+05:30')
      .format('hh:mm:ss a');

    this.setState({ time: newDate });

    console.warn("A date has been picked: ", date);
    this.hideDatePicker();
  };
  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }

  render() {
    return (


      <Container>
        <MainHeader navigate={this.props.navigation} />
        <ScrollView>
          <SubHeader title='Edit Remainder' >
            <Image source={require('../../assets/delete_icon.png')}
              style={{ width: 20, height: 10, marginTop: 15 }} />
          </SubHeader>
          <View style={{
            borderWidth: 0.1, padding: 20
          }}>
            <View style={{
              flexDirection: "row", marginTop: '5%', justifyContent: "space-between",
            }}>

              <View style={{
                flexDirection: "row", flex: 1, marginTop: '1%', borderColor: 'black',
                borderBottomWidth: 1, justifyContent: "space-between"
              }}>
                <TextInput
                  require
                  placeholder=" ALARM"
                  placeholderTextColor="black"
                  bottomborder="black"
                  // onChangeText={(email) => this.setState({ email })}
                  style={styles.loginTxtInput}
                />

                <Switch
                  onValueChange={(value) => this.setState({ SwitchValue: value })}
                  value={this.state.SwitchValue}>
                </Switch>
              </View>
            </View>

            <View style={{ flexDirection: 'row', padding: 5 }}>
              <View style={{
                flexDirection: "row", flex: 1, borderColor: 'grey',
                borderBottomWidth: 1, justifyContent: "space-between"
              }}>

                <DatePicker
                  locale={"en"}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={"fade"}
                  androidMode={"default"}
                  placeHolderText="SELECT DATE"
                  textDecorationLine="underline"
                  textStyle={{ color: "green" }}
                  placeHolderTextStyle={{ color: "black" }}
                  onDateChange={this.setDate}
                  disabled={false}

                />

                <Image source={require('../../assets/dropdown.png')}
                  style={{ width: 20, height: 10, marginTop: 15 }} />
              </View>
            </View>

            <View style={{
              flexDirection: 'row', padding: 10, borderColor: 'grey',
              justifyContent: "space-between", alignContent: 'center'
            }}>

              <Image source={require('../../assets/clockc.png')}
                style={{ width: 20, height: 20, marginTop: '5%', }} />

              <View style={{
                flexDirection: "row", flex: 1, borderColor: 'grey',
                borderBottomWidth: 1, justifyContent: "space-between"
              }}>


                <Button style={{ height: 30, width: "90%" }}

                  transparent light title="Show Date Picker"
                  onPress={this.showDatePicker}

                >
                  {/* <Text > SELECT  TIME
              {this.state.time}</Text>   */}


                  <TextInput
                    style={{ height: 40 }}
                    placeholder="SELECT TIME"
                    onChangeText={(text) => this.setState({ text })}
                    value={this.state.time}
                  />
                </Button>
                <DateTimePickerModal
                  isVisible={this.state.isDatePickerVisible}
                  mode="time"
                  onConfirm={this.handleConfirm}
                  onCancel={this.hideDatePicker}

                />

                <Image source={require('../../assets/dropdown.png')}
                  style={{ width: 20, height: 10, marginTop: 20 }} />
              </View>
            </View>

            <View style={{ flexDirection: "row", padding: 10, paddingTop: 5 }}>
              <Image source={require('../../assets/description.png')}
                style={{ width: 20, height: 23, marginTop: 20 }} />
              <TextInput
                style={{ height: 40 }}
                placeholder="DISCRIPTION"
                underlineColorAndroid="black"
                placeholderTextColor=" Black"
                style={styles.loginTxtInput}
              // onChangeText={(text) => this.setState({text})}
              // value={this.state.text}
              />

            </View>

          </View>

          <View>
            <TouchableOpacity style={[styles.LoginBtn2, styles.AJ]}
              onPress={() => this.props.navigation.navigate('NewOrder')}>
              <Text style={styles.LoginBtnTxt2}>UPDATE REMAINDER</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Container>

    );
  }
}