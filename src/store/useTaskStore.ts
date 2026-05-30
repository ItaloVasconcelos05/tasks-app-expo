// src/store/useTaskStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addTask, deleteTask, getAllTasks, updateTask, TaskItem } from '../utils/handle-api';

interface TaskState {
  tasks: TaskItem[];
  isLoading: boolean;
  fetchAllTasks: () => void;
  addNewTask: (text: string, completed: boolean, dueDate: string | null, onSuccess: () => void) => void;
  editTask: (taskId: string, text: string, completed: boolean, dueDate: string | null, onSuccess: () => void) => void;
  removeTask: (taskId: string) => void;
  clearAll: () => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],
      isLoading: false,

      fetchAllTasks: () => {
        set({ isLoading: true });
        getAllTasks(
          (tasks) => set({ tasks }), 
          (isLoading) => set({ isLoading })
        );
      },

      addNewTask: (text, completed, dueDate, onSuccess) => {
        addTask(
          text, 
          completed, 
          dueDate, 
          (newTasks) => set((state) => ({ tasks: typeof newTasks === 'function' ? newTasks(state.tasks) : newTasks })), 
          onSuccess
        );
      },

      editTask: (taskId, text, completed, dueDate, onSuccess) => {
        updateTask(
          taskId, 
          text, 
          completed, 
          dueDate, 
          (newTasks) => set((state) => ({ tasks: typeof newTasks === 'function' ? newTasks(state.tasks) : newTasks })), 
          onSuccess
        );
      },

      removeTask: (taskId) => {
        deleteTask(taskId, (newTasks) => set((state) => ({ tasks: typeof newTasks === 'function' ? newTasks(state.tasks) : newTasks })));
      },

      clearAll: () => set({ tasks: [] }),
    }),
    {
      name: 'tasks-storage', // Nome do banco local
      storage: createJSONStorage(() => AsyncStorage), // Ativa a persistência Bônus
    }
  )
);