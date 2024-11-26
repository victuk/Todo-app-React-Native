import { View, Text } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons'

export default function NoTaskComponent() {
  return (
    <View
              style={{
                height: 200,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesome5 name="tasks" size={25} />
              <Text>No Task</Text>
            </View>
  )
}