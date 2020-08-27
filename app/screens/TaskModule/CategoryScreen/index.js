import React, {Component} from 'react';
import {View, Text, Image,TouchableOpacity,TextInput,Alert} from 'react-native';
import SubHeader from '../../../Components/SubHeader';
import MainHeader from '../../../Components/MainHeader';
import styles from './style';
import * as Utility from '../../../utility/index';
import * as Url from '../../../constants/urls';
import * as Service from '../../../api/services';
import Loader from '../../../Components/Loader';
import {NavigationActions, StackActions} from 'react-navigation';
import {Container} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';

export default class CategoryScreen extends Component {
  constructor(props) {
    super(props);
     this.state = {
        AddNewCategory: '',
        data: [],
        enable: false,
        Category: '',
        AddNewCategory: '',
        isLoading: false,
        catogoryList: [],
        id: '',
        selectedCatogory: [],
        showSave: false,
      };
  }

  componentDidMount() {
    this.GetCategory();
  }

  profile = () => {
    this.props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'CategoryScreen'})],
      }),
    );
    this.props.navigation.navigate('CategoryScreen');
  };

  // AddCategory = async () => {
  //   let token = await Utility.getFromLocalStorge('token');
  //   if (Utility.isFieldEmpty(this.state.AddNewCategory)) {
  //     Alert.alert('', 'Please enter Category');
  //     return;
  //   } else {
  //     let body = {
  //       name: this.state.AddNewCategory,
  //       categoryOf: 'task',
  //     };
  //     const res = await Service.post(
  //       Url.CREATE_TASKCATEGORIES_URL,
  //       token,
  //       body,
  //     );
  //     var responsee = res;

  //     if (res.message == 'Category Added Successfully') {
  //       Alert.alert(
  //         '',
  //         responsee.message,
  //         [{text: 'OK', onPress: () => this.profile()}],
  //         {cancelable: false},
  //       );
  //     } else {
  //       Alert.alert(responsee.message);
  //     }
  //   }
  // };

  // UpdateCategory = async () => {
  //   let route = await Utility.getFromLocalStorge('route');
  //   console.log('routeName.............', route);

  //   this.setState({
  //     showSave: false,
  //   });
  //   let token = await Utility.getFromLocalStorge('token');
  //   let body = {
  //     name: this.state.AddNewCategory,
  //   };
  //   if (this.state.AddNewCategory == '') {
  //     this.props.navigation.navigate('AddNewTaskScreen');
  //   }
  //   const res = await Service.put(
  //     Url.PUT_TASKCATEGORIES_URL + this.state.selectedCatogory,
  //     token,
  //     body,
  //   );
  //   if (res.message == 'Category Updated Successfully') {
  //     Alert.alert(
  //       '',
  //       res.message,
  //       [
  //         {
  //           text: 'OK',
  //           onPress: () => {
              
  //             if (route == 'AllTask') this.props.navigation.navigate('AllTaskScreen');
             
  //             else {
  //               this.props.navigation.navigate('AllTaskScreen');
  //             }
  //           },
  //         },
  //       ],
  //       {cancelable: false},
  //     );
  //   } else {
  //     Alert.alert(res.message);
  //   }
  // };

wholeadd=async()=>{
    let token = await Utility.getFromLocalStorge('token');
    console.log('alert messsage', token);
    if (Utility.isFieldEmpty(this.state.AddNewCategory)) {
        Alert.alert('', 'Please enter Category');
        return;
    } else {
        let body = {
            name: this.state.AddNewCategory,
            categoryOf: 'task',
        };
        await this.setState({
            isLoading: true,
        });
        const res = await Service.post(
            Url.CREATE_TASKCATEGORIES_URL,
            token,
            body,
        );
        await this.setState({
            isLoading: false,
        });
        console.log('alert mesge :::::', res.message);

        var responsee = res;

        if (res.message == 'Category Added Successfully') {
            Alert.alert(
                '',
                responsee.message,
                [{ text: 'OK', onPress: () => this.checkscreen() }],
                { cancelable: false },
            );
        } else {
            Alert.alert(responsee.message);
        }
    }
   
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
    await this.setState({
      isLoading: false,
    });
    var responsee = res;
    if (res.data) var responsee = res.data;
    this.setState({
      isLoading: false,
      catogoryList: responsee,
    });
    console.log('add category ::::response', this.state.catogoryList.name);
    responsee.forEach(item => {
      Utility.setInLocalStorge('categoryId', item.id);
      this.setState({id: item.id});
    });
  };
  selectCatogory = value => {
    this.setState({
      selectedCatogory: value,
      showSave: true,
    });
  };
  checkscreen = async() => {
    console.log("Value of the route is ",await Utility.getFromLocalStorge('route'));
    let route = await Utility.getFromLocalStorge('route');
    if (route == 'AllTask') {
        this.props.navigation.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'AllTask' })],
            }),
        );
        this.props.navigation.navigate('AllTask');
    }
    else {
    this.props.navigation.dispatch(
        StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'AddNewTaskScreen' })],
        }),
    );
    this.props.navigation.navigate('AddNewTaskScreen');
}

};
  render() {
    return (
      <Container>
        <MainHeader navigate={this.props.navigation} />
        <ScrollView>
          <Loader isLoading={this.state.isLoading} />
          <SubHeader title="ADD NEW CATEGORY" />
          {this.state.catogoryList.map((item, key) => (
            <View key={key} style={styles.catagoryMainView}>
              <TextInput
                editable={this.state.selectedCatogory === item.id}
                onChangeText={AddNewCategory => this.setState({AddNewCategory})}
                style={{fontSize: 18, color: 'black',textTransform:'capitalize'}}>
                {item.name}
              </TextInput>
              <View style={{flexDirection: 'row'}}>
                {this.state.showSave &&
                this.state.selectedCatogory === item.id ? (
                  <TouchableOpacity onPress={() => this.UpdateCategory()}>
                    <View style={styles.saveButton}>
                      <Text style={{color: 'white'}}>Save</Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => this.selectCatogory(item.id)}>
                    <Image
                      source={require('../../../assets/pencil.png')}
                      style={styles.scroll}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}

          <View style={{marginTop: 10}}>
            <View style={styles.add}>
              <TextInput
                style={{fontSize: 20 }}
                placeholder="Add New Category"
                placeholderTextColor='grey'
                placeHolderTextStyle={styles.placeHolderText}
                multiline={true}
                onChangeText={AddNewCategory => this.setState({AddNewCategory})}
              />
              <TouchableOpacity onPress={() => this.AddCategory()}>
                {/* <Image
                  source={require('../../../assets/button.png')}
                  style={styles.img}
                /> */}
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.LoginBtn2, styles.AJ]}
            onPress={() => this.wholeadd()}>
            <Text style={styles.LoginBtnTxt2}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </Container>
    );
  }
}
