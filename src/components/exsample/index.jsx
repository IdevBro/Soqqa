import { useEffect } from "react";
import { useHttps } from "../../hooks/useHttps";

function Example() {
  const { data, loading, error, request } = useHttps();

  const info = {
    url: "expense/all_categories/",
    token: true,
  };
  useEffect(() => {
    request(info);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  if (loading) return <div>Loading...</div>;
  if (error) return <pre>Error: {error}</pre>;

  console.log(data);
  return (
    <div>
      <h1>Example</h1>
    </div>
  );
}

export default Example;
