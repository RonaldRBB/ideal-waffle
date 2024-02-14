import React from 'react';
import Pog from '../../../services/journal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Row extends React.Component {
    showIcons(id, opacity = 0) {
        document.getElementById(`delete${id}`).style.opacity = opacity;
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
            <tr key={entry.id}
                onMouseEnter={() => this.showIcons(entry.id, 1)}
                onMouseLeave={() => this.showIcons(entry.id)}
            >
                <td style={{ width: '80%' }}>
                    <span className="icon-text">
                        <span>{entry.title}</span>
                        <span id={`delete${entry.id}`}
                            className="icon"
                            style={{ cursor: 'pointer', opacity: .0 }}>
                            <FontAwesomeIcon icon="fa-solid fa-trash-can" onClick={() => this.deleteEntry(entry.id)} />
                        </span>
                    </span>
                </td>
                <td style={{ width: '20%' }}>{entry.created_at}</td>
            </tr>
        );
    }
}

export default Row