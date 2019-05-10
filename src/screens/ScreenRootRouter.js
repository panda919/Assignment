'use strict';
import React, { Component } from "react";
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';


import Assignment from './Assignment';


const  ScreenRootRouter =  createStackNavigator(
    {
        Assignment: {screen: Assignment},
    }
    ,{
        initialRouteName:'Assignment',
        headerMode: 'none',    
        navigationOptions: {
            header: null,
        }
})
export default ScreenRootRouter
  
