const initDate = {
  startDate: null,
  endDate: null,
  place: "",
  address: "",
  city:""
};

const initLink = {
  name: "",
  link: "",
  type: "pdf"
};

const initialShow = {
  title: "", 
  description: "",
  dates: [initDate],
  gallery: [],
  links: [initLink]
};


export default {initDate, initLink, initialShow}