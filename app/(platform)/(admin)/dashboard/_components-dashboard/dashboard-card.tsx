import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface DashboardCardProps {
  title: string;
  description: string;
  // value: number;
  statistic: string;
}

export const DashboardCard = ({
  description,
  title,
  statistic,
}: DashboardCardProps) => {
  return (
    <Card x-chunk="dashboard-05-chunk-2 ">
      <CardHeader className="pb-2">
        <CardDescription>{description}</CardDescription>
        <CardTitle className="text-4xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">{statistic}</div>
      </CardContent>
      {/*<CardFooter>*/}
      {/*  <Progress value={progressValue} aria-label="12% increase" />*/}
      {/*</CardFooter>*/}
    </Card>
  );
};
