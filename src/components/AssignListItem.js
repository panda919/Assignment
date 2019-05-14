
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
export default class AssignListItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            scaleValue: new Animated.Value(0)
        }
    }

    componentDidMount() {
        Animated.timing(this.state.scaleValue, {
            toValue: 1,
            duration : 600,
            delay: this.props.index * 500
        }).start();
    }

    render() {
        return (
            <Animated.View style={{ opacity: this.state.scaleValue }}>
                { this.props.children }
            </Animated.View>
        );
    }
}