import React from 'react';
import Pog from '../../../services/journal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
class Row extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showIcons: false
        };
        this.showIcons = this.showIcons.bind(this);
        this.hideIcons = this.hideIcons.bind(this);
        this.deleteEntry = this.deleteEntry.bind(this);
    }

    showIcons = () => {
        this.setState({ showIcons: true });
    }

    hideIcons = () => {
        this.setState({ showIcons: false });
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
        const { showIcons } = this.state;
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
                            className="icon"
                            style={{ cursor: 'pointer', opacity: showIcons ? 1 : 0 }}
                            onClick={() => this.deleteEntry(entry.id)}
                        >
                            <FontAwesomeIcon icon="fa-solid fa-trash-can" />
                        </span>
                    </span>
                </td>
                <td style={{ width: '30%' }}>{entry.created_at}</td>
            </tr>
        );
    }
}
export default Row;
