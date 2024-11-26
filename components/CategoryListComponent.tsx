import { View, Text, Pressable, ToastAndroid, Alert, StyleSheet } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { useCategoryStore } from '@/store/categoryStore';
import { useToDoStore } from '@/store/toDoStore';

interface Props {
    categories: string[];
    setActiveCategoryStyle: (value: string) => void;
    activeCategoryStyle: string;
    categoryShowModal: () => void;
}

export default function CategoryListComponent({
    categories,
    setActiveCategoryStyle,
    activeCategoryStyle,
    categoryShowModal
}: Props) {

    const addedCategories = useCategoryStore((state) => state.items);

    const removeCategory = useCategoryStore((state) => state.removeCategory);

    const removeByCategoryName = useToDoStore((state) => state.removeByCategory);

    const removeCategoryAndTasks = (categoryName: string, categoryId: string) => {
        Alert.alert(
          `Remove "${categoryName}" category?`,
          `Are you sure you want to remove "${categoryName}" from your list of categories? (Note that this action will also remove every todo under "${categoryName}" category)`,
          [
            {
              text: "Yes",
              onPress: () => {
                removeCategory(categoryId);
                removeByCategoryName(categoryName);
              },
            },
            {
              text: "No",
              onPress: () => {},
            },
          ]
        );
      };

  return (
    <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 10,
            marginVertical: 20,
            alignItems: "center",
          }}
        >
          {categories
            .concat(addedCategories.map((c) => c.name))
            .map((category, index: number) => (
              <Pressable
                key={index}
                onPress={() => {
                  setActiveCategoryStyle(category);
                }}
                onLongPress={() => {
                  if (categories.includes(category)) {
                    ToastAndroid.show(
                      "You can not remove in-built cateories",
                      ToastAndroid.SHORT
                    );
                    return;
                  }

                  const categoryDetails = addedCategories.find(
                    (c) => c.name == category
                  );

                  removeCategoryAndTasks(
                    categoryDetails!!.name as string,
                    categoryDetails!!.id as string
                  );
                }}
              >
                <Text
                  style={[
                    category == activeCategoryStyle
                      ? styles.activeCategoryStyle
                      : styles.categoryStyle,
                    {
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      borderRadius: 20,
                      fontSize: 12,
                    },
                  ]}
                >
                  {category}
                </Text>
              </Pressable>
            ))}
          <Pressable onPress={categoryShowModal}>
            <Text
              style={[
                styles.categoryStyle,
                { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
              ]}
            >
              <Entypo name="plus" size={16} />
            </Text>
          </Pressable>
        </ScrollView>
      </View>
  )
}


const styles = StyleSheet.create({
    activeCategoryStyle: {
        backgroundColor: "#000000",
        color: "#ffffff",
      },
      categoryStyle: {
        backgroundColor: "#cccccc",
        color: "#000000",
      },
});
