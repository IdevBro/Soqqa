// import { useState } from "react";
// const { REACT_APP_BASE_URL: Baseurl } = process.env;

// export const useHttps = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [getData, setGetData] = useState(null); // GET uchun
//   const [postData, setPostData] = useState(null); // POST uchun
//   const [putData, setPutData] = useState(null); // PUT uchun
//   const [deleteData, setDeleteData] = useState(null); // DELETE uchun
//   const [data, setData] = useState(null); // DELETE uchun

//   const refreshToken = async () => {
//     const refresh = localStorage.getItem("refresh");
//     const response = await fetch(`${Baseurl}/refresh-token`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ refresh_token: refresh }),
//     });

//     const data = await response.json();
//     if (response.ok) {
//       localStorage.setItem("access", data.accessToken);
//       return data.accessToken;
//     } else {
//       localStorage.removeItem("access"); // Tokenlarni o'chirish
//       localStorage.removeItem("refresh");
//       window.location.href = "/login"; // Login sahifasiga yo'naltirish
//       throw new Error("Session expired, please login again");
//     }
//   };

//   const request = async ({
//     url,
//     method = "GET",
//     body = null,
//     token = false,
//     headers = { "Content-Type": "application/json" },
//   }) => {
//     setLoading(true);
//     if (token)
//       headers["Authorization"] = `Bearer ${localStorage.getItem("access")}`;
//     if (method === "GET" || method === "HEAD") body = null;

//     try {
//       const response = await fetch(Baseurl + url, {
//         method,
//         body: body ? JSON.stringify(body) : null,
//         headers,
//       });
//       if (!response.ok) {
//         if (response.status === 401) {
//           const newToken = await refreshToken();
//           return request({ url, method, body, token: newToken });
//         }
//         throw new Error(`Could not fetch ${url}, status: ${response.status}`);
//       }
//       if (
//         response.status === 204 ||
//         response.status === 205 ||
//         response.headers.get("content-length") === "0"
//       ) {
//         setDeleteData(true);
//         return null; // Hech qanday kontent qaytmagan
//       }
//       const result = await response.json();
//       setLoading(false);
//       switch (method) {
//         case "GET":
//           setGetData(result);
//           break;
//         case "POST":
//           setPostData(result);
//           break;
//         case "PUT":
//           setPutData(result);
//           break;
//         case "DELETE":
//           setDeleteData(result);
//           break;
//         default:
//           setData(result); // Agar boshqa metodlar bo'lsa
//       }
//       setLoading(false);
//       setData(result);
//     } catch (e) {
//       console.log("global error: ", e);
//       setLoading(false);
//       setError(e.message);
//     }
//   };

//   return {
//     data,
//     putData,
//     postData,
//     deleteData,
//     loading,
//     getData,
//     error,
//     request,
//   };
// };

import { useState } from "react";
const { REACT_APP_BASE_URL: Baseurl } = process.env;

export const useHttps = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [getData, setGetData] = useState(null); // GET uchun
  const [postData, setPostData] = useState(null); // POST uchun
  const [putData, setPutData] = useState(null); // PUT uchun
  const [deleteData, setDeleteData] = useState(null); // DELETE uchun
  const [data, setData] = useState(null); // DELETE uchun

  const refreshToken = async () => {
    const refresh = localStorage.getItem("refresh");
    const response = await fetch(`${Baseurl}/refresh-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refresh }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("access", data.accessToken);
      return data.accessToken;
    } else {
      localStorage.removeItem("access"); // Tokenlarni o'chirish
      localStorage.removeItem("refresh");
      window.location.href = "/login"; // Login sahifasiga yo'naltirish
      throw new Error("Session expired, please login again");
    }
  };

  const request = async ({
    url,
    method = "GET",
    body = null,
    token = false,
    headers = { "Content-Type": "application/json" },
  }) => {
    setLoading(true);
    if (token)
      headers["Authorization"] = `Bearer ${localStorage.getItem("access")}`;
    if (method === "GET" || method === "HEAD") body = null;

    try {
      const response = await fetch(Baseurl + url, {
        method,
        body: body ? JSON.stringify(body) : null,
        headers,
      });

      // Agar javobni olishda xato bo'lsa:
      if (!response.ok) {
        if (response.status === 401) {
          const newToken = await refreshToken();
          return request({ url, method, body, token: newToken });
        }

        const errorText = await response.text(); // Xato sahifasini o'qish
        throw new Error(
          `Could not fetch ${url}, status: ${response.status}, message: ${errorText}`
        );
      }

      // Agar kontent bo'lmasa (204 yoki 205 kabi):
      if (
        response.status === 204 ||
        response.status === 205 ||
        response.headers.get("content-length") === "0"
      ) {
        setDeleteData(true);
        setLoading(false);
        return null; // Hech qanday kontent qaytmagan
      }

      // Javobni JSON formatda olish
      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const result = await response.json();
        setLoading(false);

        // Ma'lumotni saqlash
        switch (method) {
          case "GET":
            setGetData(result);
            break;
          case "POST":
            setPostData(result);
            break;
          case "PUT":
            setPutData(result);
            break;
          case "DELETE":
            setDeleteData(result);
            break;
          default:
            setData(result);
        }
        setData(result);
      } else {
        throw new Error("Server response is not JSON.");
      }
    } catch (e) {
      console.error("global error: ", e);
      setLoading(false);
      setError(e.message);
    }
  };

  return {
    data,
    putData,
    postData,
    deleteData,
    loading,
    getData,
    error,
    request,
  };
};
