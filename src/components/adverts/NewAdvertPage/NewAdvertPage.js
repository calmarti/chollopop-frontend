import { useState, useRef } from "react";
import { Redirect } from "react-router-dom";
import Button from "../../shared/Button";
import { postNewAdvert, getAdvertTags } from "../service";
import "./NewAdvertPage.css";
import Header from "../../layout/Header.js";
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

  return (
    <>
      <Header {...props} />

      {error ? (
        <Error />
      ) : (
        <div className="new-advert-container">
          <h2 className="new-advert-title">Crea tu anuncio</h2>
          <form encType="multipart/form-data" onSubmit={handleSubmit}>
            <div className="new-advert-form-container">
              <label className="new-advert-form-label" htmlFor="name">
                Artículo &nbsp;
                <input
                  className="new-advert-form-field"
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  value={fields.name}
                  autoFocus
                />
              </label>

              <label className="new-advert-form-label" htmlFor="price">
                Precio &nbsp;
                <input
                  className="new-advert-form-field"
                  type="number"
                  id="price"
                  name="price"
                  onChange={handleChange}
                  value={fields.price}
                />
              </label>

              <label className="new-advert-form-label" htmlFor="sale">
                Venta &nbsp;
                <input
                  className="new-advert-form-field"
                  name="sale"
                  type="radio"
                  value={true}
                  checked={fields.sale === true}
                  onChange={handleChange}
                />
              </label>

              <label className="new-advert-form-label" htmlFor="sale">
                Compra &nbsp;
                <input
                  className="new-advert-form-field"
                  name="sale"
                  type="radio"
                  value={false}
                  checked={fields.sale === false}
                  onChange={handleChange}
                />
              </label>

              <label className="new-advert-form-label">
                <span className="new-advert-form-select-span">Categoría</span>

                <select
                  className="new-advert-form-field"
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

              <label
                className="new-advert-form-label file-field"
                htmlFor="photo"
              >
                {" "}
                Foto &nbsp;
                <input
                  className="new-advert-form-field"
                  type="file"
                  id="photo"
                  name="photo"
                  ref={photoRef}
                ></input>
              </label>
              <Button
                disabled={!fields.name || !fields.price || !fields.tags}
                type="submit"
              >
                Continuar
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
