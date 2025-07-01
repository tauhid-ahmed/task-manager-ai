import {
  FormModal,
  NewTaskButton,
  TaskDeleteModal,
  TaskList,
} from "@/features/task-manager/components";
import TaskManagerProvider from "@/features/task-manager/provider";

export default function Home() {
  return (
    <TaskManagerProvider>
      <div className="max-w-5xl mx-auto px-6">
        <div className="mt-10">
          <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-bold">
            Smart Task Manager with AI Assistance
          </h1>
          <p className="text-lg lg:text-xl">
            Organize your work with AI-powered subtask suggestions
          </p>
          <NewTaskButton className="mt-4" />
        </div>
        <div className="mt-16">
          <TaskList />
        </div>
      </div>
      <FormModal />
      <TaskDeleteModal />
    </TaskManagerProvider>
  );
}
