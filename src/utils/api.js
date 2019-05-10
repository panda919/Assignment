'use strict';
import  * as globals  from './global';

import axios from "axios";
export const instance = axios.create({
    baseURL: globals.ROOTURL + 'mobileapi.php',
    headers: {
        'Content-Type': 'multipart/form-data',
        //'Access-Control-Allow-Origin': '*'
    }
});






