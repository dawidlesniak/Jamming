const clientID = 'd602cdff37304341941af046af9a6b50'
const redirectURI = "http://localhost:3000"

const Spotify = {
    getAccessToken: () => {
        const tokenFromURL = window.location.href.match(/access_token=([^&]*)/)
        if (tokenFromURL) {
            return tokenFromURL[1]
        }
        else {
            const url = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-private&redirect_uri=${redirectURI}`
            window.location = url
        }
    },

    search(term, token) {
        return fetch(`https://api.spotify.com/v1/search?q=${term}&type=track&limit=10`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            return response.json()
        }).then(jsonResponse => {
            if (jsonResponse.tracks.items) {

                return jsonResponse.tracks.items.map(track => {
                    return {

                        id: track.uri,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name
                    }
                });
            }
        });
    },

    savePlaylist(playlistName, playlist, token) {
        if (!playlistName || !playlist) {
            return;

        } return fetch(`https://api.spotify.com/v1/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            return response.json()
        }).then(jsonResponse => {
            return jsonResponse.id
        }).then(id => {
            return fetch(`https://api.spotify.com/v1/users/${id}/playlists`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: playlistName,
                    public: false
                })
            }
            );
        }).then(response => {
            return response.json()
        }).then(jsonResponse => {
            return jsonResponse.id
        }).then(id => {
            return fetch(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    uris: playlist
                })
            }
            )
        }).catch(error => console.error('Error: ', error))
    },
};

export default Spotify;