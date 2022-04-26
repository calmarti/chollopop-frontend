import { Link } from "react-router-dom";
import "./AdvertsPage.css";
import placeholder from "../../../assets/default_photo.jpg";

const AdvertsList = ({ filteredAdverts }) => {
  return (
    <div className="mx-auto" style={{ width: "75vw" }}>
      {/* <div class="card" style="width: 18rem;">
  <img class="card-img-top" src="..." alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div> */}

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
