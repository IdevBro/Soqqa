import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import { NumericFormat } from "react-number-format";
import "./style.scss";
import Icons from "../../../Icons/Icons";
import { useHttps } from "../../../hooks/useHttps";
import InfoHistory from "./InfoHistory";

// NumericFormat komponentasini forwardRef bilan o'rash
const ForwardedNumericFormat = React.forwardRef((props, ref) => (
  <NumericFormat {...props} ref={ref} />
));

const ForwardedSelect = React.forwardRef((props, ref) => (
  <Select {...props} ref={ref} />
));

const History = () => {
  const { data, loading, error, request } = useHttps();

  const [numberValue, setNumberValue] = useState();
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    category: 0,
    account: null,
  });

  const options = Array.isArray(data)
    ? data.map((item) => ({ value: item.id, label: item.title }))
    : [];

  useEffect(() => {
    request({
      url: "expense/all_categories/",
      method: "GET",
      body: null,
      token: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <Icons.input style={{ color: "#3075FFBF" }} />
      </components.DropdownIndicator>
    );
  };

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
    valueContainer: (provided) => ({
      ...provided,
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
    menu: (provided) => ({
      ...provided,
      borderRadius: "10px",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#000",
      fontSize: 14,
    }),
  };

  const addHistory = (event) => {
    event.preventDefault();

    // Form maydonlarini tekshirish
    if (!formData.name || !formData.category || !numberValue) {
      alert("Barcha maydonlar to'ldirilishi shart!");
      return;
    }

    const updatedData = {
      ...formData,
      price: Number(numberValue),
      account: Number(localStorage.getItem("id")),
    };

    request({
      url: "expense/add_expense/",
      method: "POST",
      body: updatedData,
    });
    request({
      url: "expense/all_categories/",
      method: "GET",

      token: true,
    });
    setFormData({
      name: "",
      price: 0,
      category: 0,
      account: null,
    });
    setNumberValue(0);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="history">
      <h2>История расходов</h2>
      <div className="create_history">
        <form className="form" onSubmit={addHistory}>
          <input
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            value={formData.name}
            className="history_name"
            type="text"
            placeholder="Введите название расхода/дохода..."
            required
          />
          <ForwardedSelect
            onChange={(selectedOption) =>
              setFormData({ ...formData, category: selectedOption.value })
            }
            value={options.find((opt) => opt.value === formData.category)}
            placeholder={"Категория"}
            options={options}
            styles={customStyles}
            components={{ DropdownIndicator, IndicatorSeparator: () => null }}
            required
          />
          <ForwardedNumericFormat
            onValueChange={(values) => setNumberValue(values.value)}
            value={numberValue}
            thousandSeparator="."
            decimalSeparator=","
            placeholder="Summani kiriting"
            required
          />
          <button type="submit">+</button>
        </form>
        <div className="table">
          <div className="title">
            <p>Название</p>
            <p>Дата</p>
            <p>Цена</p>
          </div>
          <InfoHistory />
        </div>
      </div>
    </div>
  );
};

export default History;
