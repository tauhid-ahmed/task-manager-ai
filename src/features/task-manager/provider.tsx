"use client";
import { useContext, createContext } from "react";
import { useTaskReducer } from "./hooks/useTaskManager";
import { type TaskManagerState } from "./types/task-manager.types";

type TaskManagerContext = {
  state: TaskManagerState;
} & ReturnType<typeof useTaskReducer>;

const TaskManagerContext = createContext<TaskManagerContext | null>(null);

export default function TaskManagerProvider({
  children,
}: React.PropsWithChildren) {
  const context = useTaskReducer();
  return (
    <TaskManagerContext.Provider value={context}>
      {children}
    </TaskManagerContext.Provider>
  );
}

export const useTaskManager = () => {
  const context = useContext(TaskManagerContext);
  if (!context) throw new Error("");
  return context;
};
