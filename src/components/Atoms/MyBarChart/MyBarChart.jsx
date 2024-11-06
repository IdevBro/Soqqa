import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useHttps } from "../../../hooks/useHttps";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import "./style.css";

const customStyles = {
  control: (provided) => ({
    ...provided,
    padding: "0px",
    border: "none",
    backgroundColor: "transparent",
    borderRadius: "10px",
    boxShadow: "none",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "rgba(48, 117, 255, 0.75)",
    fontSize: "14px",
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: 14,
    backgroundColor: state.isSelected ? "rgba(239, 246, 255, 1)" : "#fff",
    color: state.isSelected ? "rgba(48, 117, 255, 0.75)" : "#3075FFBF",
    "&:hover": {
      backgroundColor: "#ECEFF2",
    },
  }),
};

const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const MyXAxis = ({ dataKey, ...props }) => (
  <XAxis dataKey={dataKey} {...props} />
);
const MyYAxis = ({ tickFormatter = formatNumber, ...props }) => (
  <YAxis tickFormatter={tickFormatter} {...props} />
);

function MyBarChart() {
  const { getData, request, loading, error } = useHttps();
  const [monthlyData, setMonthlyData] = useState({});
  const [selectedMonth, setSelectedMonth] = useState("October");

  useEffect(() => {
    request({
      url: "expense/spending_by_day/",
      method: "GET",
      body: null,
      token: true,
    });
  }, []);

  useEffect(() => {
    if (getData) {
      const processedData = Object.entries(getData).map(([day, sum]) => ({
        day,
        sum,
      }));
      setMonthlyData((prevData) => ({
        ...prevData,
        [selectedMonth]: processedData,
      }));
    }
  }, [getData, selectedMonth]);

  const data = monthlyData[selectedMonth] || [];

  const monthOptions = Object.keys(monthlyData).map((month) => ({
    value: month,
    label: month,
  }));

  const handleMonthChange = (selectedOption) => {
    setSelectedMonth(selectedOption.value);
  };

  return (
    <div className="bar_chart">
      <div
        className="monthName"
        style={{ display: "flex", alignItems: "center", columnGap: "20px" }}
      >
        <h3>{selectedMonth}</h3>
        <Select
          value={monthOptions.find((opt) => opt.value === selectedMonth)}
          onChange={handleMonthChange}
          options={monthOptions}
          styles={customStyles}
          placeholder="Select Month"
        />
      </div>
      <BarChart
        style={{ padding: "2px" }}
        width={1100}
        height={256}
        data={data}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <MyXAxis dataKey="day" />
        <MyYAxis />
        <Tooltip formatter={(sum) => `-${formatNumber(sum)}`} />
        <Legend />
        <Bar dataKey="sum" fill="#155EEF" style={{ width: "35px" }} />
      </BarChart>
    </div>
  );
}

export default MyBarChart;
