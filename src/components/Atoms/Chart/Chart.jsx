import React, { useRef, useState, useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";
import "./style.scss";
import { useHttps } from "../../../hooks/useHttps";

const getRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
};

function Chart() {
  const addRef = useRef(null);

  const [data, setData] = useState([]);

  const { postData: info, getData, error, request, loading } = useHttps();

  useEffect(() => {
    request({
      url: "expense/list_category/",
      method: "GET",
      body: null,
      token: true,
    });
  }, []);

  useEffect(() => {
    if (getData) {
      const processedData = Object.entries(getData).map(([name, value]) => ({
        name,
        value: parseFloat(value), // String qiymatni foiz sifatida floatga aylantirish
        color: getRandomColor(),
      }));
      setData(processedData);
    }
  }, [getData]);

  const totalValue = data.reduce((acc, entry) => acc + entry.value, 0);

  const handleAddCategory = () => {
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </div>

      <div className="info_chart">
        {data.map((entry, index) => {
          const percentage = ((entry.value / totalValue) * 100).toFixed(2);
          return (
            <div className="chart_info" key={index}>
              <div
                className="color"
                style={{
                  backgroundColor: entry.color,
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
      <button onClick={handleAddCategory}>Add Category</button>
    </div>
  );
}

export default Chart;
