import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Dimensions} from 'react-native';
import {fonts} from '../assets';
import {colors} from '../utils';

const width = Dimensions.get('window').width;

const ButtonCustom = ({
    title = 'Button',
    onPress,
    color = colors.primary,
    buttonStyle,
}) => {
    return (
        <TouchableOpacity
            style={[buttonStyle, styles.button, {backgroundColor: color}]}
            onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 10,
        paddingHorizontal: width * 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 18,
        elevation: 5,
        height:56,
    },
    text: {
        fontFamily: fonts.PoppinsRegular,
        color: colors.white,
    },
});
export default ButtonCustom;
