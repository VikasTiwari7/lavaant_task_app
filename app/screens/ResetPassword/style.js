import { Dimensions, StyleSheet } from 'react-native';
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

    logo: {
        width: wp("55%"),
        height: 210
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
        marginTop: hp('10%'),
    },

    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp("3%"),

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
    resetPasswordHeading: {
        color: colors.whiteColor,
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center'
    },
    mainView: {
        marginTop: '5%',
        marginBottom: '5%'
    },
    LoginBtnTxt: {
        color: colors.primaryColor,
        fontSize: wp('5%'),
        textAlign: 'center',
        fontWeight: 'bold',
    },

});



export default styles;
