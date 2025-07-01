import { useTaskManager } from "../provider";

export default function TaskDeleteConfirm() {
  const { state } = useTaskManager();
  if (state.status !== "deleting") return null;
  return <div>TaskDeleteConfirm</div>;
}
