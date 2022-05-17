const clientID = '8ba57a6909174b6a8998a49aa53c17d6';
const redirectUri = 'http://localhost:3000/';
let userAccessToken;

const Spotify = {
    getUserAccessToken() {
        if (userAccessToken) {
            return userAccessToken;
        }
        const userAccessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (userAccessTokenMatch && expiresInMatch) {
            userAccessToken = userAccessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return userAccessToken;

        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    },
    search(term) {
        const accessToken = Spotify.getUserAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
            {
                headers: {
                    Authorization: `Beared ${accessToken}`
                }
            }).then(response => {
                return response.json();
            }).then(jsonResponse => {
                if (!jsonResponse.tracks) {
                    return []
                }
                return jsonResponse.tracks.item.map(track => ({
                    id: track.id,
                    name: track.name,
                    artists: track.artists,
                    album: track.album.name,
                    uri: track.uri
                }))
            })
    }
}

export default Spotify;