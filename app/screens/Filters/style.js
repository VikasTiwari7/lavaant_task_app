import { Dimensions, StyleSheet, Platform } from 'react-native';
const window = Dimensions.get('window');
import * as colors from '../../constants/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../utility/index';

const styles = StyleSheet.create({
    card: {
        width: '100%',
        borderRadius: 5,
        top: -30,
        marginBottom: '5%'
    },
    mainDateView: { padding: '5%' },
    mainView: { paddingLeft: '6%', paddingRight: '6%' },
    headings: {
        fontWeight: 'bold'
    },
    datesMainView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    checkBox: { marginLeft: 5, borderRadius: 1, },
    LoginBtnTxt2: {
        color: colors.whiteColor,
        fontSize: wp('4%'),
        textAlign: 'center',
        fontWeight: 'bold',
    },
    FbBtn: {
        height: 50,
        backgroundColor: colors.primaryColor,
        borderRadius: 30,
        elevation: 10,
        shadowColor: colors.blackColor,
        shadowOpacity: 0.7,
        shadowRadius: 5,
        shadowOffset: {
            width: 0, height: 2
        },
        marginBottom: '3%'
    },
    dateIndividualView: {
        width: '45%',
        marginTop: '2%'
    },
    inputViewStyle: {
        borderWidth: 1,
        height: 30,
        marginTop: '5%',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    AJ: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    category: {
        marginLeft: '5%', textTransform: 'capitalize',
        // ...Platform.select({
        //     ios: {
        //         height: 20
        //     }
        // })
    },
    dateInput: {
        borderWidth: 0,
    },
    dateText: {
        color: '#000',
    },
    placeholderText: {
        // left: -28,
        // color: '#000',
        // textAlign: 'center',
        // justifyContent: 'center',
        // alignSelf: 'center'
    },
    btnTextConfirm: {
        color: colors.primaryColor,
        fontWeight: 'bold',
        fontSize: 18
    },
});
export default styles;