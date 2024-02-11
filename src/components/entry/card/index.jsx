import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
export default class Card extends React.Component {
    render() {
        return (
            <div className="card">
                <header className="card-header">
                    <p className="card-header-title">
                        {this.props.entry.id} - {this.props.entry.title} - {this.props.entry.created_at}
                    </p>
                    <button className="card-header-icon" aria-label="more options">
                        <span className="icon">
                            <FontAwesomeIcon icon={faAngleDown} />
                        </span>
                    </button>
                </header>
                <div className="card-content">
                    <div className="content">
                        {this.props.entry.content}
                    </div>
                    <p className="has-text-right">Actualización: {this.props.entry.updated_at}</p>
                </div>
                <footer className="card-footer">
                    <a href="/" className="card-footer-item">Save</a>
                    <a href="/" className="card-footer-item">Edit</a>
                    <a href="/" className="card-footer-item">Delete</a>
                </footer>
            </div>
        )
    }
}
