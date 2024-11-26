import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Modal, Portal, TextInput, Button } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { Dropdown } from "react-native-element-dropdown";
import { useCategoryStore } from '@/store/categoryStore';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useToDoStore } from '@/store/toDoStore';

interface Props {
    visible: boolean;
hideModal: () => void;
containerStyle: object;
categories: string[];
}

export default function AddTodoModal({
    visible,
    containerStyle,
    hideModal,
    categories
}: Props) {

    const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [isFocus, setIsFocus] = useState(false);

  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const addedCategories = useCategoryStore((state) => state.items);

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date: Date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const addTodo = useToDoStore((state) => state.addItem);

  return (
    <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>Add a Todo</Text>
            <AntDesign name="close" size={18} onPress={hideModal} />
          </View>
          <View style={{ marginTop: 20, gap: 20 }}>
            {/* <Text>Example Modal.  Click outside this area to dismiss.</Text> */}
            <TextInput
              label="Title"
              placeholder="E.g Clean the house"
              style={{ backgroundColor: "white" }}
              value={title}
              onChangeText={(text) => {
                setTitle(text);
              }}
            />
            <TextInput
              label="Description"
              placeholder="E.g I'd like to clean the house"
              style={{ backgroundColor: "white" }}
              value={description}
              onChangeText={(text) => {
                setDescription(text);
              }}
            />
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: "skyblue" }]}
              placeholder="Pick a category"
              data={categories
                .filter((c) => c != "All")
                .concat(addedCategories.map((c) => c.name))
                .map((category) => ({ value: category }))}
              labelField="value"
              valueField="value"
              value={category}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setCategory(item!!.value);
                setIsFocus(false);
              }}
            />
            <Button
              mode="outlined"
              onPress={showDatePicker}
              style={{ borderColor: "gray", borderRadius: 10 }}
            >
              Select due date
            </Button>
            <DateTimePickerModal
              date={selectedDate}
              isVisible={datePickerVisible}
              mode="datetime"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <Button
              mode="contained"
              style={{ backgroundColor: "skyblue", borderRadius: 10 }}
              onPress={() => {
                addTodo({
                  title,
                  description,
                  category,
                  dueDate: selectedDate,
                  status: "pending",
                });

                setTitle("");
                setDescription("");
                setCategory("");
                setSelectedDate(new Date());

                hideModal();
              }}
            >
              Create new Todo
            </Button>
          </View>
        </Modal>
      </Portal>
  )
}

const styles = StyleSheet.create({
    dropdown: {
        height: 50,
        borderColor: "gray",
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
      }
});
