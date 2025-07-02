"use client";

import {
  type TaskManagerEvent,
  type TaskManagerState,
  type NewTask,
  type SubTask,
} from "@/features/task-manager/types/task-manager.types";
import { useReducer } from "react";

const initialState: TaskManagerState = {
  status: "idle",
  tasks: [
    {
      id: crypto.randomUUID(),
      title: "Plan birthday party",
      description: "Task 1 description",
      status: "pending",
      dueDate: "2025-07-15",
      subTasks: [
        { id: crypto.randomUUID(), title: "SubTask 1", status: "pending" },
        { id: crypto.randomUUID(), title: "SubTask 2", status: "pending" },
        { id: crypto.randomUUID(), title: "SubTask 3", status: "completed" },
        { id: crypto.randomUUID(), title: "SubTask 4", status: "pending" },
      ],
    },
    {
      id: crypto.randomUUID(),
      title: "Task 2",
      description: "Task 2 description",
      status: "pending",
      dueDate: "2025-07-15",
      subTasks: [
        { id: crypto.randomUUID(), title: "SubTask 10", status: "completed" },
        { id: crypto.randomUUID(), title: "SubTask 11", status: "pending" },
        { id: crypto.randomUUID(), title: "SubTask 12", status: "completed" },
        { id: crypto.randomUUID(), title: "SubTask 13", status: "pending" },
      ],
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
        subTasks: [],
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

      // Based on task change subtask status
      const subTaskStatus =
        updatedTask.status === "pending" ? "pending" : "completed";

      return {
        status: "idle",
        tasks: state.tasks.map((task) => {
          if (task.id !== state.editingTaskId) return task;
          return {
            ...task,
            ...updatedTask,
            subTasks: task.subTasks.map((subtask) => ({
              ...subtask,
              status: subTaskStatus,
            })),
          };
        }),
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
    case "CHANGE_TASK_STATUS": {
      if (state.status !== "idle") return state;
      const { taskId } = action.payload;
      return {
        status: "idle",
        tasks: state.tasks.map((task) => {
          if (task.id !== taskId) return task;

          const toggledStatus: "pending" | "completed" =
            task.status === "pending" ? "completed" : "pending";

          return {
            ...task,
            status: toggledStatus,
            subTasks: task.subTasks?.map((subTask) => ({
              ...subTask,
              status: toggledStatus,
            })),
          };
        }),
      };
    }

    // ✅ Change subtask task status
    case "CHANGE_SUBTASK_STATUS": {
      if (state.status !== "idle") return state;

      return {
        status: "idle",
        tasks: state.tasks.map((task) => {
          if (task.id !== action.payload.taskId) return task;

          // ✅ Step 1: Toggle the specific subTask
          const updatedSubTasks =
            task.subTasks?.map((subTask) => {
              if (subTask.id !== action.payload.subTaskId) return subTask;

              const toggledStatus: "pending" | "completed" =
                subTask.status === "pending" ? "completed" : "pending";

              return { ...subTask, status: toggledStatus };
            }) ?? [];

          // ✅ Step 2: Check if ALL subTasks are now completed
          const allCompleted =
            updatedSubTasks.length > 0 &&
            updatedSubTasks.every((subTask) => subTask.status === "completed");

          return {
            ...task,
            subTasks: updatedSubTasks,
            status: allCompleted ? "completed" : "pending",
          };
        }),
      };
    }

    // ✅ Add subtask for an existing task
    case "GENERATE_SUBTASKS": {
      if (state.status !== "idle") return state;
      const { taskId } = action.payload;
      return {
        ...state,
        status: "idle",
        tasks: state.tasks.map((task) => {
          if (task.id !== taskId) return task;
          return {
            ...task,
            subTasks: action.payload.subTasks,
          };
        }),
      };
    }

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

  const changeTaskStatus = (taskId: string) => {
    dispatch({ type: "CHANGE_TASK_STATUS", payload: { taskId } });
  };

  const changeSubTaskStatus = (taskId: string, subTaskId: string) => {
    dispatch({ type: "CHANGE_SUBTASK_STATUS", payload: { taskId, subTaskId } });
  };

  const generateSubtasks = (taskId: string, subTasks: SubTask[]) => {
    dispatch({
      type: "GENERATE_SUBTASKS",
      payload: { taskId: taskId, subTasks },
    });
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
    changeTaskStatus,
    changeSubTaskStatus,
    generateSubtasks,
    handleNewTaskButtonClick,
    handleEditTaskButtonClick,
    handleDeleteTaskButtonClick,
    handleCloseModal,
  };
};
