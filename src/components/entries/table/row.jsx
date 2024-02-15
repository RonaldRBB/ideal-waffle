import React from 'react';
import Pog from '../../../services/journal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
class Row extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity: 0
        };
        this.showIcons = this.showIcons.bind(this);
        this.hideIcons = this.hideIcons.bind(this);
        this.deleteEntry = this.deleteEntry.bind(this);
    }
    showIcons() {
        this.setState({ opacity: .2 });
    }
    hideIcons() {
        this.setState({ opacity: 0 });
    }
    handleIconOpacity(event) {
        event.target.style.opacity = event.target.style.opacity === '1' ? '.2' : '1';
    }
    deleteEntry(id) {
        const answer = window.confirm("Do you really want to delete?");
        if (!answer) return;
        const pog = new Pog();
        pog.delete(id);
        this.props.getJournalEntries();
    }
    render() {
        const { entry } = this.props;
        return (
            <tr
                key={entry.id}
                onMouseEnter={this.showIcons}
                onMouseLeave={this.hideIcons}
            >
                <td>
                    <span className="icon-text">
                        <span>{entry.title}</span>
                        <span
                            onMouseEnter={this.handleIconOpacity}
                            onMouseLeave={this.handleIconOpacity}
                            className="icon"
                            style={{ cursor: 'pointer', opacity: this.state.opacity }}
                            onClick={() => this.editEntry(entry.id)}
                        >
                            <FontAwesomeIcon icon="fa-solid fa-pen" />
                        </span>
                        <span
                            onMouseEnter={this.handleIconOpacity}
                            onMouseLeave={this.handleIconOpacity}
                            className="icon"
                            style={{ cursor: 'pointer', opacity: this.state.opacity }}
                            onClick={() => this.deleteEntry(entry.id)}
                        >
                            <FontAwesomeIcon icon="fa-solid fa-trash-can" />
                        </span>
                    </span>
                </td>
                <td className='has-text-right'>{entry.created_at}</td>
            </tr>
        );
    }
}
export default Row;
