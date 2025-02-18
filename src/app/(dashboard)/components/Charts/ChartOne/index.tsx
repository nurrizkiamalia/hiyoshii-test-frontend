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

// Define chart colors for each PIC dynamically
const CHART_COLORS = ["#FF5733", "#33FF57", "#3357FF", "#FFC300", "#C70039"]; // Colors for different PICs

const ChartOne: React.FC = () => {
  const { reportData, loading, error } = usePackingReports();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (reportData.qtyByPIC.length > 0) {
      console.log("Raw data from API:", reportData.qtyByPIC); // Debugging the raw API response

      // Group data by timePeriod and stack the quantities for each PIC
      const groupedData = reportData.qtyByPIC.reduce((acc: any, entry: any) => {
        const { timePeriod, identifier, totalQuantity } = entry;

        // If the timePeriod doesn't exist, create it
        if (!acc[timePeriod]) {
          acc[timePeriod] = {
            time: timePeriod,
          };
        }

        // Add the totalQuantity to the respective PIC
        acc[timePeriod][identifier] = totalQuantity;

        return acc;
      }, {});

      // Convert the grouped data into an array
      const formattedData = Object.values(groupedData);

      console.log("Formatted data:", formattedData); // Checking the formatted data

      setChartData(formattedData);
    } else {
      console.warn("No data found for qtyByPIC");
    }
  }, [reportData]);

  // Define chart configuration for dynamic bars based on the available PICs
  const chartConfig: ChartConfig = chartData.length
    ? Object.keys(chartData[0])
        .filter((key) => key !== "time") // Exclude the "time" key from dynamic mapping
        .reduce(
          (acc, key, index) => ({
            ...acc,
            [key]: { label: key, color: CHART_COLORS[index % CHART_COLORS.length] },
          }),
          {}
        )
    : {};

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quantity Per-PIC / Jam</CardTitle>
        <CardDescription>Hourly production quantity by PIC</CardDescription>
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

                {/* Dynamically create bars for each PIC */}
                {Object.keys(chartConfig).map((key) => (
                  <Bar
                    key={key}
                    dataKey={key}
                    fill={chartConfig[key].color}
                    radius={4}
                    stackId="a" // Ensure the bars are stacked
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing hourly accumulated quantity per PIC.
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChartOne;
