import { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { getAdverts } from "../service";

export default function AdvertsPage(props) {
  const [adverts, setAdverts] = useState([]);

  useEffect(() => {
    getAdverts()
      .then((adverts) => setAdverts(adverts))
      .catch((error) => console.log(error));
  }, []);
  /* style = {{backgroundColor: 'blue'}} */

  return (
    <Layout {...props}>
      <ul>
        {adverts.map(({ id, name, price, sale, tags, picture }) => (
          <li key={id}>
            <div className="item-card">
              <h2>{name}</h2>
              <p>{price}</p>
              <p>{sale ? "Venta" : "Compra"}</p>
              <p>{tags.join(" ")}</p>
            </div>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

//export default AdvertsPage;
