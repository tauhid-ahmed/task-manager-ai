"use client";

import {
  type Task,
  type SubTask,
  type TaskStatus,
  type TaskManagerEvent,
  type TaskManagerState,
  NewTask,
} from "@/types/task-manager.types";
import { useReducer } from "react";

const initialState: TaskManagerState = {
  status: "idle",
  tasks: [
    {
      id: crypto.randomUUID(),
      title: "Task 1",
      description: "Task 1 description",
      status: "pending",
      dueDate: "today",
    },
    {
      id: crypto.randomUUID(),
      title: "Task 2",
      description: "Task 2 description",
      status: "completed",
      dueDate: "today",
    },
  ],
};

function taskManagerReducer(
  state: TaskManagerState,
  action: TaskManagerEvent
): TaskManagerState {
  switch (action.type) {
    // ✅ Create a new task
    case "ADD_TASK": {
      if (state.status !== "readyToAddTask") return state;
      const newTask = {
        id: crypto.randomUUID(),
        ...action.payload.newTask,
      };
      return {
        ...state,
        status: "idle",
        tasks: [...state.tasks, newTask],
      };
    }

    // ✅ Edit button click event
    case "EDIT_BUTTON_CLICKED": {
      if (state.status !== "idle") return state;
      const { taskId } = action.payload;
      return {
        ...state,
        status: "editing",
        editingTaskId: taskId,
      };
    }

    // ✅ Edit an existing task
    case "UPDATE_TASK": {
      if (state.status !== "editing") return state;
      const { task: updatedTask } = action.payload;

      return {
        ...state,
        status: "idle",
        tasks: state.tasks.map((task) =>
          task.id === state.editingTaskId ? { ...task, ...updatedTask } : task
        ),
      };
    }

    // ✅ Delete event
    case "DELETE_BUTTON_CLICKED": {
      if (state.status !== "idle") return state;
      const { taskId } = action.payload;
      return {
        ...state,
        status: "deleting",
        deletingTaskId: taskId,
      };
    }

    // ✅ Delete a task
    case "DELETE_TASK": {
      if (state.status !== "deleting") return state;

      return {
        ...state,
        status: "idle",
        tasks: [
          ...state.tasks.filter((task) => task.id !== state.deletingTaskId),
        ],
      };
    }

    // ✅ Change existing task status
    case "CHANGE_STATUS": {
      if (state.status !== "idle") return state;
      const { taskId } = action.payload;
      return {
        ...state,
        status: "idle",
        tasks: state.tasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                status: task.status === "pending" ? "completed" : "pending",
              }
            : task
        ),
      };
    }

    // ✅ Add subtask for an existing task
    case "GENERATE_SUBTASKS":

    // ✅ Readd subtask for an existing task
    case "REGENERATE_SUBTASKS":

    default:
      return state;
  }
}

export const useTaskReducer = () => {
  const [state, dispatch] = useReducer(taskManagerReducer, initialState);

  const addTask = (payload: { newTask: NewTask }) =>
    dispatch({ type: "ADD_TASK", payload });

  return { state, dispatch, addTask };
};
