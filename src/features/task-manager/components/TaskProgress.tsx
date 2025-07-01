import { SubTask } from "../types/task-manager.types";

type Props = {
  subTasks?: SubTask[];
};

export default function TaskProgress({ subTasks }: Props) {
  console.log(subTasks);
  if (!subTasks || subTasks.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline gap-4 text-sm font-medium">
        <span>Progress</span>
        <span className="text-muted-foreground">100% complete</span>
      </div>
      <div className="rounded-full h-2 bg-violet-50 overflow-hidden relative">
        <div className="origin-bottom-left scale-x-10 bg-violet-500 absolute inset-0 rounded-tl-full rounded-bl-full"></div>
      </div>
    </div>
  );
}
