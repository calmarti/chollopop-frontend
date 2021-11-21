export const filterName = (advert, filters) => {
  if (filters.name) {
    if (advert.name === filters.name) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
};

export const filterSale = (advert, filters) => {
  if (filters.sale !== "") {
    if (advert.sale === filters.sale) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
};

export const filterTags = (advert, filters) => {
  if (JSON.stringify(filters.tags) !== '[""]') {
    if (JSON.stringify(advert.tags) === JSON.stringify(filters.tags)) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
};

export const filterAdverts = (adverts, filters) => {
  return adverts
    .filter((advert) => filterSale(advert, filters))
    .filter((advert) => filterName(advert, filters))
    .filter((advert) => filterTags(advert, filters));
};

//export default filterAdverts;
