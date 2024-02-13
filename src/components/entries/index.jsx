import React from 'react';
import Form from './form';
import Pog from '../../services/journal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default class Entries extends React.Component {
    tableEntries() {
        let rows = [];
        console.log(this.props.journalEntries);
        if (!this.props.journalEntries) return null;
        this.props.journalEntries.forEach((entry) => {
            rows.push(
                <tr key={entry.id}>
                    <td style={{ width: '80%' }}>
                        <span className="icon-text">
                            <span>{entry.title}</span>
                            <span className="icon"style={{ cursor: 'pointer' }}>
                                <FontAwesomeIcon icon="fa-solid fa-trash-can" onClick={() => this.deleteEntry(entry.id)} />
                            </span>
                        </span>
                    </td>
                    <td style={{ width: '20%' }}>{entry.created_at}</td>
                </tr>
            );
        });
        return (
            <div className="table-container box">
                <table className="table bordered is-striped is-hoverable is-fullwidth">
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        )
    }
    deleteEntry(id) {
        const x = window.confirm("Do you really want to delete?");
        if (!x) return;
        const pog = new Pog();
        pog.delete(id);
        this.props.getJournalEntries();
    }
    render() {
        return (
            <>
                <Form getJournalEntries={this.props.getJournalEntries} />
                <div className="column is-full">{this.tableEntries()}</div >
            </>
        )
    }
}