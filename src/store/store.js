'use strict';

import { createStore, applyMiddleware } from 'redux';
import  ReduxThunk from 'redux-thunk';
import axios from 'axios';
import { multiClientMiddleware } from 'redux-axios-middleware';
import  * as globals  from '../utils/global';

import rootReducer from '../reducers';

const axiosMiddlewareOptions = {
  interceptors: {
      request: [
          (state, config) => {
            config.headers['Content-Type'] ='application/json';
            config.headers['Access-Control-Allow-Origin'] ='*'           
            return config
          }
      ],
      response: [
          (state, response) => {
              return response
          }
      ]
  }
}

const clients = {    
    default:{
        client: axios.create({
          baseURL: globals.ROOTURL,
          responseType: 'json'
        }),
        options:axiosMiddlewareOptions
    },
  
};
const store = createStore(rootReducer, {}, applyMiddleware(ReduxThunk, multiClientMiddleware(clients)))

export default store;