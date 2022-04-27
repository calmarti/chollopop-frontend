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
      data.set["photo"] = photoRef.current.value;
      const response = await postNewAdvert(data);
      setNewAdvertId(response.id);
    } catch (e) {
      setState((prevState) => ({ ...prevState, error: e.message }));
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
        <div className="">
          <h2 className="new-advert-title">Crea tu anuncio</h2>

          <form
            className="d-flex flex-column align-items-center my-0 p-3 form-wrapper"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <div className="mb-5">
              <label className="form-label" htmlFor="name">
                Artículo &nbsp;
                <input
                  className="form-control"
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  value={fields.name}
                  autoFocus
                />
              </label>

              <div className="mb-5">
                <label className="form-label" htmlFor="price">
                  Precio &nbsp;
                  <input
                    className="form-control"
                    type="number"
                    id="price"
                    name="price"
                    onChange={handleChange}
                    value={fields.price}
                  />
                </label>
              </div>

              <div className="mb-5 form-check">
                <label className="form-check-label" htmlFor="sale">
                  Venta &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    className="form-check-input"
                    name="sale"
                    type="radio"
                    value={true}
                    checked={fields.sale === true}
                    onChange={handleChange}
                  />
                </label>

                <label className="form-check-label" htmlFor="sale">
                  Compra &nbsp;
                  <input
                    className="form-check-input"
                    name="sale"
                    type="radio"
                    value={false}
                    checked={fields.sale === false}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className="mb-5">
                <label>
                  <span
                    style={{
                      display: "inline-block",
                      marginLeft: "0.2rem",
                      marginBottom: "1rem",
                    }}
                    className="new-advert-form-select-span"
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

              <div className="input-group mb-5">
                <label className="" htmlFor="photo">
                  {" "}
                  Foto: &nbsp;
                  <input
                    className="form-control"
                    type="file"
                    id="photo"
                    name="photo"
                    ref={photoRef}
                  ></input>
                </label>
              </div>

              <button
                className="btn btn-info"
                disabled={!fields.name || !fields.price || !fields.tags}
                type="submit"
              >
                Continuar
              </button>
            </div>
          </form>
        </div>
      )}
      <Footer />
    </>
  );
}
