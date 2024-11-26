import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Pressable,
  Alert,
  ToastAndroid,
  FlatList,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import moment from "moment";
import { ScrollView } from "react-native-gesture-handler";
import { Colors } from "@/constants/Colors";
import { AntDesign, Entypo, Feather, FontAwesome5 } from "@expo/vector-icons";
import { Button, List, Modal, Portal, TextInput } from "react-native-paper";

import DatePicker from "react-native-date-picker";

import { useToDoStore } from "@/store/toDoStore";
import { useCategoryStore } from "@/store/categoryStore";
import AddCategoryModal from "@/components/modals/AddCategoryModal";
import { COLORS } from "@/constants";
import AddTodoModal from "@/components/modals/AddTodoModal";
import TaskModal from "@/components/modals/TaskModal";
import TaskListItem from "@/components/TaskListItem";
import NoTaskComponent from "@/components/NoTaskComponent";
import CategoryListComponent from "@/components/CategoryListComponent";
import { useAuthStore } from "@/store/AuthStore";
import { Redirect } from "expo-router";

export default function Home() {
  const [date, setDate] = useState(new Date());

  const [activeCategoryStyle, setActiveCategoryStyle] = useState("All");

  const categories = ["All", "Shopping", "Groceries", "Business"];

  const tasks = useToDoStore((state) => state.items);

  const setLoggedIn = useAuthStore(state => state.setLoggedIn);
const isLoggedIn = useAuthStore(state => state.isLoggedIn);

  useEffect(() => {
    const intervalFunction = setInterval(() => {
      setDate(new Date());
    }, 1000); // 1 second = 1000 milliseconds

    return () => {
      clearInterval(intervalFunction);
    };
  }, []);

  const [taskModal, setTaskModal] = useState("");

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [visibleCategoryModal, setVisibleCategoryModal] = React.useState(false);

  const categoryShowModal = () => setVisibleCategoryModal(true);
  const categoryHideModal = () => setVisibleCategoryModal(false);
  const containerStyle = { backgroundColor: "white", padding: 20, margin: 20 };

  const taskList = useMemo(() => {
    if (activeCategoryStyle == "All") {
      console.log(tasks);

      return tasks;
    } else {
      return tasks.filter((t) => t.category == activeCategoryStyle);
    }
  }, [activeCategoryStyle, tasks]);

  const totalTasks = useMemo(() => {
    return tasks.length;
  }, [tasks]);

  const completedTasks = useMemo(() => {
    return tasks.filter((t) => t.status == "completed").length;
  }, [tasks]);

  const pendingTasks = useMemo(() => {
    return tasks.filter((t) => t.status == "pending" && t.dueDate > date)
      .length;
  }, [tasks]);

  const overdueTasks = useMemo(() => {
    return tasks.filter((t) => t.status == "pending" && t.dueDate < date)
      .length;
  }, [tasks]);



  if(!isLoggedIn) {
    return <Redirect href={"/"} />
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.today}>Today</Text>
        <Text style={styles.date}>{moment(date).format("LLLL")}</Text>
      </View>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <View style={[styles.card, styles.totalCard]}>
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Total Tasks
            </Text>
            <Text style={styles.cardText}>{totalTasks}</Text>
          </View>

          <View style={[styles.card, styles.completedCard]}>
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Completed
            </Text>
            <Text style={styles.cardText}>{completedTasks}</Text>
          </View>

          <View style={[styles.card, styles.pendingCard]}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Pending</Text>
            <Text style={styles.cardText}>{pendingTasks}</Text>
          </View>

          <View style={[styles.card, styles.overdueCard]}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Overdue</Text>
            <Text style={styles.cardText}>{overdueTasks}</Text>
          </View>
        </ScrollView>
      </View>

      <CategoryListComponent
        activeCategoryStyle={activeCategoryStyle}
        categories={categories}
        categoryShowModal={categoryShowModal}
        setActiveCategoryStyle={setActiveCategoryStyle}
      />

      <Text style={styles.date}>Tasks</Text>

      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: 10,
          backgroundColor: "rgba(200, 200, 200, 0.2)",
          padding: 10,
          borderRadius: 10,
          height: "90%"
        }}
        data={taskList}
        renderItem={({ item }) => (
          <TaskListItem
            date={date}
            activeCategoryStyle={activeCategoryStyle}
            setTaskModal={setTaskModal}
            task={item}
            taskModal={taskModal}
            tasks={tasks}
            key={item.id}
          />
        )}
        ListEmptyComponent={() => <NoTaskComponent />}
      />

      <Pressable style={styles.addTaskButton} onPress={showModal}>
        <Entypo name="plus" size={25} style={{ color: "white" }} />
      </Pressable>

      {/* Modal to add a new category */}
      <AddCategoryModal
        categories={categories}
        categoryHideModal={categoryHideModal}
        containerStyle={containerStyle}
        visibleCategoryModal={visibleCategoryModal}
      />

      {/* Modal to add a new todo */}
      <AddTodoModal
        categories={categories}
        containerStyle={containerStyle}
        hideModal={hideModal}
        visible={visible}
      />

      {/* Modal to view a todo being clicked on */}
      <TaskModal
        taskModal={taskModal}
        setTaskModal={setTaskModal}
        containerStyle={containerStyle}
        tasks={tasks}
        date={date}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: 15,
  },
  today: {
    color: "#ccc",
    fontSize: 20,
  },
  date: {
    color: "black",
    fontSize: 25,
    fontWeight: "700",
  },
  card: {
    marginTop: 20,
    height: 80,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  totalCard: {
    backgroundColor: "skyblue"
  },
  completedCard: {
    backgroundColor: "green"
  },
  pendingCard: {
    backgroundColor: "rgb(255, 191, 0)"
  },
  overdueCard: {
    backgroundColor: "red"
  },
  cardText: { fontSize: 25, color: "white", fontWeight: "600" },
  addTaskButton: {
    position: "absolute",
    bottom: 25,
    right: 25,
    backgroundColor: "skyblue",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
});
