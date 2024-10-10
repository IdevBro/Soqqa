import React from "react";
import "./style.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const data = [
  { day: "1", value: 320000 },
  { day: "2", value: 50000 },
  { day: "3", value: 250000 },
  { day: "4", value: 150000 },
  { day: "5", value: 320000 },
  { day: "6", value: 150000 },
  { day: "7", value: 210000 },
  { day: "8", value: 150000 },
  { day: "9", value: 150000 },
  { day: "10", value: 230000 },
  { day: "11", value: 150000 },
  { day: "12", value: 0 },
  { day: "13", value: 150000 },
  { day: "14", value: 150000 },
  { day: "15", value: 170000 },
  { day: "16", value: 180000 },
  { day: "17", value: 150000 },
  { day: "18", value: 150000 },
  { day: "19", value: 140000 },
  { day: "20", value: 150000 },
  { day: "21", value: 160000 },
  { day: "22", value: 150000 },
  { day: "23", value: 150000 },
  { day: "24", value: 240000 },
  { day: "25", value: 150000 },
  { day: "26", value: 0 },
  { day: "27", value: 150000 },
  { day: "28", value: 150000 },
  { day: "29", value: 230000 },
  { day: "30", value: 150000 },
  { day: "31", value: 180000 },
];

const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const MyXAxis = ({ dataKey, ...props }) => {
  return <XAxis dataKey={dataKey} {...props} />;
};

const MyYAxis = ({ tickFormatter = formatNumber, ...props }) => {
  return <YAxis tickFormatter={tickFormatter} {...props} />;
};

function MyBarChart() {
  return (
    <div className="bar_chart">
      <h3>September</h3>
      <BarChart
        style={{ padding: "2px" }}
        width={1100}
        height={256}
        data={data}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <MyXAxis dataKey="day" />
        <MyYAxis />
        <Tooltip formatter={(value) => `${formatNumber(value)}`} />
        <Legend />
        <Bar dataKey="value" fill="#155EEF" />
      </BarChart>
    </div>
  );
}

export default MyBarChart;
