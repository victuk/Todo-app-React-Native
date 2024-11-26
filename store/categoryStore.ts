
import AsyncStorage from "@react-native-async-storage/async-storage";
import {create} from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import uuid from "react-native-uuid";

type TodoStatusTypes = "pending" | "completed";

export interface ItemInterface {
    id?: string;
    name: string;
}

interface CategoryStoreInterface {
    items: ItemInterface[];
    addCategory: (item: ItemInterface) => void;
    removeCategory: (id: string) => void;
}

export const useCategoryStore = create<CategoryStoreInterface>()(
    persist(
      (set) => ({
        items: [],
        addCategory: (item) =>
          set((state) => {  
            return { items: [...state.items, {...item, id: uuid.v4()}] };
          }),
          removeCategory: (id: string) =>
          set((state) => {
            return { items: state.items.filter((i) => i.id !== id) };
          }),
      }),
      {
        name: 'category',
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  );