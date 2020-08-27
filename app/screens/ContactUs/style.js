import { Dimensions, StyleSheet, Platform } from 'react-native';
const window = Dimensions.get('window');
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../utility/index';
import * as colors from '../../constants/colors';
const styles = StyleSheet.create({
    logoContainer: {
        alignItems: 'center',
      },
      logo: {
        width: wp("35%"),
        height: 105
      },
      txt: {
          marginTop:'15%',
        fontSize: wp('8%'),
        color: colors.primaryColor,
        textAlign:'center'
      },
});
export default styles;
