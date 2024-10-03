import "./style.scss";
import Icons from "../../../Icons/Icons";

const FasterCard = ({ title, price, icon, type, procent }) => {
  return (
    <div className="fasterCard">
      <p className="title">{title}</p>
      <div className="priceBox">
        <p
          className={
            type === "balans"
              ? "balans"
              : type === "daxod"
              ? "daxod"
              : type === "rasxod"
              ? "rasxod"
              : " price"
          }
        >
          {price}
        </p>
        <div className="priceIcon">
          {icon} {icon ? <span>{procent}</span> : null}
        </div>
      </div>
    </div>
  );
};

export default FasterCard;
