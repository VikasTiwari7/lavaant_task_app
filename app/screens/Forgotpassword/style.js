import { Dimensions, StyleSheet } from 'react-native';
const window = Dimensions.get('window');
import * as colors from '../../constants/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../utility/index';

const styles = StyleSheet.create({
    colorWhite:{ color: colors.whiteColor, },
    wrapper: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    backButtonView: {
        justifyContent: 'center',
        paddingTop: '10%',
        paddingLeft: '4%'
    },
    logo: {
        width: wp("55%"),
        height: 210
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
    mainView: {
        marginTop: '5%',
        marginBottom: '3%'
    },
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp("3%"),
        marginTop: hp("3%")
    },
    icon: {
        width: 22,
        height: 22,
        marginRight: 10,
        marginTop: 5,
    },
    textInputView: {
        flex: 1,
        borderBottomColor: colors.whiteColor,
        borderBottomWidth: 1,
    },
    txtInput: {
        fontSize: wp('4%'),
        color: colors.whiteColor,
    },
    LoginBtn: {
        height: 50,
        backgroundColor:colors.whiteColor,
        marginTop: hp('3%'),
        borderRadius: 30,
        borderColor: colors.primaryColor,
        elevation: 10,
        shadowColor: colors.blackColor,
        shadowOpacity: 0.7,
        shadowRadius: 5,
        shadowOffset: {
            width: 0, height: 1
        },
    },
    AJ: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    forgotPasswordText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.whiteColor,
        textAlign: 'center'
    },
    LoginBtnTxt: {
        color: colors.primaryColor,
        fontSize: wp('5%'),
        textAlign: 'center',
        fontWeight: 'bold',
    },




});



export default styles;
