const filterName = (advert, filter) => {
  if (filter) {
    if (advert.name === filter) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
};

const filterSale = (advert, filter) => {
  if (filter !== "all") {
    if (advert.sale === Boolean(filter)) {
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
    .filter((advert) => filterSale(advert, filters.sale))
    .filter((advert) => filterName(advert, filters.name))
    .filter((advert) => filterTags(advert, filters.tags));
};

export default filterAdverts;
