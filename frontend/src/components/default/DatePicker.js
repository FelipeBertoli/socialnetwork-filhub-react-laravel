import React, { useState, useEffect } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { TextInput } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

export default function DatePicker({ label, defaultValue, onChange, error }) {
  const [value, setValue] = useState(defaultValue);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    if (defaultValue) {
      const parsedDate = new Date(defaultValue);
      setDate(parsedDate);
      setValue(formatDate(parsedDate));
    }
  }, [defaultValue]);

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day < 10 ? "0" + day : day}/${month < 10 ? "0" + month : month}/${year}`;
  };

  const formatDateDB = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`;
  };

  const toggleDatepicker = () => {
    setShowPicker(true);
  };

  const handleChange = (event, selectedDate) => {
    if (event.type === 'dismissed') {
      setShowPicker(false);
      return;
    }
  
    if (selectedDate) {
      const currentDate = selectedDate;
      setDate(currentDate);
      setValue(formatDate(currentDate));
      onChange(formatDateDB(currentDate));
    }
  
    setShowPicker(false); 
  };
  
  

  return (
    <View>
      <View style={styles.container}>
        <Pressable onPress={toggleDatepicker}>
          <TextInput
            style={styles.input}
            label={label}
            value={value}
            editable={false}
          />
          <View style={styles.icon}>
            <Ionicons name="calendar" size={24} color="#857870" />
          </View>
        </Pressable>
        {showPicker && (
          <DateTimePicker
            mode="date"
            display="spinner"
            locale={"pt-BR"}
            value={date}
            onChange={handleChange}
          />
        )}
      </View>
      {error && (
        <Text style={styles.error}>{error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 55,
    marginTop: 12,
    marginBottom: -12,
  },
  input: {
    height: 55,
    width: 330,
    color: "black",
    backgroundColor: "#F0EFEF",
  },
  icon: {
    position: "relative",
    top: -39.5,
    left: 280,
  },
  error: {
    color: 'red',
    fontWeight: '500',
    fontSize: 10,
    paddingHorizontal: 5,
    paddingVertical: 3,
    backgroundColor: '#FFC0B2',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
});
