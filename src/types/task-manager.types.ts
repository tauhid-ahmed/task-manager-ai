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
  subTasks?: SubTask[];
}

export type Tasks = Task[];

// ✅ State shape
export type TaskManagerState =
  | { status: "idle"; tasks: Tasks }
  | { status: "editing"; tasks: Tasks; editingTaskId: string }
  | { status: "deleting"; tasks: Tasks; deletingTaskId: string }
  | { status: "readyToAddTask"; tasks: Tasks }
  | { status: "generateSubTask"; tasks: Tasks; targetTaskId: string };

// ✅ Events
export type TaskManagerEvent =
  | { type: "ADD_TASK"; payload: { newTask: Task } }
  | { type: "DELETE_TASK"; payload: { taskId: string } }
  | { type: "EDIT_TASK"; payload: { taskId: string } }
  | {
      type: "GENERATE_SUBTASKS";
      payload: { taskId: string; subTasks: SubTask[] };
    }
  | {
      type: "REGENERATE_SUBTASKS";
      payload: { taskId: string; subTasks: SubTask[] };
    }
  | { type: "CHANGE_STATUS"; payload: { taskId: string } };
