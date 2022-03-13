import React from 'react'
import PropTypes from 'prop-types';
import {  Image,  StatusBar, Text, TextInput, View, Animated} from 'react-native';

import { Button } from 'react-native-elements'
import {withNavigation} from 'react-navigation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import ModalSelector from 'react-native-modal-selector';

import {settingStyles} from '../styles/SettingsStyle';
import {formsStyles} from '../styles/FormStyles';
import {buttonStyles} from '../styles/ButtonStyles';

import FormFieldResponseComponent from './shared/FormFieldResponseComponent';

class SettingsComponent extends React.Component {


    constructor(props) {
        super(props);
        console.log("SettingsComponent::constructor")
        this.state = {
            sequenceList:['001','002','003','004','005','006'],
            sequence: null,
            sequence_valid: true,
            form_valid: true,
            login_failed: false,
            isFormSubmit: false,
            modalIsVisible: false,
            modalAnimatedValue: new Animated.Value(0)
        };
    }

    

    handlePressOpen = () => {
        if (this.state.modalIsVisible) {
            return;
        }
        this.setState({modalIsVisible: true}, () => {
            Animated.timing(this.state.modalAnimatedValue, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }).start();
        });
    };

    handlePressDone = () => {
        Animated.timing(this.state.modalAnimatedValue, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
        }).start(() => {
            this.setState({modalIsVisible: false});
        });
    };

    setSequenceValue(itemValue) {
        this.setState({sequence: itemValue});
    }


    validateRequired(field) {
        // if (field.length > 0) {
        //     return true;
        // }
        return true;
    }

    onSubmit () {
        // if(!this.formValidate()){
        //     return;
        // }
        console.log("formValidate");
       var data= "{001 001 001}"
       this.props.submit(data);
    }

    renderDropDownModal = () => {
        if (!this.state.modalIsVisible) {
            return null;
        }
        let {modalAnimatedValue, sequence, modalIsVisible} = this.state;
        return (
            <DropDownModalComponent
                items={this.props.sequenceList}
                selectedValue={sequence}
                animatedValue={modalAnimatedValue}
                display={modalIsVisible}
                onPressDone={() => this.handlePressDone()}
                onValueChange={this.setSequenceValue.bind(this)}/>
        )
    }


    goBack(){
        this.props.goBack();
    }
//The city must be greater than 7 characters, have at least one uppercase, lowercase, digit and speciial charecter
    render() {
        var initValue = "Select Sequence";
        const { 
        sequence,sequence_valid
     } = this.state;
        console.log("SettingComponent::render");
        var settingErrorMessage = "";
        if(this.props.settingError !== undefined && this.props.settingError !== null){
            settingErrorMessage = this.props.settingError.Message || this.props.settingError.City[0]
        }
        return (
            <View style={settingStyles.container}>
                <KeyboardAwareScrollView enableOnAndroid={true} style={settingStyles.scrollViewContainer}>
                        <StatusBar barStyle="dark-content" hidden={false}/>
                        <View style={settingStyles.formContainer}>

                            {/* <Image source={require('../../assets/images/icon_logo.png')} resizeMode={"contain"} style={requestStyles.logo}/> */}

                             <View style={settingStyles.formContentContainer}>
                                {this.props.settingError !== undefined && this.props.settingError !== null &&
                                   <FormFieldResponseComponent shouldDisplay={this.props.isSettingFailed} isError={true} message={settingErrorMessage} />
                                }
                                

                                <View style={formsStyles.formFieldContainer}>
                                        <ModalSelector
                                            data={this.state.sequenceList}
                                            initValue={initValue}
                                            keyExtractor={item => item}
                                            labelExtractor={item => item}
                                            cancelText={"Cancel"}
                                            ref={ input => this.sequenceInput = input}
                                            onChange={(option)=>{ 
                                                this.setState({sequence_valid: this.validateProvice(option)})
                                                this.setState({sequence: option})}}
                                            style={formsStyles.selector}
                                            selectStyle={formsStyles.selectStyle}
                                            selectTextStyle={formsStyles.selectTextStyle(this.validateProvice(sequence))}
                                        />
                                        <FormFieldResponseComponent shouldDisplay={!sequence_valid} isError={!sequence_valid} message={"Please select a sequence"} />
                                </View>
                          
                                <View style={buttonStyles.buttonContainer}>
                                    <Button
                                        title='SUBMIT'
                                        activeOpacity={1}
                                        underlayColor="transparent"
                                        borderRadius={50}
                                        onPress={this.onSubmit.bind(this)}
                                        loading={this.props.isSettingStarted}
                                        loadingProps={{size: 'large', color: "#FFFFFF"}}
                                        disabled={ !(this.state.form_valid )}
                                        buttonStyle={buttonStyles.button}
                                        titleStyle={buttonStyles.accentButtonText}
                                        containerViewStyle={{borderRadius: 50}}
                                        />
                                </View>
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
            </View>
        );
    }
}

SettingsComponent.propTypes = {
    isSettingStarted: PropTypes.bool.isRequired, 
    isSetting: PropTypes.bool.isRequired, 
    isSettingFailed: PropTypes.bool.isRequired, 
    settingError:PropTypes.object,
    submit:PropTypes.func.isRequired,
    goBack:PropTypes.func
};

export default (withNavigation(SettingsComponent));