import { Link } from "react-router-dom";
import "./AdvertsPage.css";

const AdvertsList = ({ filteredAdverts }) => {
  return (
    <div>
      <ul className="card-adverts">
        {filteredAdverts.map((advert) => (
          <li className="card-adverts-item" key={advert.id}>
            <Link
              className="card-adverts-item-link"
              to={`/adverts/${advert.id}`}
            >
              <div className="card">
                <h2>{advert.name}</h2>
                <p>{advert.price}€</p>
                <p>{advert.sale ? "Vendo" : "Compro"}</p>
                <p>{advert.tags.join(", ")}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdvertsList;
