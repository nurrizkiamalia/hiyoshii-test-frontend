"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

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

// Define chart colors dynamically
const CHART_COLORS = ["#FF5733", "#33FF57", "#3357FF"]; // Colors for Pack A, Pack B, Pack C

const ChartTwo: React.FC = () => {
  const { reportData, loading, error } = usePackingReports();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (reportData.qtyByPackModel.length > 0) {
      console.log("Raw data from API:", reportData.qtyByPackModel); // Debugging the raw API response

      // Group data by timePeriod and stack the quantities for Pack A, Pack B, and Pack C
      const groupedData = reportData.qtyByPackModel.reduce((acc: any, entry: any) => {
        const { timePeriod, identifier, totalQuantity } = entry;
        
        // If the timePeriod doesn't exist, create it
        if (!acc[timePeriod]) {
          acc[timePeriod] = {
            time: timePeriod,
            qtyPackA: 0,
            qtyPackB: 0,
            qtyPackC: 0,
          };
        }
        
        // Add the totalQuantity to the respective pack model
        if (identifier === "Pack A") {
          acc[timePeriod].qtyPackA = totalQuantity;
        } else if (identifier === "Pack B") {
          acc[timePeriod].qtyPackB = totalQuantity;
        } else if (identifier === "Pack C") {
          acc[timePeriod].qtyPackC = totalQuantity;
        }

        return acc;
      }, {});

      // Convert the grouped data into an array
      const formattedData = Object.values(groupedData);

      console.log("Formatted data:", formattedData); // Checking the formatted data

      setChartData(formattedData);
    } else {
      console.warn("No data found for qtyByPackModel");
    }
  }, [reportData]);

  // Define chart configuration for dynamic bars based on the available pack models
  const chartConfig: ChartConfig = chartData.length
    ? {
        qtyPackA: { label: "Pack A", color: CHART_COLORS[0] },
        qtyPackB: { label: "Pack B", color: CHART_COLORS[1] },
        qtyPackC: { label: "Pack C", color: CHART_COLORS[2] },
      }
    : {};

  return (
    <Card>
      <CardHeader>
        <CardTitle>Qty Accumulation Per Pack</CardTitle>
        <CardDescription>Hourly accumulated quantity by pack type</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="time" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />

                {/* Stacked bars for each pack model */}
                <Bar dataKey="qtyPackA" stackId="a" fill={CHART_COLORS[0]} radius={4} />
                <Bar dataKey="qtyPackB" stackId="a" fill={CHART_COLORS[1]} radius={4} />
                <Bar dataKey="qtyPackC" stackId="a" fill={CHART_COLORS[2]} radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing hourly accumulated quantity per pack type.
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChartTwo;
