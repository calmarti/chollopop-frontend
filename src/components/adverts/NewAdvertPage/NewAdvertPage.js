import { useState, useRef } from "react";
import { Redirect } from "react-router-dom";
import { postNewAdvert, getAdvertTags } from "../service";
import "./NewAdvertPage.css";
import Header from "../../layout/Header.js";
import Footer from "../../layout/Footer.js";
import Error from "../../shared/Error";
import "../../layout/Header.css";
import useForm from "../../hooks/useForm";
import useQuery from "../../hooks/useQuery";


export default function NewAdvertPage({ ...props }) {
  const { formValue: fields, handleChange } = useForm({
    name: "",
    price: "",
    sale: true,
    tags: undefined,
    photo: null,
  });

  const { data: tags, isLoading, error, setState } = useQuery(getAdvertTags);
  const [newAdvertId, setNewAdvertId] = useState("");
  const photoRef = useRef(null);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const data = new FormData(ev.target);
      data.set["photo"] = photoRef.current.files[0];
      const response = await postNewAdvert(data);
      console.log(photoRef.current.files[0])
      setNewAdvertId(response.id);
    } catch (e) {
      setState((prevState) => ({ ...prevState, error: e }));
    }
  };

  if (newAdvertId) {
    return <Redirect to={`/adverts/${newAdvertId}`} />;
  }

  if(isLoading){
    return  <div className="loading">Loading...</div>
  }

  return (
    <>
      <Header {...props} />

      {error ? (
        <Error />
      ) : (
        <div className="new-advert-form-wrapper">
          <h2 className="new-advert-title">Crea un nuevo anuncio</h2>
          <form
            className="form"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <div className="field-group">
              <label className="" htmlFor="name">
                Artículo &nbsp;
              </label>
              <input
                className="new-advert-input"
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
                value={fields.name}
                autoFocus
              />
            </div>

            <div className="field-group">
              <label className="" htmlFor="price">
                Precio &nbsp;
              </label>
              <input
                className="new-advert-input"
                type="number"
                id="price"
                name="price"
                onChange={handleChange}
                value={fields.price}
              />
            </div>

            <div className="sale-field-group">
              <div className="sell-field-group">
                <label className="" htmlFor="sale">
                  Venta &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </label>
                <input
                  className=""
                  name="sale"
                  type="radio"
                  value={true}
                  checked={fields.sale === true}
                  onChange={handleChange}
                />
              </div>

              <div className="buy-field-group">
                <label className="" htmlFor="sale">
                  Compra &nbsp;&nbsp;&nbsp;&nbsp;
                </label>
                <input
                  className=""
                  name="sale"
                  type="radio"
                  value={false}
                  checked={fields.sale === false}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field-group">
              <label>
                <span
                  style={{
                    display: "inline-block",
                    marginLeft: "0.2rem",
                    marginBottom: "1rem",
                  }}
                  className=""
                >
                  Categorías:
                </span>

                <select
                  className="form-select"
                  name="tags"
                  value={fields.tags}
                  onChange={handleChange}
                  multiple={true}
                >
                  {tags.map((tagvalue, index) => (
                    <option key={index} value={tagvalue}>
                      {" "}
                      {tagvalue}{" "}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="field-group">
              <label className="" htmlFor="photo">
                {" "}
                Foto: &nbsp;
              </label>
              <input
                className="form-control"
                type="file"
                id="photo"
                name="photo"
                ref={photoRef}
              ></input>
            </div>

            <button
              className="new-advert-button"
              disabled={!fields.name || !fields.price || !fields.tags}
              type="submit"
            >
              Continuar
            </button>
          </form>
        </div>
      )}
      <Footer />
    </>
  );
}
