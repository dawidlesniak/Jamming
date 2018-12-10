import React, { Component } from 'react';
import SearchResults from '../SearchResults/SearchResults';
import SearchBar from '../SearchBar/SearchBar';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.addTrack = this.addTrack.bind(this);
        this.search = this.search.bind(this);
        this.state = {
            searchResults: [],
            playlistName: 'playlistName',
            playlistTracks: []
        };

    }

    addTrack(track) {
        if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
            return;
        }
        this.state.playlistTracks.push(track);
        this.setState({ playlistTracks: this.state.playlistTracks });

        if (this.state.searchResults.find(savedTrack => savedTrack.id === track.id)) {
            this.setState({ searchResults: this.state.searchResults.filter(item => item !== track) });
        }
    }

    removeTrack(track) {
        if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
            this.setState({ playlistTracks: this.state.playlistTracks.filter(item => item !== track) });
            this.state.searchResults.push(track);
            this.setState({ searchResults: this.state.searchResults });
        }
    }

    updatePlaylistName(name) {
        this.setState({ playlistName: name });
    }

    savePlaylist() {
        this.setState({ playlist: [], playlistName: "" });
        const urls = this.state.playlistTracks.map(track => { return track.id });
        Spotify.savePlaylist(this.state.playlistName, urls, Spotify.getAccessToken());
    }

    search(term) {
        const token = Spotify.getAccessToken();
        Spotify.search(term, token).then(tracks => {
            this.setState({ searchResults: tracks })
        })
    }

    render() {
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar onSearch={this.search} />
                    <div className="App-playlist">
                        <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults} />
                        <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack}
                            playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;