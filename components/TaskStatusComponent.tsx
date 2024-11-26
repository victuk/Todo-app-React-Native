import { View, Text } from "react-native";
import React from "react";
import { ToDoInterface } from "@/store/toDoStore";

interface Props {
  task: ToDoInterface;
  date: Date;
}

export default function TaskStatusComponent({ task, date }: Props) {
  return (
    <View>
      {task && <Text
        style={[
          {
            fontSize: 10,
            paddingVertical: 4,
            paddingHorizontal: 10,
            borderRadius: 10,
          },
          task?.status == "completed"
            ? {
                color: "green",
                backgroundColor: "rgba(31, 69, 41, 0.1)",
              }
            : date > task.dueDate
            ? {
                color: "red",
                backgroundColor: "rgba(217, 22, 86, 0.1)",
              }
            : {
                color: "rgb(255, 191, 0)",
                backgroundColor: "rgba(255, 191, 0, 0.1)",
              },
        ]}
      >
        {date > task.dueDate ? "OVERDUE" : task.status.toLocaleUpperCase()}
      </Text>}
    </View>
  );
}
