import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { Container, Picker } from 'native-base';
import Loader from '../../Components/Loader';
import ImagePicker from 'react-native-image-picker';
import styles from './style';
import MainHeader from '../../Components/MainHeader'
import * as Utility from '../../utility/index';
import * as Url from '../../constants/urls'
import * as Service from '../../api/services'
import DatePicker from 'react-native-datepicker'
import { TextInputMask } from 'react-native-masked-text'

export default class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      profilePic: {},
      pic: "https://cdn3.iconfinder.com/data/icons/social-messaging-productivity-6/128/profile-male-circle2-512.png",
      firstName: '',
      lastName: '',
      address: '',
      mobileNo: '',
      dob: '',
      query: '',
      country: '',
      anniversary: '',
      companyName: '',
      companyAddress: '',
      companyPhone: '',
      isLoading: false,
      selectedGroup: '',
      customerGroups: [],
      email: '',
      alternateMobileNo: '',
      role: 'customer'
    };
    this.getRole()
  }
  getRole = async () => {
    let role = await Utility.getFromLocalStorge('role')
    this.setState({
      role: role
    })
    this.getUser()
  }

  getUser = async () => {
    let token = await Utility.getFromLocalStorge('token')
    id = await Utility.getFromLocalStorge('userId')
    if (id && token) {
      try {
        await this.setState({
          isLoading: true
        })
        let res = await Service.get(Url.GET_USER_URL + `${id}`, token)
        let user = res.data
        await this.setState({
          isLoading: false
        })
        if (user) {
          await this.setState({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            address: user.address || '',
            mobileNo: user.mobileNo,
            selectedGroup: user.customerGroup && user.customerGroup.id,
            alternateMobileNo: user.alternateMobileNo,
            dob: user.dob || '',
            pic: user.profilePic,
            country: user.country || '',
            anniversary: user.otherInformation ? user.otherInformation.anniversary : '',
            companyName: user.workDetails ? user.workDetails.companyName : '',
            companyAddress: user.workDetails ? user.workDetails.companyAddress : '',
            companyPhone: user.workDetails ? user.workDetails.companyPhone : ''
          })
          global.user = res.data
          console.log('useruseruseruseruser',global.user)
          await Utility.setInLocalStorge('user', JSON.stringify(global.user))
        }
        else {
          this.setState({
            isLoading: false
          })
          Alert.alert('', 'Something Went Wrong')
        }
      } catch (err) {
        console.log("catchErr", err)
        this.setState({
          isLoading: false
        })
      }
    }
    else {
      this.setState({
        isLoading: false
      })
      Alert.alert('', 'Something Went Wrong')
    }
  };

  update = async () => {
    if (Utility.isFieldEmpty(this.state.firstName && this.state.address
      && this.state.country && this.state.dob
      && this.state.anniversary && this.state.mobileNo
      && this.state.companyName && this.state.companyPhone
      && this.state.companyAddress)) {
      Alert.alert("", "Please enter all the fields")
      return
    }

      try {
        this.setState({
          isLoading: true
        })
        let token = await Utility.getFromLocalStorge('token')
        let body = {}
        if (token) {
          if (this.state.role === 'vendor') {
            body = {
              firstName: this.state.firstName,
              email: this.state.email,
              address: this.state.address || '',
              mobileNo: this.mobileNo.getRawValue(),
              alternateMobileNo: this.alternateMobileNo.getRawValue(),
              workDetails: {
                companyName: this.state.companyName || '',
                companyAddress: this.state.companyAddress || '',
                companyPhone: this.companyPhone.getRawValue() || '',
              }
            }
          } else {
            body = {
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              address: this.state.address || '',
              mobileNo: this.mobileNo.getRawValue(),
              dob: this.state.dob || '',
              country: this.state.country || '',
              anniversary: this.state.anniversary || '',
              workDetails: {
                companyName: this.state.companyName || '',
                companyAddress: this.state.companyAddress || '',
                companyPhone: this.companyPhone.getRawValue() || '',
              }
            }
          }

          const res = await Service.put(Url.UPDATE_USER_URL + this.state.id, token, body)
          if (res) {
            this.setState({
              isLoading: false
            })
            global.user = res.data
            Utility.setInLocalStorge('user', JSON.stringify(global.user))
            this.props.navigation.navigate('tab2')
          }
          else {
            this.setState({
              isLoading: false
            })
            Alert.alert('', 'Something Went Wrong')
          }
        } else {
          this.setState({
            isLoading: false
          })
          Alert.alert('', 'Something Went Wrong')
        }
      } catch (err) {
        console.log('err', err)
        Alert.alert('', err.message)
        this.setState({
          isLoading: false
        })
      }
  };

  updateProfilePic = async (file) => {
    var formdata = new FormData();

    formdata.append('file', {
      uri: file.uri,
      name: file.fileName,
      type: 'image/jpg'
    });
    const token = await Utility.getFromLocalStorge('token');
    let userId = await Utility.getFromLocalStorge('userId');
    if (token !== null) {
      console.log('token  found')
    } else {
      console.log('token not found', token)
    }
    // // for loader
    try {
      this.setState({
        isLoading: true
      })

      let res = await Service.upLoad(`${Url.UPLOADIMAGE_URL}user/${userId}`, token, formdata)
      console.log('upload Image response.....', res)
      if (res) {
        this.setState({
          isLoading: false
        })

        console.log('profile pic res', res.data)
        this.setState({
          isLoading: false,
          pic: res.data.profilePic,
        })
        global.user = res.data
        Utility.setInLocalStorge('user', JSON.stringify(global.user))
        Alert.alert('', "ProfilePic Uploaded Successfully")

      }
      else {
        this.setState({
          isLoading: false
        })
        Alert.alert("Something went wrong")
      }
    }
    catch (err) {
      this.setState({
        isLoading: false
      })
      console.log('error in catch', err)
      Alert.alert(err.message)
    }
  };

  changeProfilePic() {
    console.log('changeProfilePic::');
    try {
      ImagePicker.showImagePicker(
        { title: 'Pick an Image', maxWidth: 200, maxHeight: 200, noData: true },
        (res) => {
          if (res.didCancel) {
            console.log('User cancelled!');
          } else if (res.error) {
            console.log('Error', res.error);
          } else {
            this.setState({
              pic: res.uri,
            });
            this.updateProfilePic(res);
          }
        },
      );
    } catch (err) {
      console.log('err', err)

    }
  };

  render() {
    return (
      <Container>
        <MainHeader navigate={this.props.navigation} />
        <ScrollView>
          <Loader isLoading={this.state.isLoading} />
          <View style={styles.drawerHeader}>
            <View style={styles.drawerImageView}>
              <TouchableOpacity onPress={() => this.changeProfilePic()}>
                <Image
                  style={styles.profilePic}
                  resizeMode='cover'
                  source={{ uri: this.state.pic }}
                />
                <Image
                  style={{
                    width: 130,
                    height: 130,
                    position: 'absolute',

                  }}
                  resizeMode='cover'
                  source={require('../../assets/image_view.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          {this.state.role == 'customer' ?
            <View style={styles.pickerView}>
              <Text style={styles.customerGroup}>Customer Type</Text>

              <View style={styles.inputViewStyle}>
                <Picker
                  mode='dropdown'
                  selectedValue={this.state.selectedGroup}
                  itemTextStyle={{ textTransform: 'capitalize' }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ selectedGroup: itemValue })
                  }>
                  {this.state.customerGroups.map((item, key) =>
                    <Picker.Item key={key} label={item.name} value={item.id} />
                  )}
                </Picker>
              </View>
            </View> : null}

          <View>
            <View style={styles.txtHeaderBorder}>
              <Text style={styles.txtHeader}>Personal Details</Text>
            </View>
            <View style={styles.mainView}>
              <View style={styles.input}>
                <Image
                  source={require('../../assets/userGrey.png')}
                  style={styles.icon}
                />
                <View style={styles.inputViewStyle}>
                  <TextInput
                    require
                    placeholder="Name"
                    placeholderTextColor="#000"
                    onChangeText={(firstName) => this.setState({ firstName })}
                    value={this.state.firstName}
                    style={styles.txtInput}
                  />
                </View>
              </View>
                <View style={styles.input}>
                  <Image
                    source={require('../../assets/customers.png')}
                    style={styles.icon}
                  />
                  <View style={styles.inputViewStyle}>
                    <TextInput
                      require
                      placeholder="Email Address"
                      // underlineColorAndroid="#000"
                      placeholderTextColor="#000"
                      onChangeText={(email) => this.setState({ email })}
                      value={this.state.email}
                      style={styles.txtInput}
                    />
                  </View>

                </View> 
              <View style={styles.input}>
                <Image
                  source={require('../../assets/address.png')}
                  style={styles.icon}
                />
                <View style={styles.inputViewStyle}>
                  <TextInput
                    require
                    placeholder="Address"
                    // underlineColorAndroid="#000"
                    placeholderTextColor="#000"
                    onChangeText={(address) => this.setState({ address })}
                    value={this.state.address}
                    style={styles.txtInput}
                  />
                </View>

              </View>
              <View style={styles.input}>
                <Image
                  source={require('../../assets/phone_number.png')}
                  style={styles.icon}
                />
                <View style={styles.inputViewStyle}>
                  <TextInputMask
                    require
                    ref={(ref) => this.mobileNo = ref}
                    allowFontScaling={false} require
                    placeholder="Phone Number"
                    placeholderTextColor="#000"
                    type={'custom'}
                    options={{
                      mask: '9999999999'
                    }}
                    keyboardType='numeric'
                    onChangeText={
                      (mobileNo) => {
                        this.setState({ mobileNo })

                      }
                    }
                    value={this.state.mobileNo}
                    style={styles.txtInput}
                  />
                </View>
              </View>
              {this.state.role == 'vendor' ?
                <View style={styles.input}>
                  <Image
                    source={require('../../assets/phone_number.png')}
                    style={styles.icon}
                  />
                  <View style={styles.inputViewStyle}>
                    <TextInputMask
                      require
                      ref={(ref) => this.alternateMobileNo = ref}
                      allowFontScaling={false} require
                      placeholder="Alternate Number"
                      placeholderTextColor="#000"
                      type={'custom'}
                      options={{
                        mask: '9999999999'
                      }}
                      keyboardType='numeric'
                      onChangeText={
                        (alternateMobileNo) => {
                          this.setState({ alternateMobileNo })

                        }
                      }
                      value={this.state.alternateMobileNo}
                      style={styles.txtInput}
                    />
                  </View>
                </View> : null}
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <View style={styles.txtHeaderBorder}>
              <Text style={styles.txtHeader}>Work Details</Text>
            </View>
            <View style={styles.mainView}>
              <View style={styles.input}>
                <Image
                  source={require('../../assets/company_name.png')}
                  style={styles.icon}
                />
                <View style={styles.inputViewStyle}>
                  <TextInput
                    require
                    placeholder="Company Name"
                    placeholderTextColor="#000"
                    value={this.state.companyName}
                    onChangeText={(companyName) => this.setState({ companyName })}
                    style={styles.txtInput}
                  />
                </View>
              </View>
              <View style={styles.input}>
                <Image
                  source={require('../../assets/phone_number.png')}
                  style={styles.icon}
                />
                <View style={styles.inputViewStyle}>
                  <TextInputMask
                    require
                    ref={(ref) => this.companyPhone = ref}
                    allowFontScaling={false} require
                    placeholder="Company Phone"
                    placeholderTextColor="#000"
                    type={'custom'}
                    options={{
                      mask: '9999999999'
                    }}
                    keyboardType='numeric'
                    onChangeText={
                      (companyPhone) => {
                        this.setState({ companyPhone })
                      }
                    }
                    value={this.state.companyPhone}
                    style={styles.txtInput}
                  />
                </View>
              </View>

              <View style={styles.input}>
                <Image

                  source={require('../../assets/company_address.png')}
                  style={styles.icon}
                />
                <View style={styles.inputViewStyle}>
                  <TextInput
                    require
                    placeholder="Company Address"
                    // underlineColorAndroid="#000"
                    placeholderTextColor="#000"
                    value={this.state.companyAddress}
                    onChangeText={(companyAddress) => this.setState({ companyAddress })}
                    style={styles.txtInput}
                  />
                </View>
              </View>
              <View style={styles.btnView}>
                <TouchableOpacity
                  style={[styles.Btn, styles.shadow]}
                  onPress={() => this.update()}>
                  <Text style={styles.BtnTxt}>Complete Your Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

        </ScrollView>
      </Container>
    );
  }
}
