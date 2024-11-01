// import React, { useState, useEffect } from "react";
// import Select from "react-select";
// import { useHttps } from "../../../hooks/useHttps";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   Legend,
// } from "recharts";
// import "./style.css";

// const customStyles = {
//   control: (provided) => ({
//     ...provided,
//     padding: "0px",
//     border: "none",
//     backgroundColor: "transparent",
//     borderRadius: "10px",
//     boxShadow: "none",
//   }),
//   placeholder: (provided) => ({
//     ...provided,
//     color: "rgba(48, 117, 255, 0.75)",
//     fontSize: "14px",
//   }),
//   option: (provided, state) => ({
//     ...provided,
//     fontSize: 14,
//     backgroundColor: state.isSelected ? "rgba(239, 246, 255, 1)" : "#fff",
//     color: state.isSelected ? "rgba(48, 117, 255, 0.75)" : "#3075FFBF",
//     "&:hover": {
//       backgroundColor: "#ECEFF2",
//     },
//   }),
// };

// const monthlyData = {
//   October: [
//     { day: "1", sum: 180046 },
//     { day: "2", sum: 259825 },
//     { day: "3", sum: 316103 },
//     { day: "4", sum: 198923 },
//     { day: "5", sum: 253771 },
//     { day: "6", sum: 107027 },
//     { day: "7", sum: 164427 },
//     { day: "8", sum: 117619 },
//     { day: "9", sum: 257164 },
//     { day: "10", sum: 229754 },
//     { day: "11", sum: 291227 },
//     { day: "12", sum: 168495 },
//     { day: "13", sum: 254586 },
//     { day: "14", sum: 82263 },
//     { day: "15", sum: 114933 },
//     { day: "16", sum: 225270 },
//     { day: "17", sum: 109990 },
//     { day: "18", sum: 236455 },
//     { day: "19", sum: 136811 },
//     { day: "20", sum: 136581 },
//     { day: "21", sum: 58211 },
//     { day: "22", sum: 311754 },
//     { day: "23", sum: 231610 },
//     { day: "24", sum: 141812 },
//     { day: "25", sum: 61302 },
//     { day: "26", sum: 135963 },
//     { day: "27", sum: 270437 },
//     { day: "28", sum: 301427 },
//     { day: "29", sum: 117775 },
//     { day: "30", sum: 309140 },
//   ],
// };

// const formatNumber = (num) => {
//   return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
// };

// const MyXAxis = ({ dataKey, ...props }) => (
//   <XAxis dataKey={dataKey} {...props} />
// );
// const MyYAxis = ({ tickFormatter = formatNumber, ...props }) => (
//   <YAxis tickFormatter={tickFormatter} {...props} />
// );
// s;

// function MyBarChart() {
//   const { postData: info, getData, error, request, loading } = useHttps();
//   useEffect(() => {
//     request({
//       url: "expense/list_category/",
//       method: "GET",
//       body: null,
//       token: true,
//     });
//   }, []);

//   useEffect(() => {
//     if (getData) {
//       const processedData = Object.entries(getData).map(([day, sum]) => ({
//         day,
//         sum,
//       }));
//     }
//   }, [getData]);

//   const [selectedMonth, setSelectedMonth] = useState("October");
//   const data = monthlyData[selectedMonth] || []; // data ni e'lon qilish

//   const monthOptions = Object.keys(monthlyData).map((month) => ({
//     sum: month,
//     label: month,
//   }));

//   const handleMonthChange = (selectedOption) => {
//     setSelectedMonth(selectedOption.sum);
//   };

//   return (
//     <div className="bar_chart">
//       <div
//         className="monthName"
//         style={{ display: "flex", alignItems: "center", columnGap: "20px" }}
//       >
//         <h3>{selectedMonth}</h3>
//         <Select
//           sum={monthOptions.find((opt) => opt.sum === selectedMonth)}
//           onChange={handleMonthChange}
//           options={monthOptions}
//           styles={customStyles}
//           placeholder="Select Month"
//         />
//       </div>
//       <BarChart
//         style={{ padding: "2px" }}
//         width={1100}
//         height={256}
//         data={data}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <MyXAxis dataKey="day" />
//         <MyYAxis />
//         <Tooltip formatter={(sum) => `${formatNumber(sum)}`} />
//         <Legend />
//         <Bar dataKey="sum" fill="#155EEF" />
//       </BarChart>
//     </div>
//   );
// }

// export default MyBarChart;

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

const monthlyDataTemplate = {
  October: [],
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
  const { postData: info, getData, error, request, loading } = useHttps();
  const [monthlyData, setMonthlyData] = useState(monthlyDataTemplate);

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
      // Assuming getData is an array of objects with day and sum
      const processedData = Object.entries(getData).map(([day, sum]) => ({
        day: day,
        sum: sum,
      }));
      setMonthlyData((prevData) => ({
        ...prevData,
        [selectedMonth]: processedData, // Update the current month's data
      }));
    }
  }, [getData]);

  const [selectedMonth, setSelectedMonth] = useState("October");
  const data = monthlyData[selectedMonth] || []; // Use updated monthlyData

  const monthOptions = Object.keys(monthlyDataTemplate).map((month) => ({
    sum: month,
    label: month,
  }));

  const handleMonthChange = (selectedOption) => {
    setSelectedMonth(selectedOption.sum);
  };

  return (
    <div className="bar_chart">
      <div
        className="monthName"
        style={{ display: "flex", alignItems: "center", columnGap: "20px" }}
      >
        <h3>{selectedMonth}</h3>
        <Select
          sum={monthOptions.find((opt) => opt.sum === selectedMonth)}
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
        <Tooltip formatter={(sum) => `${formatNumber(sum)}`} />
        <Legend />
        <Bar dataKey="sum" fill="#155EEF" style={{ width: "35px" }} />
      </BarChart>
    </div>
  );
}

export default MyBarChart;
