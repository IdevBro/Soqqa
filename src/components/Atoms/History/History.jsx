import React, { useState } from "react";
import Select, { components } from "react-select";
import { NumericFormat } from "react-number-format";
import "./style.scss";
import Icons from "../../../Icons/Icons";

// NumericFormat komponentasini forwardRef bilan o'rash
const ForwardedNumericFormat = React.forwardRef((props, ref) => (
  <NumericFormat {...props} ref={ref} />
));

const ForwardedSelect = React.forwardRef((props, ref) => (
  <Select {...props} ref={ref} />
));

const History = () => {
  const [numberValue, setNumberValue] = useState();
  const [formData, setFormData] = useState({
    name: "",
    price: numberValue,
    category: "",
    account: localStorage.getItem("username"),
  });

  const options = [
    { value: "Дом", label: "Дом" },
    { value: "Онлайн покупки", label: "Онлайн покупки" },
    { value: "Автомобиль", label: "Автомобиль" },
    { value: "Еда", label: "Еда" },
  ];

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
    const updatedData = {
      ...formData,
      price: numberValue,
    };

    fetch("https://expense.uz/expense/add_expense", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "mmm",
        price: 100,
        account: 33,
        category: 3,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(`Error ${res.status}: ${text}`);
          });
        }
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.error("Xatolik yuz berdi:", error));
  };

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
          />
          <ForwardedNumericFormat
            onValueChange={(values) => setNumberValue(values.value)}
            value={numberValue}
            thousandSeparator="."
            decimalSeparator=","
            placeholder="Raqam kiriting"
          />
          <button type="submit">+</button>
        </form>
        <div className="table">
          <div className="title">
            <p>Название</p>
            <p>Дата</p>
            <p>Цена</p>
          </div>
          <div className="product">
            <p>Мохито</p>
            <p>2024/03/21</p>
            <p>-50.000 сум</p>
            <div className="product_icons">
              <div className="edit">{<Icons.edit />}</div>
              <div className="delete">{<Icons.remove />}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
