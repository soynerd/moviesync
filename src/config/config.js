const auth = {
    trakt : {
        clientId : String(import.meta.env.VITE_TRAKT_CLIENT_ID),
        clientSecret : String(import.meta.env.VITE_TRAKT_CLIENT_SECRET),
    },

    fanart : {
        apiKey : String(import.meta.env.VITE_FANART_API_KEY),
    }
}
export default auth;