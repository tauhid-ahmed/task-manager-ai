import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideSparkles } from "lucide-react";

type AiIntegrationButtonProps = {
  text: string;
} & React.ComponentProps<"button">;

export default function AiIntegrationButton({
  className,
  text,
}: AiIntegrationButtonProps) {
  return (
    <Button
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
  );
}
