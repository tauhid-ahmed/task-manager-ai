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
import { useState } from "react";

type TaskProps = { task: Task } & React.ComponentProps<"div">;

export default function Task({ task }: TaskProps) {
  const [showSubTasks, setShowSubTasks] = useState(false);
  const {
    changeTaskStatus,
    handleEditTaskButtonClick,
    handleDeleteTaskButtonClick,
  } = useTaskManager();

  const hasSubTasks = task.subTasks.length > 0;

  return (
    <Card>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <div className="flex gap-2 flex-1">
            <Button
              onClick={() => {
                changeTaskStatus(task.id);
              }}
              size="icon"
              variant="ghost"
            >
              {task.status === "pending" ? (
                <LucideCircle className="text-secondary-foreground" />
              ) : (
                <LucideCircleCheck className="text-emerald-500" />
              )}
            </Button>
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
        <div className="flex items-baseline gap-4 flex-wrap">
          <div className="flex gap-4 items-baseline mr-auto">
            <Badge
              className="capitalize"
              variant={task.status === "pending" ? "outline" : "secondary"}
            >
              {task.status}
            </Badge>
            <Badge variant="secondary" className="flex items-baseline gap-1">
              <LucideCalendar className="translate-y-px" size={16} />
              {task.dueDate}
            </Badge>
          </div>
          <div className="flex gap-2 items-center">
            {hasSubTasks && (
              <SubtaskVisibilityButton
                show={showSubTasks}
                setShow={() => setShowSubTasks((prev) => !prev)}
                subTaskLength={task.subTasks.length}
              />
            )}
            <AiIntegrationButton
              text={hasSubTasks ? "Regenerate Subtasks" : "Generate Subtasks"}
              taskId={task.id}
            />
          </div>
        </div>
        {hasSubTasks && showSubTasks && (
          <SubTaskCard taskId={task.id} subTasks={task.subTasks} />
        )}
      </CardContent>
    </Card>
  );
}

function SubtaskVisibilityButton({
  show,
  setShow,
  subTaskLength,
}: {
  show: boolean;
  setShow: () => void;
  subTaskLength: number;
}) {
  return (
    <Button
      className="text-muted-foreground"
      onClick={setShow}
      variant="outline"
      size="sm"
    >
      {show ? "Hide" : "Show"} Subtask {subTaskLength}
    </Button>
  );
}
