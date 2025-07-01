"use client";

import {
  type TaskManagerEvent,
  type TaskManagerState,
  type NewTask,
  type Task,
} from "@/features/task-manager/types/task-manager.types";
import { useReducer } from "react";

const initialState: TaskManagerState = {
  status: "idle",
  tasks: [
    {
      id: crypto.randomUUID(),
      title: "Task 1",
      description: "Task 1 description",
      status: "pending",
      dueDate: "2025-07-15",
    },
    {
      id: crypto.randomUUID(),
      title: "Task 2",
      description: "Task 2 description",
      status: "completed",
      dueDate: "2025-07-15",
    },
  ],
};

function taskManagerReducer(
  state: TaskManagerState,
  action: TaskManagerEvent
): TaskManagerState {
  switch (action.type) {
    // ✅ Add task action event
    case "ADD_TASK_BUTTON_CLICKED": {
      if (state.status !== "idle") return state;
      return {
        ...state,
        status: "creating",
      };
    }

    // ✅ Create a new task
    case "ADD_TASK": {
      if (state.status !== "creating") return state;
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
      const { updatedTask } = action.payload;

      return {
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

    // ✅ Close modal action
    case "CLOSE_MODAL": {
      return { status: "idle", tasks: state.tasks };
    }

    default:
      return state;
  }
}

export const useTaskReducer = () => {
  const [state, dispatch] = useReducer(taskManagerReducer, initialState);

  const addTask = (payload: { newTask: NewTask }) => {
    dispatch({ type: "ADD_TASK", payload });
  };

  const editTask = (payload: { updatedTask: NewTask }) => {
    dispatch({ type: "UPDATE_TASK", payload });
  };

  const changeStatus = (taskId: string) => {
    dispatch({ type: "CHANGE_STATUS", payload: { taskId } });
  };

  const handleNewTaskButtonClick = () => {
    dispatch({ type: "ADD_TASK_BUTTON_CLICKED" });
  };

  const handleEditTaskButtonClick = (taskId: string) => {
    dispatch({ type: "EDIT_BUTTON_CLICKED", payload: { taskId } });
  };
  const handleDeleteTaskButtonClick = (taskId: string) => {
    dispatch({ type: "DELETE_BUTTON_CLICKED", payload: { taskId } });
  };

  const handleCloseModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  return {
    state,
    dispatch,
    addTask,
    editTask,
    changeStatus,
    handleNewTaskButtonClick,
    handleEditTaskButtonClick,
    handleDeleteTaskButtonClick,
    handleCloseModal,
  };
};
