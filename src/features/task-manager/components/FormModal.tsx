"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import TaskManagerForm from "./TaskManagerForm";
import { useTaskManager } from "../provider";

export default function Modal() {
  const { state, handleCloseModal } = useTaskManager();
  const { status } = state;
  const openModal = status === "creating" || status === "editing";

  return (
    <Dialog open={openModal} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogTitle className="absolute -left-[9999px] h-px overflow-hidden">
          Task Manager Modal
        </DialogTitle>
        <TaskManagerForm />
      </DialogContent>
    </Dialog>
  );
}
