// ✅ Task Status
export type TaskStatus = "pending" | "completed";

// ✅ SubTask
export interface SubTask {
  id: string;
  title: string;
  status: TaskStatus;
}

// ✅ Task
export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
  subTasks: SubTask[] | [];
}

export type NewTask = Omit<Task, "id" | "subTasks">;

export type Tasks = Task[];

// ✅ State shape
export type TaskManagerState =
  | { status: "idle"; tasks: Tasks }
  | { status: "creating"; tasks: Tasks }
  | { status: "editing"; tasks: Tasks; editingTaskId: string }
  | { status: "deleting"; tasks: Tasks; deletingTaskId: string }
  | { status: "generateSubTask"; tasks: Tasks; targetTaskId: string };

// ✅ Events
export type TaskManagerEvent =
  | { type: "ADD_TASK_BUTTON_CLICKED" }
  | { type: "ADD_TASK"; payload: { newTask: NewTask } }
  | { type: "DELETE_BUTTON_CLICKED"; payload: { taskId: string } }
  | { type: "DELETE_TASK" }
  | { type: "EDIT_BUTTON_CLICKED"; payload: { taskId: string } }
  | { type: "UPDATE_TASK"; payload: { updatedTask: NewTask } }
  | {
      type: "GENERATE_SUBTASKS";
      payload: { taskId: string; subTasks: SubTask[] };
    }
  | { type: "CHANGE_TASK_STATUS"; payload: { taskId: string } }
  | {
      type: "CHANGE_SUBTASK_STATUS";
      payload: { taskId: string; subTaskId: string };
    }
  | {
      type: "CLOSE_MODAL";
    };
