import { Dimensions, StyleSheet, Platform } from 'react-native';
const window = Dimensions.get('window');
import * as colors from '../../constants/colors';
const styles = StyleSheet.create({
  pickerView:{ 
   marginBottom: "5%", 
  },
  customerGroup:{
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: '3%'
  },
  dateInput: {
    borderWidth: 0,
  },
  dateText: {
    left: -28,
    color: '#000',
  },
  placeholderText: {
    left: -28,
    color: '#000',
  },
  btnTextConfirm: {
    color: colors.primaryColor,
    fontWeight:'bold',
    fontSize:18
 },
  txtHeader: {
    marginLeft: "3.5%",
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 30
  },
  txtHeaderBorder: {
    borderBottomColor: colors.borderColor,
    borderBottomWidth: 1,
    marginBottom: '2%'
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: '5%',
  },
  txtInput: {
    color: '#000',
    flex: 1,
  },
  BtnTxt: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  Btn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: colors.primaryColor,
    borderRadius: 30,
  },
  drawerHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 25,
  },
  inputViewStyle: {
    flex: 1,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    height: 40,
  },
  drawerImageView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    elevation: 10,
    shadowColor: colors.blackColor,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {
      width: 0, height: 1
    },
  },
  profilePic: {
    top: 5,
    left: 5,
    width: 120,
    height: 120,
    backgroundColor: 'white',
    borderRadius: 100,

  },
  mainView: { paddingLeft: '6.5%', paddingRight: '6.5%' },
  btnView: { marginBottom: '5%', marginTop: '8%' }
});
export default styles;
