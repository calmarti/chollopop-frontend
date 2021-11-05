import { getAdverts } from "../components/adverts/service";

 async function request() {
  try {
    return await getAdverts();
  } 
  catch (error) {
    return error;
  }
}


export default request;
