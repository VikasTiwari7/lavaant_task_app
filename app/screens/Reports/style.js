import { StyleSheet } from 'react-native';
import * as colors from '../../constants/colors';

const styles = StyleSheet.create({
    orderListDateView: { width: '35%' },
    orderListDate: {
        alignSelf: 'flex-end',
        color: colors.primaryColor,
        fontSize: 16,
        textTransform: 'capitalize'
    },
    textSize: { fontSize: 14, },
    addressListView: {
        flexDirection: 'row', marginTop: '1%'
    },
    orderMainView: { padding: '6%' },
    icon: {
        width: 22,
        height: 22,
        marginRight: '7%',
    }
});
export default styles;
