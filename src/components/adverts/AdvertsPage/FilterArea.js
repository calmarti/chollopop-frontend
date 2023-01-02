import "./FilterArea.css";
import { getAdvertTags } from "../service";
import useQuery from "../../hooks/useQuery";

export default function FilterArea({ filters, handleChange }) {
  const { data: tags, error } = useQuery(getAdvertTags);

  return (
    <div>
      <form className="custom-form">
        <div className="custom-search-bar-group">
          <label htmlFor="name"></label>
          <input
            className="custom-search-bar"
            type="text"
            id="name"
            name="name"
            placeholder="Busca tu artículo..."
            onChange={handleChange}
            value={filters.name}
            autoFocus
          />
        </div>

        <div className="filter-area">
          <div className="filter-price">
            <label htmlFor="price">
              Precio
              <input
                type="range"
                id="price"
                name="price"
                min="0"
                max="1000000"
              />
            </label>
          </div>

          <div className="filter-tags">
            <label htmlFor="tags" className="filter-label">
              Categorías
            </label>
            <select
              id="tags"
              className="form-select"
              name="tags"
              value={filters.tags}
              onChange={handleChange}
              multiple={true}
            >
              <option value={[""]}>all</option>
              {tags &&
                tags.map((tag, index) => (
                  <option key={index} value={tag}>
                    {" "}
                    {tag}{" "}
                  </option>
                ))}
            </select>
          </div>

          <div className="filter-sale">
            <div className="filter-sale-true">
              <label className="" htmlFor="sale">
                Venta
              </label>
              <input
                className=""
                name="sale"
                type="radio"
                value="true"
                checked={filters.sale === true}
                onChange={handleChange}
              />
            </div>

            <div className="filter-sale-false">
              <label className="" htmlFor="sale">
                Compra
              </label>
              <input
                className=""
                name="sale"
                type="radio"
                value="false"
                checked={filters.sale === false}
                onChange={handleChange}
              />
            </div>

            <div className="filter-sale-all">
              <label className="" htmlFor="sale">
                Todos
              </label>
              <input
                className=""
                name="sale"
                type="radio"
                value="all"
                checked={filters.sale === "all"}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
