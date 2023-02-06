import { Link } from "react-router-dom";
import placeholder from "../../../assets/default_photo.jpg";
import "./AdvertsPage.css";


const AdvertsList = ({ filteredAdverts, handleChange }) => {
  return (

      <ul className="custom-card-list">
        {filteredAdverts.map((advert) => (
          <li className="custom-card" key={advert.id}>
            <Link className="custom-card-link" to={`/adverts/${advert.id}`}>
              <img
                className="custom-card-image"
                src={
                  // advert.photo
                    // ? `http://127.0.0.1:3001${advert.photo}`
                    // : placeholder
                  `https://loremflickr.com/320/240`
                }
                alt={advert.name}
              />
              <div className="custom-card-body">
                <p className="custom-card-price">{advert.price}€</p>
                <p className="custom-card-title">{advert.name}</p>
                <p className="custom-card-sale">
                  {advert.sale ? "Vendo" : "Compro"}
                </p>
                <div className="badge-wrapper">
                  {advert.tags.map((advert, index) => (
                    <div key={index} className="custom-card-badge">
                      {advert.split(",")}
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    // </div>
  );
};

export default AdvertsList;
