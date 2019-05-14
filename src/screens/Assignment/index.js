
'use strict';
import React, {Component,Fragment} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';

//libraries
import {
    Platform,
    StyleSheet,
    View,
    FlatList,
    Image,
    ScrollView,
    Animated,
    TextInput
} from 'react-native';
import { Container, Header, Content ,Card, CardItem, Body, Text } from 'native-base';

import PropTypes from 'prop-types';
import Tts from 'react-native-tts';
import _ from "lodash";

// Components
import {Images , AssignActionSheet,AssignListItem} from '../../components';

// Styles
import styles from './style';
// Constants
import  * as globals  from '../../utils/global';
const time_peroid = 0

// Redux
import  {callQuery}  from '../../reducers/assignReducer';



class Assignment extends Component {
    constructor(props) {
        super(props);
        this.state = {           
        }; 
        
        Tts.getInitStatus().then(this.initTts);      

    }    
    componentDidMount(){
   /*      Tts.setDefaultRate(0.5);
        Tts.setDefaultPitch(1);
        Tts.setDefaultLanguage('en-IE'); */

    }
    componentDidUpdate(prevProps) {
        let {requesting,assignList} = this.props;
        if (!requesting && !!prevProps.requesting) {
            let voiceData = _.find(assignList,(assign) =>{
                let keys = Object.keys(assign)
                return _.includes(keys, "voice_msg");
            })
            if(!!voiceData && !!voiceData.voice_msg){
                this.onSpeak(voiceData.voice_msg)
            }
        }
    }
    initTts = async () => {
        const voices = await Tts.voices(); 
        //console.warn(voices)    

        if (voices && voices.length > 0) {
          try {
            await Tts.setDefaultLanguage(voices[0 ].language);
          } catch (err) {
            console.log(`setDefaultLanguage error `, err);
          }
          await Tts.setDefaultVoice(voices[0].id);         
        } 
    };
    onSpeak = async(voiceText) =>{
        Tts.stop();
        Tts.speak(voiceText);
    }
    renderAssignItem = (item) =>{
        return(
            <AssignListItem index={ item.index } >
                <Fragment>
                    {!! item.text ?    
                        <Card>
                            <CardItem>
                            <Body>
                                <Text>
                                    {item.text}
                                </Text>
                            </Body>
                            </CardItem>
                        </Card>
                        : null
                    }
                </Fragment>
            </AssignListItem>
            
           
        )
    }
    render () {
        let {callQuery,assignQuery,assignList} = this.props;
        assignList = _.orderBy(assignList, ['order'],['asc']);
        return (
            <Container style={styles.containerViewStyle}>              
                
                    <View style={styles.messageListViewStyle}>
                        <Text style = {{marginVertical: 15, textAlign: 'center'}}>
                            {assignQuery}
                        </Text>
                        <FlatList        
                            data={ assignList }    
                            renderItem={({ item }) =>this.renderAssignItem(item)}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator ={false}      
                            keyExtractor={(item, index) => index.toString()}
                        /> 

                        
                    </View>
                    <View style={styles.messageInputViewStyle}>
                    <AssignActionSheet
                        callQuery = {callQuery}
                        />
                    
                    </View>
                
            </Container>
        );
    }

}


Assignment.propTypes = {   
    callQuery: PropTypes.func.isRequired,
    assignList:PropTypes.array.isRequired,
    assignQuery:PropTypes.string.isRequired
 
}
function mapStateToProps(state) {
    return {
        assignList:state.Assignment.assignList,
        requesting:state.Assignment.requesting,
        assignQuery:state.Assignment.assignQuery,
    }
}
const mapDispatchToProps = {
    callQuery,
};
export default connect(mapStateToProps, mapDispatchToProps)(Assignment)

