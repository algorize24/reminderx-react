import { TextInput, StyleSheet } from "react-native";

// constants
import { Color } from "../../constants/Color";
import { Fonts } from "../../constants/Font";

export default function TextInputs({
  placeholder,
  secure,
  style,
  inputMode,
  keyboardType,
  maxLength,
  onChangeText,
  value,
  editable,
  placeholderTextColor,
  autoCapitalize,
}) {
  return (
    <TextInput
      style={[styles.text, style]}
      inputMode={inputMode}
      autoCorrect={false}
      autoCapitalize={autoCapitalize}
      placeholderTextColor={placeholderTextColor || Color.tagLine}
      placeholder={placeholder}
      secureTextEntry={secure}
      keyboardType={keyboardType}
      maxLength={maxLength}
      onChangeText={onChangeText}
      value={value}
      editable={editable}
    />
  );
}

const styles = StyleSheet.create({
  text: {
    color: Color.tagLine,
    fontFamily: Fonts.main,
    padding: 10,
  },
});
