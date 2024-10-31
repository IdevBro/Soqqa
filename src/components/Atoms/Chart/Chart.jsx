import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import { useRef, useState } from "react";
import "./style.scss";
import { useHttps } from "../../../hooks/useHttps";

// Tasodifiy ranglarni yaratish uchun funksiya
const getRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
};

function Chart() {
  const addRef = useRef(null);
  const [data] = useState([
    { name: "Дом", value: 100, color: "#9E77ED" },
    { name: "Онлайн покупки", value: 300, color: "#F04438" },
    { name: "Автомобиль", value: 364, color: "#0BA5EC" },
    { name: "Еда", value: 200, color: "#17B26A" },
    { name: "Transport", value: 120, color: "#4E5BA6" },
    { name: "Boshqa", value: 80, color: "#ECEFF2" },
  ]);

  const totalValue = data.reduce((acc, entry) => acc + entry.value, 0);

  const { postData: info, error, request, loading } = useHttps();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const addCategory = () => {
    if (addRef.current.value) {
      request({
        url: `expense/add_category/`,
        method: "POST",
        body: {
          title: addRef.current.value,
          account: localStorage.getItem("id"),
        },
      });
      addRef.current.value = ""; // Inputni tozalash
    }
  };

  return (
    <div>
      <div className="chart_box">
        <PieChart width={240} height={240}>
          <Pie
            data={data}
            cx={120}
            cy={120}
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={0}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color} // Endi ranglar dinamik ravishda tanlanadi
              />
            ))}
          </Pie>
        </PieChart>
      </div>

      <div className="info_chart">
        {data.map((entry, index) => {
          const percentage = ((entry.value / totalValue) * 100).toFixed(2); // Foizni hisoblash
          return (
            <div className="chart_info" key={index}>
              <div
                className="color"
                style={{
                  backgroundColor: entry.color, // Dinamik rang
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                }}
              ></div>
              <div className="chart_parcent">
                <p>{entry.name}</p>
                <p className="parcent"> {percentage}%</p>
              </div>
            </div>
          );
        })}
      </div>
      <input ref={addRef} type="text" placeholder="Add new category" />
      <button onClick={addCategory}>Add Category</button>
    </div>
  );
}

export default Chart;
