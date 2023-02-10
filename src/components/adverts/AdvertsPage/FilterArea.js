import "./FilterArea.css";
import { getAdvertTags } from "../service";
import useQuery from "../../hooks/useQuery";
import PriceRange from "../../shared/PriceRange";

export default function FilterArea({ filters, handleChange }) {
  const { data: tags, error } = useQuery(getAdvertTags);
  const range = { min: 0, max: 100000 };

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
            <label htmlFor="price">Precio</label>

            {/* <input
                type="range"
                id="price"
                name="price"
                min="0"
                max="1000000"
                disabled
              /> */}

            <PriceRange
              min={range.min}
              max={range.max}
              // value={filters.price}
              name="price"
              onChange={handleChange}
              // style={{ width: 200, margin: 24, backgroundColor: '#5AD4C5;' }}
              marks={{ [range.min]: range.min, [range.max]: range.max }}
            ></PriceRange>
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
              <option value={[""]}>Todas las categorías</option>
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
