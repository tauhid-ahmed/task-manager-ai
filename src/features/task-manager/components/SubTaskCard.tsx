import {
  LucideSparkles,
  LucideSquare,
  LucideSquareCheckBig,
} from "lucide-react";
import { type SubTask } from "../types/task-manager.types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTaskManager } from "../provider";

type Props = {
  subTasks: SubTask[];
  taskId: string;
} & React.ComponentProps<"div">;

export default function SubTaskCard({ subTasks, taskId }: Props) {
  const { changeSubTaskStatus } = useTaskManager();
  return (
    <div className="bg-violet-50/70 p-4 mt-10 border border-violet-200/50 rounded space-y-4">
      <h3 className="flex items-center text-violet-500 font-semibold gap-2">
        <LucideSparkles /> AI Suggested Subtasks
      </h3>
      <ul className="space-y-1">
        {subTasks.map((subTask) => (
          <li className={cn("flex items-center text-sm")} key={subTask.id}>
            <Button
              onClick={() => changeSubTaskStatus(taskId, subTask.id)}
              size="icon"
              variant="ghost"
            >
              {subTask.status === "pending" ? (
                <LucideSquare size={16} />
              ) : (
                <LucideSquareCheckBig className="text-violet-500" size={16} />
              )}
            </Button>
            <span
              className={cn(
                "font-medium text-foreground/80",
                subTask.status === "completed" && "line-through"
              )}
            >
              {subTask.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
