"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideSparkles } from "lucide-react";
import { useFetch } from "@/hooks/useFetch";
import { useTaskManager } from "../provider";

type AiIntegrationButtonProps = {
  text: string;
  taskId: string;
} & React.ComponentProps<"button">;

export default function AiIntegrationButton({
  className,
  text,
  taskId,
}: AiIntegrationButtonProps) {
  const { state } = useTaskManager();
  const task = state.tasks.find((task) => task.id === taskId);
  const { status, data, error, mutation } = useFetch();

  const handleClick = () => mutation("/api/ai", { query: "Hello World" });
  console.log(data);
  return (
    <>
      <Button
        onClick={handleClick}
        className={cn(
          "text-violet-500 hover:text-violet-600 hover:bg-violet-50 hover:border-violet-200",
          className
        )}
        variant="outline"
        size="sm"
      >
        <LucideSparkles />
        {text}
      </Button>
    </>
  );
}
