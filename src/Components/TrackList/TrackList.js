import React, { Component } from 'react';
import Track from '../Track/Track';
import './TrackList.css';

class TrackList extends React.Component {
    render() {
        let tracklist
        if (this.props.isRemoval) {
            tracklist = this.props.tracks.map(track => {
                return <Track track={track} key={track.id} isRemoval={this.props.isRemoval} onRemove={this.props.onRemove} />
            })
        }
        else {
            tracklist = this.props.tracks.map(track => {
                return <Track track={track} key={track.id} isRemoval={this.props.isRemoval} onAdd={this.props.onAdd} />
            })
        }

        return (
            <div className="TrackList">
                {tracklist}
            </div>
        )
    }
}

export default TrackList;