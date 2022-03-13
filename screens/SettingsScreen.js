import React from 'react';
import { SettingsComponent } from '../components/SettingsComponent';
import {  Image,  StatusBar, Text, TextInput, View, Animated} from 'react-native';

import { Button } from 'react-native-elements'
import {withNavigation} from 'react-navigation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import ModalSelector from 'react-native-modal-selector';

import {settingStyles} from '../styles/SettingsStyle';
import {formsStyles} from '../styles/FormStyles';
import {buttonStyles} from '../styles/ButtonStyles';

import Configuration from '../config/Configuration';
import FormFieldResponseComponent from '../components/shared/FormFieldResponseComponent';
import DropDownModalComponent from '../components/shared/DropDownModalComponent';

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

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


setSequenceValue(itemValue) {
  this.setState({sequence: itemValue});
}


setSettings(data) {
  return fetch(Configuration.apiUrl,{
    method: 'POST',
    headers: {
      Accept: 'application/text',
      'Content-Type': 'application/text',
    },
    body: data
  });
}


onSubmit(data) {
  var sequence = this.state.sequence;
  
  var data= "{"+sequence+" 001 001}"
  console.log(data);
  this.setSettings(data);
}

goBack(){
  const screen = NavigationActions.navigate({routeName: "ScanList"})
  this.props.navigation.dispatch(screen);
}


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
    return (<View style={settingStyles.container}>
              <KeyboardAwareScrollView enableOnAndroid={true} style={settingStyles.scrollViewContainer}>
                        <StatusBar barStyle="dark-content" hidden={false}/>
                        <View style={settingStyles.formContainer}>

                            <Image source={require('../assets/images/icon_logo.png')} resizeMode={"contain"} style={settingStyles.logo}/>

                             <View style={settingStyles.formContentContainer}>
                                {this.props.settingError !== undefined && this.props.settingError !== null &&
                                   <FormFieldResponseComponent shouldDisplay={this.props.isSettingFailed} isError={true} message={settingErrorMessage} />
                                }
                                

                                <View style={formsStyles.formFieldContainer}>
                                        <ModalSelector
                                            data={this.state.sequenceList}
                                            initValue={this.initValue}
                                            keyExtractor={item => item}
                                            labelExtractor={item => item}
                                            cancelText={"Cancel"}
                                            ref={ input => this.sequenceInput = input}
                                            onChange={(option)=>{ this.setState({sequence: option})}}
                                            style={formsStyles.selector}
                                            selectStyle={formsStyles.selectStyle}
                                            selectTextStyle={formsStyles.selectTextStyle(true)}
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

    </View>);
  }
}

export default SettingsScreen;
