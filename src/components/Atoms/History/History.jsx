import React, { useState } from "react";
import Select, { components } from "react-select";
import { NumericFormat } from "react-number-format"; // NumberFormat o'rniga NumericFormat'dan foydalanamiz
import "./style.scss";
import Icons from "../../../Icons/Icons";

const History = () => {
  const [numberValue, setNumberValue] = useState();
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
      fontSize: "14px", // Rangni o'zingiz xohlagan rangga o'zgartiring
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

  return (
    <div className="history">
      <h2>История расходов</h2>
      <div className="create_history">
        <form>
          <input
            className="history_name"
            type="text"
            placeholder="Введите название расхода/дохода..."
          />
          <Select
            placeholder={"Категория"}
            options={options}
            styles={customStyles}
            components={{ DropdownIndicator, IndicatorSeparator: () => null }}
          />
          <NumericFormat
            value={numberValue}
            onValueChange={(values) => setNumberValue(values.value)}
            thousandSeparator="."
            decimalSeparator=","
            placeholder="Raqam kiriting"
          />
          <button>+</button>
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
