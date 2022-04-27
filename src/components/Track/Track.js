import React from 'react'

export class Track extends React.Component {
    render() {


        const renderAction = () => {
            if (this.props.isRemoval) {
                return <button>-</button>
            } else {
                return <button>+</button>
            }
        }

        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                <button className="Track-action">{/*<!-- + or - will go here -->*/}</button>
            </div>
        )
    }
}