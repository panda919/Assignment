
'use strict';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';

//libraries
/* import {Platform, StyleSheet,  View,Image,StatusBar,AsyncStorage} from 'react-native';
import {StyleProvider, Container, Header, Title, Content,
    Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base'; */
import {
    StyleSheet,
    Text,
    View,
    Button,
    AppRegistry,
    } from 'react-native';
import PropTypes from 'prop-types';
import Voice from 'react-native-voice';
import Tts from 'react-native-tts';

// Components
import {Images} from '../../components';

// Styles
import styles from './style';
// Constants
import  * as globals  from '../../utils/global';
const time_peroid = 0

// Redux
import  {callQueryVoice,callQueryText}  from '../../reducers/assignReducer';

class Assignment extends Component {
    constructor(props) {
        super(props);
        this.state = {
          recognized: '',
          started: '',
          results: [],
        };
        this.onSpeak = this.onSpeak.bind(this);

    
        Voice.onSpeechStart = this.onSpeechStart.bind(this);
        Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
        Voice.onSpeechResults = this.onSpeechResults.bind(this);

    }

    componentWillUnmount() {
        Voice.destroy().then(Voice.removeAllListeners);
    }
    componentDidMount(){   
      this.props.callQueryText("how is gold doing today?")          
    }
    
    onSpeechStart(e) {       
        this.setState({
          started: '√',
        });
    };
    
    onSpeechRecognized(e) {
        this.setState({
          recognized: '√',
        });
    };
    
    onSpeechResults(e) {
      console.warn(e.value)
        this.onSpeak(e.value[0])
        this.setState({
          results: e.value,
        });
    }
    onSpeak = async(voiceText) =>{
        Tts.stop();
        Tts.speak(voiceText);
        console.warn(voiceText)
    }
    
    async _startRecognition(e) {
        this.setState({
          recognized: '',
          started: '',
          results: [],
        });
        try {
          await Voice.start('en-US');
        } catch (e) {
          console.error(e);
        }
    }
    
    render () {
        return (
          <View>
            <Text style={styles.transcript}>
                Transcript
            </Text>
            {this.state.results.map((result, index) => <Text key = {index} style={styles.transcript}> {result}</Text>
            )}
            <Button style={styles.transcript}
            onPress={this._startRecognition.bind(this)}
            title="Start"></Button>
          </View>
        );
    }
   /*  render() {
        return (
            <Container style = {styles.container}>
                <StatusBar hidden={globals.STATUS_BAR_HIDDEN} />
                <Content contentContainerStyle = {styles.content}>     
                <Text>{"Assignment"}</Text>          
                   
                </Content>
            </Container>
        );
    } */
}


Assignment.propTypes = {   
  callQueryVoice: PropTypes.func.isRequired,
  callQueryText: PropTypes.func.isRequired
}
function mapStateToProps(state) {
    return {
    }
}
const mapDispatchToProps = {
  callQueryVoice,
  callQueryText
};
export default connect(mapStateToProps, mapDispatchToProps)(Assignment)

