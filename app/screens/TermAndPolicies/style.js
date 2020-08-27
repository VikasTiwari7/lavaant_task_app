import { StyleSheet } from 'react-native';
import * as colors from '../../constants/colors';
import { heightPercentageToDP } from '../../utility';

const styles = StyleSheet.create({
  wrapper:{
      flex:1
  },
    AJ: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainView:{ flex: 1, marginTop: heightPercentageToDP("3%"),backgroundColor: "#fff", borderRadius: 5 },
    webView:{ flex: 6, margin: "4%", borderColor: "#000", borderWidth: 1 },
    webViewStyles:{ marginTop: 5 },
    btnMainView:{ flex: 1, flexDirection: 'row' },
    agreeBtnView:{ backgroundColor: '#199bf1', height: 40, width: 80, marginLeft: 20, borderRadius: 5 },
    btnText:{ color: '#fff',textAlign:'center' },
    cancelBtnView:{ backgroundColor: '#b0b0b0', height: 40, width: 80, marginLeft: 20, borderRadius: 5 },
});




export default styles;