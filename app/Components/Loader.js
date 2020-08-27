import React, { Component } from 'react'
import Spinner from 'react-native-loading-spinner-overlay';
import * as colors from '../constants/colors';
import { StyleSheet } from 'react-native';
class Loader extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Spinner
            allowFontScaling={false}
                visible={this.props.isLoading}
                textContent={`Please Wait`}
                textStyle={styles.spinnerTextStyle}
                animation="slide"
                color={colors.headerColor}
                textStyle={{ color: "white", fontSize: 20 }}
            />
        )
    }

}

export default Loader
const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: colors.headerColor
    }
});