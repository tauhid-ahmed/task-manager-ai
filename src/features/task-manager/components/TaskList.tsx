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
        <div className="space-y-2">
          <div className="flex gap-4 justify-end text-foreground/70 pr-4">
            <span className="text-emerald-500">
              <span className="font-medium">Completed</span> &nbsp;
              {
                state.tasks.filter((state) => state.status === "completed")
                  .length
              }
            </span>
            <span>
              <span className="font-medium">Pending</span> &nbsp;
              {state.tasks.filter((state) => state.status === "pending").length}
            </span>
          </div>
          {[...state.tasks].reverse().map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </div>
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
