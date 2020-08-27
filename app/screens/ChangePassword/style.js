import { StyleSheet, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../utility/index';
import * as colors from '../../constants/colors';
const styles = StyleSheet.create({
    mainView: { marginTop: -35, marginRight: 20, marginLeft: 20 },
    btnView: {
        ...Platform.select({
            ios: {
                marginTop: hp('35%'),
            },
            android: {
                marginTop: hp('32%'),
            }
        }),
        marginBottom: 20
    },
    BtnTxt: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    cardTextView: { paddingLeft: 15, paddingRight: 15, marginTop: '3%', marginBottom: 60 },
    cardMainView: { width: '100%', justifyContent: 'center' },
    Btn: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: "100%",
        backgroundColor: colors.primaryColor,
        elevation: 7,
        borderRadius: 50
    },
    inputStyle: {
        flex: 1,
        borderBottomColor: '#000',
        borderBottomWidth: 1,
    },
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                marginTop: hp("3%"),
            }
        })
    },

    icon: {
        width: 25,
        height: 25,
        marginRight: '5%',
        marginTop: '3%',
    },

    txtInput: {
        color: '#000',
        flex: 1,
        marginTop: 15
    },
    shadow: {
        elevation: 10,
        shadowColor: colors.blackColor,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: {
            width: 0, height: 1
        },
    }
});
export default styles;
