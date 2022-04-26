import { Link } from "react-router-dom";
import "./AdvertsPage.css";
import placeholder from "../../../assets/default_photo.jpg";

const AdvertsList = ({ filteredAdverts }) => {
  return (
    <div className="mx-auto" style={{ width: "75vw" }}>
      <ul className="row">
        {filteredAdverts.map((advert, index) => (
          <div key={index} className="col-sm-3 my-5">
            <li className="card" style={{ width: "18rem", backgroundColor: "var(--third-color)" /* , padding:"2.5rem" */ }} key={advert.id}>
              <Link className="card-link" to={`/adverts/${advert.id}`}>
                <img
                  className="card-img-top"
                  src={
                    advert.photo
                      ? `http://localhost:3001${advert.photo}`
                      : placeholder
                  }
                  alt={advert.name}
                />
                <div className="card-body card-styles">
                  <h2 className="card-title">{advert.name}</h2>
                  <div className="card-text">
                    <p>{advert.price}€</p>
                    <p>{advert.sale ? "Vendo" : "Compro"}</p>
                    <p>{advert.tags.join(" ")}</p>
                  </div>
                </div>
              </Link>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default AdvertsList;
