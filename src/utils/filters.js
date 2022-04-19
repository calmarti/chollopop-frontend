const filterName = (advert, name) => {
  if (name) {
    const cleanFilter = name.trim();
    const re = new RegExp(cleanFilter, "gi").test(advert.name);
    console.log(re)
    if (re) {
      return true;
    } else {
      return false;
    }
  }
  return true;
};

const filterSale = (advert, sale) => {
  if (sale !== "all") {
    if (advert.sale === Boolean(sale)) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
};

const filterTags = (advert, filter) => {
  if (JSON.stringify(filter) !== '[""]') {
    if (JSON.stringify(advert.tags) === JSON.stringify(filter)) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
};

const filterAdverts = (adverts, filters) => {
  return adverts
    .filter((advert) => filterName(advert, filters.name))
    .filter((advert) => filterSale(advert, filters.sale))
    .filter((advert) => filterTags(advert, filters.tags));
};

export default filterAdverts;
