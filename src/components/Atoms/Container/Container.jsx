import "./style.scss";

const Container = ({ children, scroll_container, width, changeWidth }) => {
  return (
    <div
      className={` container ${scroll_container} `}
      style={{ width: `${width}px`, marginLeft: `${changeWidth}px` }}
    >
      {children}
    </div>
  );
};

export default Container;
