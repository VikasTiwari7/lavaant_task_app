import { Dimensions, StyleSheet, Platform } from 'react-native';
const window = Dimensions.get('window');
import * as colors from '../../constants/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../utility/index';
const styles = StyleSheet.create({
    subHeaderView: {
        minHeight: 80,
        justifyContent: 'center',
        paddingLeft: '5%',
        backgroundColor: colors.primaryColor
    },
    dateText:
    {
        fontSize: 24,
        color: colors.whiteColor,
        fontWeight: "bold"
    },
    taskImg: {
        width: 50,
        height: 70,
    },
    taskView: { marginTop: 10 },
    taskTxt: {
        color: '#2a9df4',
        fontSize: 20,
        fontWeight: "bold"
    },
    image: {
        width: 20,
        height: 20,
    },
    txtInput: {
        color: '#000',
        flex: 1,
    },
    mainview: {
        marginTop: -20,
        flex: 1, flexDirection: 'row',
    },

    subview: {
        width: wp('44%'),
        backgroundColor: colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        borderColor: colors.whiteColor,
        borderRadius: 10,
        borderWidth: 1,
        borderRadius: 10,
        height: 140, marginLeft: wp('4%'),marginBottom:'5%'

    },
    shadow: {
        elevation: 3,
        shadowColor: colors.blackColor,
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
            width: 0, height: 1
        },
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'pink'
    },
    Bottom: {
        ...Platform.select({
            android: {
                bottom: 3
            }
        })
    },
});

export default styles;
