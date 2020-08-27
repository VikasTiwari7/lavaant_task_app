import { Dimensions, StyleSheet } from 'react-native';
const window = Dimensions.get('window');
import * as colors from '../../constants/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP } from '../../utility/index';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  textInputView: {
    flex: 1,
    borderBottomColor: colors.whiteColor,
    borderBottomWidth: 1,
  },
  linkedText: {
    color: colors.whiteColor,
    fontSize: 17,
    textDecorationLine: 'underline',
  },
  logo: {
    // backgroundColor:'red',
    width: wp("55%"),
    height: hp("30%")
  },
  txtInput: {
    fontSize: wp('4%'),
    color: colors.whiteColor,
  },
  formView: {
    marginTop: hp('4%'),
    paddingLeft: 40,
    paddingRight: 40
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: hp('5%'),
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp("3%"),
  },

  LoginBtn: {
    height: 50,
    backgroundColor: colors.whiteColor,
    marginTop: hp('3%'),
    borderRadius: 30,
    borderColor: colors.primaryColor,
    elevation: 10,
    shadowColor: colors.blackColor,
    shadowOpacity: 0.7,
    shadowRadius: 5,
    shadowOffset: {
      width: 0, height: 2
    },
  },

  AJ: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  LoginBtnTxt: {
    color: colors.primaryColor,
    fontSize: wp('5%'),
    textAlign: 'center',
    fontWeight: 'bold',
  },

  FbBtn: {
    height: 50,
    marginBottom: 10,
    backgroundColor: colors.primaryColor,
    borderRadius: 30,
    elevation: 10,
    shadowColor: colors.blackColor,
    shadowOpacity: 0.7,
    shadowRadius: 5,
    shadowOffset: {
      width: 0, height: 2
    },
  },

  LoginBtnTxt2: {
    color: colors.whiteColor,
    fontSize: wp('4%'),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  linkView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  bottomView: {
    marginTop: hp('1%'),
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: heightPercentageToDP('2%'),
    flexDirection: 'column',
  },
  icon: {
    width: 22,
    height: 22,
    marginRight: 10,
    marginTop: 5,
  },
  orTxt: {
    color: colors.whiteColor,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10
  },
  linkedAccText: {
    color: colors.whiteColor,
    fontSize: wp('4%'),
  },
  linkedText: {
    color: colors.whiteColor,
    fontSize: wp('4%'),
    textDecorationLine: 'underline',
  },
  forgotPasswordText: {
    color: colors.whiteColor,
    fontSize: wp('4%'),
    alignSelf: 'flex-end',
    textDecorationLine: 'underline'
  },
});



export default styles;
