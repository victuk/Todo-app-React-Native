import { View, Text, Pressable } from "react-native";
import React from "react";
import { COLORS } from "@/constants";
import { ToDoInterface, useToDoStore } from "@/store/toDoStore";
import { AntDesign, Feather, FontAwesome5 } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import TaskStatusComponent from "./TaskStatusComponent";

interface Props {
  taskModal: string;
  setTaskModal: (value: string) => void;
  tasks: ToDoInterface[];
  task: ToDoInterface;
  activeCategoryStyle: string;
  date: Date;
}

export default function TaskListItem({
  taskModal,
  setTaskModal,
  tasks,
  task,
  activeCategoryStyle,
  date,
}: Props) {
  const updateTodo = useToDoStore((state) => state.updateItemStatus);
  const removeTodo = useToDoStore((state) => state.removeItem);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
      }}
    >
      <Pressable
        onPress={() => {
          setTaskModal(task.id as string);
        }}
      >
        <View style={{ gap: 5 }}>
          <Text
            style={[
              { fontWeight: "bold" },
              task.status == "completed" && {
                textDecorationLine: "line-through",
                color: COLORS.gray,
              },
            ]}
          >
            {task.title}
          </Text>
          {activeCategoryStyle == "All" && (
            <View>
              <Text
                style={{
                  display: "flex",
                  fontSize: 10,
                  borderRadius: 10,
                  color: "skyblue",
                  borderColor: "skyblue",
                }}
              >
                {task.category}
              </Text>
            </View>
          )}
          {/* <Text
                    style={[
                      { fontSize: 12 },
                      task.status == "completed" && {
                        textDecorationLine: "line-through",
                      },
                    ]}
                  >
                    {task.description}
                  </Text> */}
          <TaskStatusComponent task={task} date={date} />
        </View>
      </Pressable>
      <View>
        {task.status == "pending" && (
          <Text onPress={() => {
            updateTodo(task!!.id as string, "completed");
          }} style={{padding: 10}}>
            <AntDesign
              name="check"
              style={{ color: "green" }}
              
              size={20}
            />
          </Text>
        )}

        {task.status == "completed" && (
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
            }}
          >
            <Text
              onPress={() => {
                updateTodo(task!!.id as string, "pending");
              }}
              style={{padding: 10}}
            >
              <FontAwesome5 name="undo" size={20} />
            </Text>
            <Text onPress={() => {
                removeTodo(task!!.id as string);
              }} style={{padding: 10}}>

            <Feather
              name="trash"
              style={{ color: "red" }}
              size={20}
            />
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
