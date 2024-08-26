import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface StatisticProgressProps {
  title: string;
  description: string;
  value: number;
  percentageDescription: string;
  progressValue: number;
}

export const StatisticProgress = ({
  description,
  title,
  value,
  percentageDescription,
  progressValue,
}: StatisticProgressProps) => {
  return (
    <Card x-chunk="dashboard-05-chunk-2 ">
      <CardHeader className="pb-2">
        <CardDescription>{description}</CardDescription>
        <CardTitle className="text-4xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">
          {percentageDescription}
        </div>
      </CardContent>
      <CardFooter>
        <Progress value={progressValue} aria-label="12% increase" />
      </CardFooter>
    </Card>
  );
};
