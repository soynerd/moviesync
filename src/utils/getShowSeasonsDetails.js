import auth from '../config/config'

export async function getShowSeasonsDetails(id){
    const res = await fetch(`https://api.trakt.tv/shows/${id}/seasons?extended=full`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "trakt-api-version": "2",
            'trakt-api-key': auth.trakt.clientId,
        }
    })
    .then(data => data.json());
    return res;
}