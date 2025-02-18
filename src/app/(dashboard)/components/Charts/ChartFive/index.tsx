"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart, Sector, ResponsiveContainer, Tooltip } from "recharts";

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

// Define colors for different packs
const CHART_COLORS = ["#FF5733", "#33FF57", "#3357FF"];

interface ChartData {
  name: string;
  value: number;
  fill: string;
}

const ChartFive: React.FC = () => {
  const { reportData, loading, error } = usePackingReports();
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    if (reportData.packRatios.length > 0) {
      const lastEntry = reportData.packRatios[reportData.packRatios.length - 1];

      const formattedData: ChartData[] = [
        { name: "Pack A", value: Number(lastEntry.packARatio) || 0, fill: CHART_COLORS[0] },
        { name: "Pack B", value: Number(lastEntry.packBRatio) || 0, fill: CHART_COLORS[1] },
        { name: "Pack C", value: Number(lastEntry.packCRatio) || 0, fill: CHART_COLORS[2] },
      ];

      setChartData(formattedData);
    }
  }, [reportData]);

  // ✅ FIX: Define `config` properly
  const chartConfig: ChartConfig = {
    PackA: { label: "Pack A", color: CHART_COLORS[0] },
    PackB: { label: "Pack B", color: CHART_COLORS[1] },
    PackC: { label: "Pack C", color: CHART_COLORS[2] },
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pack Ratios</CardTitle>
        <CardDescription>Distribution of pack types</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px] px-0">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Tooltip content={<ChartTooltipContent />} />
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={90}
                  strokeWidth={5}
                  activeIndex={0}
                  activeShape={({ outerRadius = 0, ...props }) => (
                    <Sector {...props} outerRadius={outerRadius + 10} />
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing pack type distribution.
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChartFive;
