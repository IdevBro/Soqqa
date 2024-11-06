import React, { useEffect } from "react";
import { useHttps } from "../../hooks/useHttps";

import "./style.scss";
const Balance = () => {
  const { getData, error, request, loading } = useHttps();
  useEffect(() => {
    request({
      url: "expense/balance/",
      method: "GET",
      body: null,
      token: true,
    });
  }, []);

  return (
    <div className="fasterCard">
      <p className="sumName">Баланс</p>
      <p className="sumValue">{getData?.Balance}</p>
    </div>
  );
};

export default Balance;
