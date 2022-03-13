
import React from 'react';
import { Animated, Dimensions, Picker, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import PropTypes from 'prop-types';

import {colours} from '../../styles/Colors';

const { width: WindowWidth } = Dimensions.get('window');

const DropDownModalComponent = ({items, selectedValue, display, animatedValue, onPressDone, onValueChange}) => {

    const opacity = animatedValue;
    const translateY = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [300, 0],
    });

    function onPickerValueChange(item){
      onValueChange(item);
    }

    return (
      <View style={StyleSheet.absoluteFill} pointerEvents={display ? 'auto' : 'none'}>
        <TouchableWithoutFeedback onPress={()=>onPressDone()}>
          <Animated.View style={[styles.overlay, { opacity }]} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            transform: [{ translateY }]
          }}>
          <View style={[styles.pickerContainer]}>
          <Picker style={{ width: WindowWidth, backgroundColor: '#e1e1e1' }}
              selectedValue={selectedValue}
              onValueChange={(itemValue, itemIndex) => onPickerValueChange(itemValue)}>
                {items.map(item => 
                <Picker.Item key={item} label={item} value={item} />
                )
              }
            </Picker>
            </View>
        </Animated.View>
      </View>
    );
};

DropDownModalComponent.propTypes = {
    items: PropTypes.array.isRequired,
    animatedValue:PropTypes.object.isRequired,
    selectedValue: PropTypes.string.isRequired,
    display:PropTypes.bool.isRequired,
    onValueChange:PropTypes.func.isRequired
};

export const styles = {
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.85)'
    },
    pickerContainer:
    {
      backgroundColor: '#f1f1f1',
      paddingVertical: 5,
      paddingHorizontal: 15,
      zIndex:9999
    }


};

export default DropDownModalComponent;


