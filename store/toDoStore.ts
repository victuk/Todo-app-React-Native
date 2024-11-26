
import AsyncStorage from "@react-native-async-storage/async-storage";
import {create} from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import uuid from "react-native-uuid";

type TodoStatusTypes = "pending" | "completed";

export interface ToDoInterface {
    id?: string;
    title: string;
    description: string;
    category: string;
    status: TodoStatusTypes;
    dueDate: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

interface ToDoStoreInterface {
    items: ToDoInterface[];
    addItem: (item: ToDoInterface) => void;
    updateItemStatus: (id: string, status: TodoStatusTypes) => void;
    removeByCategory: (category: string) => void;
    removeItem: (id: string) => void;
}

export const useToDoStore = create<ToDoStoreInterface>()(
    persist(
      (set) => ({
        items: [],
        addItem: (item) =>
          set((state) => {  
            return { items: [...state.items, { ...item, id: uuid.v4(), createdAt: new Date(), updatedAt: new Date() }] };
          }),
          removeByCategory: (category) =>
            set((state) => {  
              return { items: state.items.filter(i => i.category != category) };
            }),
          updateItemStatus: (id: string, status) =>
            set((state) => {
  
              return { items: state.items.map((i) => {

                if(i.id == id) {
                    i.status = status
                }

                return i;

              }) };
            }),
        removeItem: (id: string) =>
          set((state) => {

            return { items: state.items.filter((i) => i.id !== id) };
          }),
      }),
      {
        name: 'todo',
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  );