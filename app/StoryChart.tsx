"use client";
import { Card } from "@radix-ui/themes";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}
const StoryChart = ({ open, inProgress, closed }: Props) => {
  const data = [
    { label: "Open", value: open },
    { label: "In Progress", value: inProgress },
    { label: "Closed", value: closed },
  ];
  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar
            dataKey="value"
            fill="#8884d8"
            barSize={40}
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Tooltip wrapperStyle={{ width: "100px", backgroundColor: "#eed" }} />
          <Legend />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default StoryChart;
