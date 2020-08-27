import React, {Component} from 'react';
import {ScrollView, Image, Text, View} from 'react-native';
import {Container, Card} from 'native-base';
import SubHeader from '../../Components/SubHeader';
import MainHeader from '../../Components/MainHeader';
import Loader from '../../Components/Loader';
import styles from './style';

export default class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  render() {
    return (
      <Container>
        <MainHeader navigate={this.props.navigation} />
        <ScrollView>
          <SubHeader title="Contact Us" />
          <Loader isLoading={this.state.isLoading} />
          {/* <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/logo.png')}
              style={styles.logo}
            />
          </View> */}
          <View>
              <Text style={styles.txt}>Please contact us on: support@lavaant.com</Text>
          </View>
        </ScrollView>
      </Container>
    );
  }
}
