
'use strict';
import React, {Component} from 'react';


//libraries
/* import {Platform, StyleSheet,  View,Image,StatusBar,AsyncStorage} from 'react-native';
import {StyleProvider, Container, Header, Title, Content,
    Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base'; */
import {
    Platform,
    PermissionsAndroid,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Button,
    LayoutAnimation,
    Image,
    ScrollView,
    Animated,
    TextInput
} from 'react-native';
import PropTypes from 'prop-types';
import Voice from 'react-native-voice';
import _ from "lodash";

// Components
import Images from './Images';
import QueryInput from './QueryInput'

// Constants

// Redux

const itemHeight = 50;

const READY_STATUS = 0;
const VOICE_STATUS = 1;
const TEXT_STATUS = 2;

class AssignActionSheet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actionStatus: READY_STATUS,
            queryMessage:''
          
        };
        Voice.onSpeechStart = this.onSpeechStart.bind(this);
        Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
        Voice.onSpeechResults = this.onSpeechResults.bind(this);

    }
    componentWillUnmount() {
        Voice.destroy().then(Voice.removeAllListeners);
    }
    onSpeechStart = async(e) => {  
       // console.warn(e);
       try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'APP Record Audio Permission',
            message:
              'App needs access to your mic ' +
              'so you can take record audio.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the mic');
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.log(err);
      }
    };
    
    onSpeechRecognized(e) { 
      //  console.warn(e);      
    };
    
    onSpeechResults = async(e) => {
        try {
            await Voice.stop();
            this._onPress(READY_STATUS);
            let self = this;
            if(e.value && e.value.length > 0){
                this.setState({
                    queryMessage: e.value[0],
                },() =>{
                    self.onCallQuery(true)
                });
            }
        } catch (err) {
            console.warn(err);
        }
    }
    stopVoiceRecognition = async(e)  => {
        this.setState({
            actionStatus: READY_STATUS
        });
        try {
          await Voice.stop()
        } catch (err) {
          console.warn(err);
        }
    }
    startVoiceRecognition = async(e)  => {
        this.setState({
            queryMessage: '',
            actionStatus: VOICE_STATUS
        });
        try {
          await Voice.start('en-US');
        } catch (err) {
          console.warn(err);
        }
    }
    onCallQuery = (voiceQuery = true) =>{
        let {queryMessage} = this.state;
        let queryModel = {query : queryMessage}
        if(voiceQuery == true){
            queryModel =  _.extend(queryModel,{mode: 201})
        }
        this.props.callQuery(queryModel);
        setTimeout(() => this.setState({queryMessage: ''}), 200)
        //console.warn(queryMessage)
    }

    _onPress = (action) => {
        this.setState({ actionStatus:action })        
    }
   
    onQueryMessageChanged = (queryMessage) => {
        this.setState({queryMessage})
    }
    renderInitSheet = () =>{
        return(
            <View style={styles.initStatusView}>
                <TouchableOpacity onPress={this.startVoiceRecognition}>
                    {this._micButton()}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this._onPress(TEXT_STATUS)}>
                    {this._keyboardButton()}
                </TouchableOpacity>
            </View>
        )
    }

    renderVoiceSheet = () =>{
        return(
            <View style={styles.initStatusView}>
                <TouchableOpacity onPress={this.stopVoiceRecognition}>
                    {this._recordButton()}               
                </TouchableOpacity>
            </View>
        )
    }
    renderTextSheet = () =>{
        return(
            <View style={styles.queryInputViewStyle}>
                 <QueryInput 
                    onRightPress={this.startVoiceRecognition}
                    queryMessage={this.state.queryMessage}
                    onChangeText={this.onQueryMessageChanged}
                    onSubmitEditing = {() => {this.onCallQuery(false)}}
                />
            </View>
        )
    }
               

    _recordButton(){
        return(
            <View style={{
                width: itemHeight * 1.5,
                height: itemHeight ,
            }}>
                <Image source={Images.Google}  style = {{width: itemHeight * 1.5, height: itemHeight}} />
            </View>
        )
    }
  
    _micButton() {       
        return (
            <View style={{
                width: itemHeight,
                height: itemHeight,                   
            }}>
                <Image source={Images.mic_1394x1394  } style = {{width: itemHeight, height: itemHeight}}/>
            </View>
        );        
    }
    _keyboardButton() {       
        return (
            <View style={{
                width: itemHeight,
                height: itemHeight,                   
            }}>
                <Image source={Images.keyboard_686x800  } style = {{width: itemHeight, height: itemHeight}}/>
            </View>
        );        
    }

    render () {
        let {actionStatus} = this.state;
        return (
            <View style={styles.containerViewStyle}>
                {actionStatus == READY_STATUS ? this.renderInitSheet() : 
                    actionStatus == VOICE_STATUS ? this.renderVoiceSheet() : this.renderTextSheet()  } 
            </View>
        );
    }

}


AssignActionSheet.propTypes = {   
    callQuery: PropTypes.func.isRequired



}

AssignActionSheet.defaultProps = {
    callQuery:() =>{console.log("callQuery")},
}
export default AssignActionSheet

const styles = {
  
    containerViewStyle: {        
        flexDirection: 'column', 
        justifyContent: 'center'
    },
    initStatusView:{
        flex: 1,
        flexDirection: 'row',
        width: '50%',
        borderRadius: 5,
        borderWidth:1,
        borderColor: '#ececec',
        justifyContent:'space-around',
        alignSelf: 'center',
        
    },
    queryInputViewStyle:{
        flex: 1, 
        flexDirection: 'column', 
        justifyContent: 'center'
    }
    
};