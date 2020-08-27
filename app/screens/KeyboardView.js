import React, { Component } from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
export default class KeyboardView extends Component {
    render() {
        if (Platform.OS == 'android') {
            return <View style={this.props.style}>{this.props.children}</View>;
        } else {
            return (
                <KeyboardAvoidingView
                    behavior={this.props.behavior}
                    style={this.props.style}>
                    {this.props.children}
                </KeyboardAvoidingView>
            );
        }
    }
}
