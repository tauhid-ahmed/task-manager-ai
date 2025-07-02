"use client";
import { useTaskManager } from "../provider";
import Task from "./TaskCard";
import { LucidePlusCircle } from "lucide-react";

export default function TaskList() {
  const { state } = useTaskManager();
  return (
    <div className="flex flex-col gap-8">
      {state.tasks.length < 1 ? (
        <EmptyTaskList />
      ) : (
        [...state.tasks]
          .reverse()
          .map((task) => <Task key={task.id} task={task} />)
      )}
    </div>
  );
}

function EmptyTaskList() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center text-muted-foreground">
      <LucidePlusCircle className="w-10 h-10 text-primary" />
      <div>
        <h2 className="text-xl font-semibold text-foreground">No tasks yet</h2>
        <p className="text-sm">
          Start by creating your first task. Stay organized and get things done!
        </p>
      </div>
    </div>
  );
}
