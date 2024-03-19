import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  View,
  Image,
  Pressable,
} from 'react-native';
import {fonts, icons} from '../assets';
import {colors} from '../utils';

const TextInputWithIcon = ({
  title = 'TextInput',
  placeholder = 'Placeholder',
  value,
  onChangeText,
  marginTop = 0,
  marginBottom = 0,
  secureTextEntry = false,
  onPress,
  isActive = false,
  iconOn = icons.eye_open,
  iconOff = icons.eye_close,
  iconStyle = {},
  editable = true,
  pressable = false,
}) => {
  return (
    <View
      style={[
        styles.wrapInput,
        {marginTop: marginTop, marginBottom: marginBottom},
      ]}>
      <Pressable
        onPress={() => {
          pressable ? onPress() : false;
        }}>
        <View style={styles.textInput2}>
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={'gray'}
            style={{
              width: '90%',
              color: colors.black,
              fontFamily: fonts.PoppinsRegular,
            }}
            secureTextEntry={secureTextEntry}
            value={value}
            onChangeText={onChangeText}
            editable={editable}
          />

          <TouchableOpacity onPress={onPress}>
            <Image
              source={isActive ? iconOn : iconOff}
              style={[styles.lock, iconStyle]}
            />
          </TouchableOpacity>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapInput: {
    width: '100%',
  },
  titleInput: {
    fontFamily: fonts.PoppinsMedium,
    color: colors.black,
  },
  textInput2: {
    height: 50,
    width: '100%',
    borderBottomWidth:1,
    borderBottomColor:colors.lightGray,
    color: colors.black,
    fontFamily: fonts.PoppinsRegular,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    height: 50,
    width: '100%',
    borderBottomWidth:1,
    borderBottomColor:colors.lightGray,
    color: colors.black,
    fontFamily: fonts.PoppinsRegular,
  },
  lock: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
});
export default TextInputWithIcon;
