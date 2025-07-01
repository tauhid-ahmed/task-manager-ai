"use client";
import { useTaskManager } from "../provider";
import Task from "./TaskCard";

export default function TaskList() {
  const { state } = useTaskManager();
  return (
    <div className="flex flex-col gap-8">
      {state.tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
}
