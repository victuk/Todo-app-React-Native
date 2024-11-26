import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { Button, Modal, Portal, TextInput } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { ItemInterface, useCategoryStore } from "@/store/categoryStore";


interface Props {
  visibleCategoryModal: boolean;
  categoryHideModal: () => void;
  containerStyle: object;
  categories: string[];
}

export default function AddCategoryModal({
  categoryHideModal,
  containerStyle,
  visibleCategoryModal,
  categories
}: Props) {

    const [newCategory, setNewCategory] = useState("");

    const addedCategories = useCategoryStore((state) => state.items);

    const addCategory = useCategoryStore((state) => state.addCategory);

  return (
    <Portal>
      <Modal
        visible={visibleCategoryModal}
        onDismiss={categoryHideModal}
        contentContainerStyle={containerStyle}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            Create category
          </Text>
          <AntDesign name="close" size={18} onPress={categoryHideModal} />
        </View>
        <View style={{ marginTop: 20, gap: 20 }}>
          <TextInput
            label="Category name"
            placeholder="E.g Hobby"
            style={{ backgroundColor: "white" }}
            value={newCategory}
            onChangeText={(text) => {
              setNewCategory(text);
            }}
          />
          <Button
            mode="contained"
            style={{ backgroundColor: "skyblue", borderRadius: 10 }}
            onPress={() => {
              const categoryAlreadyExist = categories
                .concat(addedCategories.map((c) => c.name))
                .includes(newCategory);
              if (categoryAlreadyExist) {
                Alert.alert(
                  "Duplicate Category",
                  `"${newCategory}" already exists and can't be added`,
                  [
                    {
                      text: "OK",
                    },
                  ]
                );
                return;
              }
              addCategory({
                name: newCategory,
              });

              setNewCategory("");

              categoryHideModal();
            }}
          >
            Add
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}
