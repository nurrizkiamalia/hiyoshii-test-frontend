"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

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

// Define colors for different PICs
const CHART_COLORS = ["#FF5733", "#33FF57", "#3357FF", "#FFC300", "#C70039"];

interface ChartData {
  time: string;
  [pic: string]: number | string;
}

const ChartThree: React.FC = () => {
  const { reportData, loading, error } = usePackingReports();
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [picList, setPicList] = useState<string[]>([]);

  useEffect(() => {
    if (reportData.productivityByPIC.length > 0) {
      // Extract unique PICs
      const uniquePics = Array.from(new Set(reportData.productivityByPIC.map((entry: any) => entry.pic)));

      // Format data
      const formattedData: ChartData[] = reportData.productivityByPIC.reduce((acc: ChartData[], entry: any) => {
        const existing = acc.find((item) => item.time === entry.timePeriod);
        if (existing) {
          existing[entry.pic] = Number(entry.productivityPerHour) || 0;
        } else {
          acc.push({
            time: entry.timePeriod,
            [entry.pic]: Number(entry.productivityPerHour) || 0,
          });
        }
        return acc;
      }, []);

      setPicList(uniquePics);
      setChartData(formattedData);
    }
  }, [reportData]);

  // ✅ FIX: Define `config` properly
  const chartConfig: ChartConfig = picList.reduce(
    (acc, pic, index) => ({
      ...acc,
      [pic]: { label: pic, color: CHART_COLORS[index % CHART_COLORS.length] },
    }),
    {}
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Productivity Per PIC (Multiple Line)</CardTitle>
        <CardDescription>Hourly Productivity by PIC</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                {picList.map((pic, index) => (
                  <Line key={pic} type="monotone" dataKey={pic} stroke={CHART_COLORS[index % CHART_COLORS.length]} strokeWidth={2} />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter>
        <div className="text-muted-foreground">
          Showing hourly productivity per PIC.
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChartThree;
