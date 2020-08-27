import { StyleSheet } from 'react-native';
import * as colors from '../../constants/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../utility/index';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    subHeading: { color: colors.whiteColor, textAlign: 'center', fontSize: 15 },
    logo: {
        width: wp("55%"),
        height: 210
    },
    backButtonView: {
        justifyContent: 'center',
        paddingTop: '10%',
        paddingLeft: '4%',
    },
    formView: {
        marginTop: hp('4%'),
        paddingLeft: 40,
        paddingRight: 40
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: hp('10%'),
    },
    mainView: {
        // marginTop: '5%',
        marginBottom: '3%'
    },
    emailVerificationHeading: {
        color: colors.whiteColor,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    paswordTextInputView: {
        marginTop: '10%',
        marginBottom: '5%',
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    paswordTextInput: {
        width: '20%',
        marginLeft: '3%'
    },
    TextInputstyles: {
        height: 50,
        borderColor: colors.whiteColor,
        borderWidth: 1,
        width: '80%',
        borderRadius: 5,
        textAlign: 'center',
        color: colors.whiteColor,
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

});



export default styles;
