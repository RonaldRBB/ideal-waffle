import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Pog from '../../../services/journal';
export default class Card extends React.Component {
    constructor(props) {
        super(props);
        this.deleteEntry = this.deleteEntry.bind(this);
    }
    deleteEntry() {
        const pog = new Pog();
        pog.delete(this.props.entry.id);
        this.props.getJournalEntries();
    }
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
                    <button className="button card-footer-item">Save</button>
                    <button className="button card-footer-item">Edit</button>
                    <button className="button card-footer-item" onClick={this.deleteEntry}>Delete</button>
                </footer>
            </div>
        )
    }
}
