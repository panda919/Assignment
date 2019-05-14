import React, {Component} from 'react';
import { View, Dimensions, TouchableOpacity,Image,Keyboard } from 'react-native';
import PropTypes from 'prop-types';

import { Icon, Input } from 'react-native-elements';

const { width } = Dimensions.get('window');
import Images from './Images';


class QueryInput extends Component {
    constructor(props) {
        super(props);
        this.state = {          
        };

    }
    render(){
        return (
            <View style={{flexDirection: 'row'}}>

                <Input 
                    containerStyle={{width: width - 80, marginRight: 8}}
                    inputStyle={{
                        color: '#212529', 
                        minHeight: 36,                        
                    }}
                    placeholder={'Your message'}
                    autoCapitalize='none'
                    autoCorrect={false}
                    selectionColor={'#212529'}
                    value={this.props.queryMessage}
                    onChangeText={this.props.onChangeText} 
                    onSubmitEditing = {this.props.onSubmitEditing}
                /> 
                <View style = {{marginLeft: 0}}>
                    {
                        this.props.queryMessage === "" 
                        ?
                            <TouchableOpacity  onPress={this.props.onRightPress}>
                                <View style={{
                                    width: 36,
                                    height: 36,                   
                                }}>
                                    <Image source={Images.mic_1394x1394  } style = {{width: 36, height: 36}}/>
                                </View>
                            </TouchableOpacity>
                        :
                            <TouchableOpacity  onPress={() => {
                                Keyboard.dismiss();
                                this.props.onSubmitEditing(this.props.queryMessage)}
                                }>
                                <View style={{
                                    width: 36,
                                    height: 36,                   
                                }}>
                                    <Image source={Images.submit  } style = {{width: 36, height: 36}}/>
                                </View>
                            </TouchableOpacity>
                    }
                    
                </View>
               
             
            </View>
        )
    }
     
    
}
QueryInput.propTypes = {   
    queryMessage: PropTypes.string.isRequired,
    onRightPress:PropTypes.func.isRequired,
    onChangeText:PropTypes.func.isRequired,
    onSubmitEditing:PropTypes.func.isRequired,
}
QueryInput.defaultProps = {
    queryMessage: "",
    onRightPress:() =>{console.log("onRightPress")},
    onChangeText:() =>{console.log("onChangeText")},
    onSubmitEditing:() =>{console.log("onSubmitEditing")},
}
export default  QueryInput