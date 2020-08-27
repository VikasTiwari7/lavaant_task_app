import {Dimensions, StyleSheet} from 'react-native';
import * as colors from '../../constants/colors';

const styles = StyleSheet.create({
  loginTxtInput: {
    // backgroundColor: 'transparent',
    color: colors.whiteColor,
    flex: 1,
  },
  AJ: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '2.5%',
  },
  LoginBtn2: {
    width:300,
    height: 50,
    backgroundColor: colors.primaryColor,
    marginTop: 100,
    borderRadius: 30,
    elevation: 10,
  },
  LoginBtnTxt2: {
    color: colors.whiteColor,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});




export default styles;