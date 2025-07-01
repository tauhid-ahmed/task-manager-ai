import { useTaskManager } from "../provider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type Props = {
  editingMode: boolean;
};

type FormData = {
  title: string;
  description: string;
  status: "pending" | "completed";
  dueDate: string;
};

type FormBodyProps = {
  formData: FormData;
  handleInputChange: (
    name: string
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (value: "pending" | "completed") => void;
};

export default function TaskManagerForm() {
  const { state, addTask, editTask } = useTaskManager();
  const editingMode = state.status === "editing";
  const creatingMode = state.status === "creating";

  const initialData = editingMode
    ? state.tasks.find((task) => task.id === state.editingTaskId)
    : null;

  const [formData, setFormData] = useState({
    title: initialData?.title ?? "",
    description: initialData?.description ?? "",
    dueDate: initialData?.dueDate ?? "",
    status: initialData?.status ?? "pending",
  });

  const handleInputChange =
    (name: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.preventDefault();
      const value = e.target.value;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

  const handleSelectChange = (value: "pending" | "completed") =>
    setFormData((prevData) => ({ ...prevData, status: value }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTask = {
      title: formData.title,
      description: formData.description,
      status: formData.status,
      dueDate: formData.dueDate,
    };

    // it changes state to show form modal
    if (editingMode) return editTask({ updatedTask: newTask });
    if (creatingMode) return addTask({ newTask });
  };

  return (
    <div className="space-y-6">
      <FormHeader editingMode={editingMode} />
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormBody
          formData={formData}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
        />
        <FormFooter editingMode={editingMode} />
      </form>
    </div>
  );
}

function FormBody({
  formData,
  handleInputChange,
  handleSelectChange,
}: FormBodyProps) {
  return (
    <div className="space-y-5">
      <InputContainer>
        <Label>Title</Label>
        <Input
          value={formData.title}
          onChange={handleInputChange("title")}
          placeholder="Enter task title"
        />
      </InputContainer>
      <InputContainer>
        <Label>Description</Label>
        <Textarea
          value={formData.description}
          onChange={handleInputChange("description")}
          className="min-h-24"
          placeholder="Enter task description"
        />
      </InputContainer>
      <div className="flex gap-4 [&>*]:flex-1">
        <InputContainer>
          <Label>Status</Label>
          <Select value={formData.status} onValueChange={handleSelectChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </InputContainer>
        <InputContainer>
          <Label>Due Date</Label>
          <Input
            value={formData.dueDate}
            onChange={handleInputChange("dueDate")}
            type="date"
          />
        </InputContainer>
      </div>
    </div>
  );
}

function FormHeader({ editingMode }: Props) {
  return (
    <div>
      <h2 className="text-2xl font-semibold">
        {editingMode ? "Edit Task" : "New Task"}
      </h2>
      <p className="text-sm text-muted-foreground">
        {editingMode
          ? "Make changes to your task below. Don’t forget to save!"
          : "Fill in the details to create a new task."}
      </p>
    </div>
  );
}

function FormFooter({ editingMode }: Props) {
  const { handleCloseModal } = useTaskManager();
  return (
    <div className="flex justify-end gap-4">
      <Button onClick={handleCloseModal} type="button" variant="outline">
        Cancel
      </Button>
      <Button type="submit">
        {editingMode ? "Save Changes" : "Create Task"}
      </Button>
    </div>
  );
}

function InputContainer({ children }: React.PropsWithChildren) {
  return <div className="space-y-2">{children}</div>;
}
