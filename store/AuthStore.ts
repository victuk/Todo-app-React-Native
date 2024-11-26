
import AsyncStorage from "@react-native-async-storage/async-storage";
import {create} from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import uuid from "react-native-uuid";



interface CategoryStoreInterface {
    isLoggedIn: boolean;
    setLoggedIn: (isLoggedIn: boolean) => void;
}

export const useAuthStore = create<CategoryStoreInterface>()(
    persist(
      (set) => ({
        isLoggedIn: false,
        setLoggedIn: (isLoggedIn) =>
          set((_state) => {  
            return { isLoggedIn };
          })
      }),
      {
        name: 'auth',
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  );