import {
  LucideCalendar,
  LucideCircle,
  LucideCircleCheck,
  LucideEdit,
  LucideTrash,
} from "lucide-react";
import { type Task } from "../types/task-manager.types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useTaskManager } from "../provider";
import { Badge } from "@/components/ui/badge";
import SubTaskCard from "./SubTaskCard";
import TaskProgress from "./TaskProgress";
import AiIntegrationButton from "./AiIntegrationButton";

type TaskProps = { task: Task } & React.ComponentProps<"div">;

export default function Task({ task }: TaskProps) {
  const {
    changeTaskStatus,
    handleEditTaskButtonClick,
    handleDeleteTaskButtonClick,
  } = useTaskManager();

  return (
    <Card>
      <CardContent className="space-y-4">
        <div className="flex gap-2 cursor-pointer">
          <div
            onClick={() => {
              changeTaskStatus(task.id);
            }}
            className="flex gap-2 flex-1"
          >
            <div className="mt-1.5">
              {task.status === "pending" ? (
                <LucideCircle className="text-secondary-foreground" />
              ) : (
                <LucideCircleCheck className="text-emerald-500" />
              )}
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg">{task.title}</CardTitle>
              <p>{task.description}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleEditTaskButtonClick(task.id)}
            >
              <LucideEdit />
            </Button>
            <Button
              onClick={() => handleDeleteTaskButtonClick(task.id)}
              variant="ghost"
              size="icon"
            >
              <LucideTrash />
            </Button>
          </div>
        </div>
        <TaskProgress subTasks={task?.subTasks} />
        <div className="flex gap-4 items-baseline">
          <Badge
            onClick={() => {
              changeTaskStatus(task.id);
            }}
            className="capitalize cursor-pointer"
            variant={task.status === "pending" ? "outline" : "default"}
          >
            {task.status}
          </Badge>
          <Badge variant="outline" className="flex items-baseline gap-1">
            <LucideCalendar className="translate-y-px" size={16} />
            {task.dueDate}
          </Badge>
          <AiIntegrationButton text="Suggest Subtasks" className="ml-auto" />
        </div>
        {task.subTasks && (
          <SubTaskCard taskId={task.id} subTasks={task?.subTasks} />
        )}
      </CardContent>
    </Card>
  );
}
