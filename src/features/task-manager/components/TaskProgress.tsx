import { cn } from "@/lib/utils";
import { SubTask } from "../types/task-manager.types";

type Props = {
  subTasks?: SubTask[];
};

export default function TaskProgress({ subTasks }: Props) {
  if (!subTasks || subTasks.length === 0) return null;
  const subTasksLength = subTasks.length;
  const completedSubTaskLength = subTasks.filter(
    (subTask) => subTask.status === "completed"
  ).length;
  const totalProgress = Math.floor(
    Math.min(100, (completedSubTaskLength / subTasksLength) * 100)
  );

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline gap-4 text-sm font-medium">
        <span>Progress</span>
        <span className="text-muted-foreground">{totalProgress}% complete</span>
      </div>
      <div className="rounded-full h-2 bg-violet-50 overflow-hidden relative">
        <div
          className={cn(
            "origin-bottom-left bg-violet-500 absolute inset-0 rounded-tl-full rounded-bl-full -translate-x-full transition-transform duration-300"
          )}
          style={{
            transform: `translateX(${totalProgress}%)`,
          }}
        ></div>
      </div>
    </div>
  );
}
