import React, { useEffect } from "react";
import { useHttps } from "../../hooks/useHttps";
import "./style.scss";
const Spending = () => {
  const { getData, error, request, loading } = useHttps();
  useEffect(() => {
    request({
      url: "expense/spending/",
      method: "GET",
      body: null,
      token: true,
    });
  }, []);
  return (
    <div className="fasterCard spending">
      <p className="sumName">Расход</p>
      <p className="sumValue">{getData?.Spending}</p>
    </div>
  );
};

export default Spending;
