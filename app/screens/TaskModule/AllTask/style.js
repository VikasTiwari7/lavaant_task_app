import { StyleSheet } from 'react-native';
import * as colors from '../../../constants/colors';

const styles = StyleSheet.create({
    subHeaderView: {
        minHeight: 80,
        justifyContent: 'center',
        paddingLeft: '5%',
        backgroundColor: colors.primaryColor,
    },
    headerview: {
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    tabView: {
        flexDirection: 'row',
        height: 40,
    },
    dateText:
    {
        fontSize: 24,
        color: 'white',
        fontWeight: "bold"
    },
    layoutView:
    {
        width: '90%',
        height: 40,
        flexDirection: 'row',
    },
    tabRightImgView: {
        height: 40,
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    subview: {
        flexDirection: 'column',
        width: 90,
        justifyContent: 'center',
        borderColor: colors.blackColor,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderRadius: 1,
        elevation: 1,
    },
    subview1: {
        flexDirection: 'row',
        width: 390,
        padding: 20,
        borderColor: colors.blackColor,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderRadius: 1,
        elevation: 1,
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 40,

    },
    image1: {
        height: 15,
        width: 15,
    },
    image2: {
        height: 15,
        width: 15,
        margin: 5,
        marginLeft: 10
    },
    scrollButton: {
        height: 10,
        width: 5,

    },
    scrollButtonView: {
        width: 20,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    catagoryView: {
        alignSelf: 'center', marginTop: 10

    },
    borderWidth: {
        borderTopColor: colors.blackColor,
        borderTopWidth: 1
    },
    add: {
        height: 17,
        width: 17,
    },
    textInModal: {
        borderBottomColor: "grey",
        paddingLeft: 10
    },
    checkBoxView: {
        marginLeft: -10,
        marginHorizontal: 10
    },
    dateTxt: {
        color: colors.blackColor,
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: "center"
    },
    monthTxt: {
        color: colors.blackColor,
        fontSize: 14,
        textAlign: "center"
    },
    modalMainView: {
        width: 150,
        backgroundColor: "white",
        margin: 180,
        // elevation: 100,
        padding: '2%',
        borderRadius: 6
    },

    modalSubView: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "grey",
        padding: '2%',
        marginBottom: 10,
    },
    doubleTabTxt: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    addImgView: {
        justifyContent: 'center', alignSelf: 'center',
        ...Platform.select({
            ios: {
                elevation: 1,
                shadowColor: '#000',
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity: 0.5,
                shadowRadius: 6,
            },
        })
    },
    margin: { marginTop: 29 }
})

export default styles;