import React, { useEffect } from "react";
import "./style.scss";
import { useHttps } from "../../hooks/useHttps";
const Income = () => {
  const { getData, error, request, loading } = useHttps();
  useEffect(() => {
    request({
      url: "expense/income/",
      method: "GET",
      body: null,
      token: true,
    });
  }, []);
  console.log();
  return (
    <div className="fasterCard">
      <p className="sumName">Доход</p>
      <p className="sumValue">{getData?.Income}</p>
    </div>
  );
};

export default Income;
