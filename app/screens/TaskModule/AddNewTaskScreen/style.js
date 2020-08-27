import { StyleSheet } from 'react-native';
import * as colors from '../../../constants/colors';
import { heightPercentageToDP } from '../../../utility';

const styles = StyleSheet.create({
    mainview: {
        flex: 1,
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: "space-around",

    },
    upDownArrow:{ paddingRight: '4%', justifyContent: 'center' },
    checkview: {
        marginTop: 14,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    datePickerView: {
  
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between',
    },
    dateTxt: {
        color: "grey",
        fontSize: 24,
    },
    placeHolderText: {
        color: "grey",
        fontSize: 20,
        textAlign: 'center',
    },
    dropDownImg2: {
        height: 17,
        width: 24,
        marginTop: 14
    },
    addCategory: {
        height: 21,
        width: 24,

    },
    addCategoryPlaceHolder: {
        padding:'2%',
        fontSize: 20,
        color: colors.blackColor,
    },
    chooseCatogryView: {
        paddingLeft: '4%',
        height: 220,
        marginBottom: 10
    },
    catogoryListView: {
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        paddingTop: 14,
        paddingBottom: 14,
        marginRight: '4%'
    },
    addCategoryView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopColor: 'grey',
        borderTopWidth: 1,
        paddingTop: 10,
        marginRight: '4%'
    },
    dataTillRemindingTxt: {
        textAlign: 'center',
        fontSize: 27,
        color: colors.blackColor,
    },
    checkBoxView: {
        padding: 10,
        width: 90,
        paddingTop: '2%',
        paddingLeft: '2%',
    },
    flexDirectionView: { flexDirection: 'row' },
    tickView: {
        height: 22,
        width: 20,
        elevation: 1,
        borderColor: colors.primaryColor,
        borderWidth: 1,
    },
    imgAcceptView: {
        height: "100%",
        width: "100%",
        backgroundColor: colors.primaryColor,
    },
    input: {
        width: 20,
        height: 30
    },
    AJ: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    LoginBtn2: {
        width: 200,
        height: 50,
        backgroundColor: colors.primaryColor,
        marginTop: heightPercentageToDP('10%'),
        borderRadius: 4,
        elevation: 10,
        marginBottom: heightPercentageToDP('5%'),
        alignSelf:'center'
    },

    LoginBtnTxt2: {
        color: colors.whiteColor,
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    arrow: {
        width: 20,
        height: 20,
        margin: 20,

    }
});




export default styles;