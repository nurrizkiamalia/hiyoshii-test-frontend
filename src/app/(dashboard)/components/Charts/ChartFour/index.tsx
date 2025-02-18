"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { usePackingReports } from "@/hooks/usePacking";

// Define colors
const CHART_COLOR = "#FF5733"; // Red for reject ratio

interface ChartData {
  time: string;
  rejectionRatio: number;
}

const ChartFour: React.FC = () => {
  const { reportData, loading, error } = usePackingReports();
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    if (reportData.rejectRatio.length > 0) {
      const formattedData = reportData.rejectRatio.map((entry: any) => ({
        time: entry.timePeriod,
        rejectionRatio: Number(entry.rejectionRatio) || 0,
      }));

      setChartData(formattedData);
    }
  }, [reportData]);

  // ✅ FIX: Define `config` properly
  const chartConfig: ChartConfig = {
    rejectionRatio: { label: "Reject Ratio", color: CHART_COLOR },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reject Ratio Over Time</CardTitle>
        <CardDescription>Monitoring product rejection trends</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis domain={[0, "dataMax + 5"]} />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line
                  dataKey="rejectionRatio"
                  type="natural"
                  stroke={CHART_COLOR}
                  strokeWidth={2}
                  dot={{ fill: CHART_COLOR }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing rejection ratio over time.
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChartFour;
