import client , { setContentType } from "../../api/client";
//import { getToken } from '../../utils/storage'; 

const advertsBaseUrl = '/api/v1';

export function getAdverts() {
    const url = `${advertsBaseUrl}/adverts`;
    return client.get(url);
}

export function postNewAdvert(body) {
    const url = `${advertsBaseUrl}/adverts`;
    //setContentType();
    return client.post(url, body);
}

export function getAdvert(id) {
    const url = `${advertsBaseUrl}/adverts/${id}`;
    return client.get(url);
}

