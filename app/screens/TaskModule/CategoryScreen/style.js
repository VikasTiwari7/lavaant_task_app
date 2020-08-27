import { Dimensions, StyleSheet } from 'react-native';
const window = Dimensions.get('window');
import * as colors from '../../../constants/colors';
import { heightPercentageToDP } from '../../../utility';

const styles = StyleSheet.create({
    add: {
        flexDirection: "row",
        width: '92%',
        marginTop: heightPercentageToDP('2.5%'),
        borderColor: "grey",
        borderWidth: 1,
        padding: heightPercentageToDP('1.5%'),
        justifyContent: "space-between",
        alignSelf: 'center',

    },
    placeHolderText: {
        color: "grey",
        fontSize: 20,
        textAlign: 'center',
    },
    catagoryMainView: {
        flexDirection: "row",
        borderBottomColor: "grey",
        borderBottomWidth: 1,
        padding: 15,
        justifyContent: 'space-between'
    },
    AJ: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    LoginBtn2: {
        width: 200,
        height: 50,
        marginLeft: '25%',
        backgroundColor: colors.primaryColor,
        marginTop: 100,
        borderRadius: 4,
        elevation: 10,
        marginBottom: 20
    },

    LoginBtnTxt2: {
        color: colors.whiteColor,
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    img: {
        height: 30,
        width: 70,
    },
    scroll: {
        height: 24,
        width: 24,
        marginTop: '4%'

    },
    saveButton: {
        width: 50,
        height: 30,
        backgroundColor: colors.primaryColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },

});




export default styles;