"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideSparkles } from "lucide-react";
import { useFetch } from "@/hooks/useFetch";
import { useTaskManager } from "../provider";
import { useEffect } from "react";
import { type SubTask } from "../types/task-manager.types";

type AiIntegrationButtonProps = {
  text: string;
  taskId: string;
} & React.ComponentProps<"button">;

export default function AiIntegrationButton({
  text,
  taskId,
}: AiIntegrationButtonProps) {
  const { state, generateSubtasks } = useTaskManager();
  const { status, data, mutation } = useFetch<{ subtasks: string[] }>();
  const task = state.tasks.find((task) => task.id === taskId);

  const handleClick = () => {
    if (!task) return;
    mutation("/api/ai", { query: task?.title });
  };

  useEffect(() => {
    if (data) {
      const subTasks: SubTask[] = data.subtasks.map((subTask) => ({
        id: crypto.randomUUID(),
        title: subTask,
        status: "pending",
      }));
      generateSubtasks(taskId, subTasks);
    }
  }, [data, taskId, generateSubtasks]);

  return (
    <>
      <Button
        onClick={handleClick}
        className={cn(
          "text-violet-500 hover:text-violet-600 hover:bg-violet-50 hover:border-violet-200",
          status === "isLoading" && "animate-caret-blink"
        )}
        disabled={status === "isLoading"}
        variant="outline"
        size="sm"
      >
        <LucideSparkles />
        {text}
      </Button>
    </>
  );
}
