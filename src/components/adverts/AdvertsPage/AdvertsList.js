import { Link } from "react-router-dom";
import placeholder from "../../../assets/default_photo.jpg";
import "./AdvertsPage.css";


const AdvertsList = ({ filteredAdverts, handleChange }) => {
  return (
    <div className="" >
      <ul className="custom-card-list">
        {filteredAdverts.map((advert, index) => (   
         
          <div className="">

            <li className="custom-card"  key={advert.id}>
              <Link className="custom-card-link" to={`/adverts/${advert.id}`}>
                <img
                  className=""
                  src={
                    // advert.photo
                    //   ? `${advert.photo}`
                    //   : placeholder
                    `https://loremflickr.com/320/240`
                  }
                  alt={advert.name}
                />
                <div className="custom-card-body">
                  <h2 className="custom-card-title">{advert.name}</h2>
                  <div className="">
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
