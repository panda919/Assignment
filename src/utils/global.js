'use strict';
import {AsyncStorage,Dimensions,StyleSheet,Platform} from 'react-native';
import _ from "lodash";

//=================Constant Value=======================================
export const STATUS_BAR_HIDDEN = true;
export const STATUS_BAR_SHOWN = false;
export const DATE_FORMAT = 'DD MMM YYYY';

export const InputBorderRadius = 10;

export const ROOTURL = "https://stage-nk.koshex.com/";



export const PROFILE_PHOTO_SIZE = 100;

const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

//=================Constant Value End=======================================

//=================Color Value=======================================

export const DARK_GRAY_COLOR = '#5c5c5c';
export const LIGHT_GRAY_COLOR = '#e9e9e9';
export const MIDDLE_GRAY_COLOR = '#707070';



export const PERFECT_BLACk_COLOR = '#000000';
export const PERFECT_WHITE_COLOR = '#FFFFFF';
export const WHITE_COLOR = '#f4f4f5';


export const GREEN_COLOR = '#6EAE0D';
export const STRONG_GREEN_COLOR = '#22A86C';
export const YELLOW_COLOR = '#F3CF98';
export const BLUE_COLOR = '#3C51AA';
export const PINK_COLOR = '#FFC0CB';



export const statusBarColor = MIDDLE_GRAY_COLOR;
export const AppBackGroundColor = "#F8A126";
export const fbButtonColor = "#3C5193";
export const googleButtonColor = "#DA4733";
export const InputBorderColor = "#FE6662";
export const InputTagBorderColor = "#FCA427";
export const InputGradientStartColor = "#FE6662";
export const InputGradientEndColor = "#FCA427";


export const InputGradientColors = [InputGradientStartColor,InputGradientEndColor];

//====================Color Value End==========================================

//=======================Font Value=======================================
export const ICON_SIZE = 24

export const TOP_FONT_SIZE = 40 //31.99
export const BIGGER_FONT_SIZE = 31 //31.99
export const BIG_FONT_SIZE = 28 //28.79
export const NORMAL_FONT_SIZE = 23 //23.03
export const SMALL_FONT_SIZE = 15 //15.36
export const SMALLER_FONT_SIZE = 11 //11.52

export const styles = StyleSheet.create({
    DFontFamily: {
        fontFamily: 'Comfortaa-regular'
    },

    LinearGradientStyle: {
        borderRadius: InputBorderRadius,   
        width: '70%',    
    },   
    LinearGradientItemStyle: {
        borderRadius: InputBorderRadius,   
        width: '100%',    
    },    
    ChildViewStyle:{     
        borderWidth: 1, 
        borderColor: InputBorderColor,
      //  width: '100%',
        borderRadius: InputBorderRadius,
        elevation:0,        
    
    },


});
//====================Font Value End==========================================

//==========const screen value=================
export const DESIGN_WIDTH = 375
export const DESIGN_HEIGHT = 812
export const DEVICE_WIDTH = Dimensions.get('window').width;
export const DEVICE_HEIGHT = Dimensions.get('window').height;
export const globalPaddingHorVal = 15;
export const globalMaxPaddingHorVal = 50;

export const globalPaddingVerVal = 25;

export function getDeviceWidth (width) {
  return Math.round(width * DEVICE_WIDTH / DESIGN_WIDTH);
}
export function getDeviceHeight (height) {
  return Math.round(height * DEVICE_HEIGHT / DESIGN_HEIGHT);
}
//=======const screen value end===================

//==========global storage function =================
export const kStorageUser = 'kStorageUser';
export const getUserStorage = () => {
    return AsyncStorage.getItem(kStorageUser)
        .then((userData) => {
            if (userData) {
                return JSON.parse(userData);
            } else {
                return {};
            }
        })
        .catch(error => {            
        });
};
export const setUserStorage = (userData) => {
    AsyncStorage.setItem(kStorageUser, JSON.stringify(userData));
};

export const changedKeys =(originObj, updateObj) => {
    var keys = _.union(_.keys(originObj), _.keys(updateObj));
    return _.filter(keys, (key) => {return origin[key] !== o2[updateObj];})
};
//=======end===================
//============================Global Function=====================================
export const delayPromise = delay => {
    return new Promise(function(resolve) {
      setTimeout(resolve, delay);
    });
};
export const validateEmail = (text) => {
    //console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(reg.test(text) === false)
    {          
        return false;
    }
    else {    
        return true;     
    }
}

//=========================End========================================