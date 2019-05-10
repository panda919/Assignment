'use strict';
import { StyleSheet,Platform } from 'react-native';

import  * as globals  from '../../utils/global';

const styles = StyleSheet.create({
    container: {       
        backgroundColor: globals.PERFECT_WHITE_COLOR,       
    },
    content: {
        flex: 1,       
        width:globals.DEVICE_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
    },  
    transcript: {
        textAlign: 'center',
        color: '#B0171F',
        marginBottom: 1,
        top: '400%',
    },
    renderTypingViewStyle: {
        flexDirection: 'row', 
        marginLeft: 14, 
        marginRight: 14, 
        marginTop: 4, 
        marginBottom: 0, 
        paddingBottom: 0,
        height: 14
    },
    containerViewStyle: {
        backgroundColor: '#fff', 
        flex: 1
    },
    messageListViewStyle: {
        marginTop: 30,
       
        //backgroundColor:'green',     
       // transform: [{ scaleY: -1 }]
    },
    messageInputViewStyle: {
        flex: 1,
        width: '100%',
        paddingHorizontal: '5%',
        position: 'absolute',
        bottom:0,           
        marginBottom: 8, 
        
       
    }
 
});

export default styles