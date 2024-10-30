import "./infoHistory.scss";
import Icons from "../../../Icons/Icons";
import { useHttps } from "../../../hooks/useHttps";
import { useEffect } from "react";

function InfoHistory() {
  const { data, loading, error, request } = useHttps();

  useEffect(() => {
    request({
      url: "expense/list_expense/",
      method: "GET",
      token: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  console.log(data);

  return (
    <>
      {data.map((item) => {
        const serverDate = "2024-10-30T09:03:16.621321Z";

        // Stringni Date obyektiga aylantirish
        const date = new Date(serverDate);

        // Soat, daqiqa, kun, oy va yilni olish
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Oylik indeks 0dan boshlanadi
        const year = date.getFullYear();
        const fullDate = `${day}/${month}/${year} | ${hours}:${minutes}`;
        return (
          <div className="product">
            <p>{item.name}</p>
            <p>{fullDate}</p>
            <p>{item.price} сум</p>
            <div className="product_icons">
              <div className="edit">{<Icons.edit />}</div>
              <div className="delete">{<Icons.remove />}</div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default InfoHistory;
