import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import "./style.scss";
const data = [
  { name: "Дом", value: 100 },
  { name: "Онлайн покупки ", value: 300 },
  { name: "Автомобиль", value: 364 },
  { name: "Еда", value: 200 },
  { name: "Transport", value: 120 },
  { name: "Boshqa", value: 80 },
];
const COLORS = [
  "#9E77ED",
  "#F04438",
  "#0BA5EC",
  "#17B26A",
  "#4E5BA6",
  "#ECEFF2",
];

function Chart() {
  const totalValue = data.reduce((acc, entry) => acc + entry.value, 0);
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
                fill={COLORS[index % COLORS.length]}
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
                  backgroundColor: COLORS[index % COLORS.length],
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
    </div>
  );
}

export default Chart;
