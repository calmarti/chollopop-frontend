import client from '../../api/client';

const advertsBaseUrl = '/api/v1';

export function getAdverts() {
    const url = `${advertsBaseUrl}/adverts`;
    return client.get(url);
}
