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

        }
    }
}

export default Spotify;