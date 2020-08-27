import { StyleSheet, Platform } from 'react-native';
import * as colors from '../../constants/colors';
import { heightPercentageToDP, widthPercentageToDP } from '../../utility';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
 
  modalSubView: {
    flexDirection: "row",
  },
  checkBoxView: {
    marginLeft:-6,
    marginRight:"6%"
  },
  logo: {
    width: 200,
    height: 180,
  },
  formView: { paddingLeft: 50, paddingRight: 50 },
  logoContainer: {
    alignItems: 'center',
    marginTop: heightPercentageToDP('4%'),
  },

  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: heightPercentageToDP("3%"),
  },
  txtInput: {
    ...Platform.select({
      ios: {
        fontSize: widthPercentageToDP('3.5%'),

      },
      android: {
        fontSize: widthPercentageToDP('4%'),

      }

    }),
    color: colors.whiteColor,

  },
  txtInputView: {
    flex: 1,
    borderBottomColor: colors.whiteColor,
    borderBottomWidth: 1,
  },
  LoginBtn: {
    height: 45,
    backgroundColor: colors.whiteColor,
    marginTop: 10,
    borderRadius: 30,
    borderColor: colors.primaryColor,
    elevation: 10,
  },
  AJ: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  LoginBtnTxt: {
    color: colors.primaryColor,
    fontSize: widthPercentageToDP('4%'),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  LoginBtn2: {
    height: 50,
    backgroundColor: colors.primaryColor,
    borderRadius: 30,
    elevation: 10,
  },
  linkedAccText: {
    color: colors.whiteColor,
    fontSize: widthPercentageToDP('4%'),
  },
  linkedText: {
    color: colors.whiteColor,
    fontSize: widthPercentageToDP('4%'),
    textDecorationLine: 'underline',
  },
  LoginBtnTxt2: {
    color: colors.whiteColor,
    fontSize: widthPercentageToDP('3.5%'),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  linkView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  bottomView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: heightPercentageToDP('2%'),
    marginTop: heightPercentageToDP('1%'),
    flexDirection: 'column'
  },
  tncView: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin:'2%',marginLeft:0
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
  }
});

export default styles;
