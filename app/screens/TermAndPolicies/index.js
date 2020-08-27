import React, { Component } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native'
import styles from './style'
import { CheckBox } from 'native-base';
import Modal from 'react-native-modal';
import { WebView } from 'react-native-webview';
import * as Url from '../../constants/urls'

export default class TermAndPolicies extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
                <Modal backdropColor="black" backdropOpacity={.5} isVisible={this.props.isPolicyModal} transparent={true}>
                    <View style={styles.mainView}>
                        <View style={styles.webView}>
                            <WebView
                            scrollEnabled = {true}
                                source={{ uri: `${Url.TERM_AND_POLICIES}` }}
                                style={styles.webViewStyles}
                            />
                        </View>
                        <View style={styles.btnMainView}>
                            <TouchableOpacity style={[styles.agreeBtnView, styles.AJ]} onPress={()=>this.props.showHidePolicyModal('agree')}>
                                <Text style={styles.btnText}>Agree</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.cancelBtnView, styles.AJ]} onPress={()=>this.props.showHidePolicyModal('cancel')}>
                                <Text style={styles.btnText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
        )
    }
}
