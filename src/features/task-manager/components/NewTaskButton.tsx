"use client";

import { Button } from "@/components/ui/button";
import { LucidePlus } from "lucide-react";
import { useTaskManager } from "../provider";

export default function NewTaskButton({ ...props }) {
  const { handleNewTaskButtonClick } = useTaskManager();
  return (
    <Button onClick={handleNewTaskButtonClick} {...props}>
      <LucidePlus />
      Add New Task
    </Button>
  );
}
