import { View, Text } from 'react-native'
import React, { useMemo } from 'react'
import { Modal, Portal } from 'react-native-paper';
import { ToDoInterface } from '@/store/toDoStore';
import { AntDesign } from '@expo/vector-icons';
import moment from 'moment';
import TaskStatusComponent from '../TaskStatusComponent';
import { COLORS } from '@/constants';

interface Props {
    taskModal: string;
    setTaskModal: (value: React.SetStateAction<string>) => void;
    containerStyle: object;
    tasks: ToDoInterface[];
    date: Date;
}

export default function TaskModal({
    taskModal,
    setTaskModal,
    containerStyle,
    tasks,
    date
}: Props) {

    const taskDetails = useMemo(() => {
        if (taskModal != "") {
          return tasks.find((t) => t.id == taskModal);
        }
      }, [tasks, taskModal]);

  return (
    <Portal>
        <Modal
          visible={taskModal != ""}
          onDismiss={() => {
            setTaskModal("");
          }}
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
              {taskDetails?.title}
            </Text>
            <AntDesign
              name="close"
              size={18}
              onPress={() => {
                setTaskModal("");
              }}
            />
          </View>
          <View style={{ marginTop: 20, gap: 10 }}>
            <Text>{taskDetails?.description}</Text>
            <Text style={{color: "skyblue", fontSize: 10}}>{taskDetails?.category}</Text>
            <Text><TaskStatusComponent task={taskDetails as ToDoInterface} date={date} /></Text>

            <View>
              <Text style={{fontSize: 10, color: COLORS.gray, fontWeight: "bold"}}>Created</Text>
                <Text style={{fontWeight: "bold"}}>
                {moment(taskDetails?.createdAt).format("LLLL")}
                </Text>
            </View>
            
            <View>
                <Text style={{fontSize: 10, color: COLORS.gray, fontWeight: "bold"}}>Date Due</Text>
            <Text style={{fontWeight: "bold"}}>{moment(taskDetails?.dueDate).format("LLLL")}</Text>
            </View>
          </View>
        </Modal>
      </Portal>
  )
}