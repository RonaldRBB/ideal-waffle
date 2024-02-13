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
                <tr>
                    <td style={{ width: '50%' }}>{entry.title}
                        <span className="icon">
                            <FontAwesomeIcon icon="fa-solid fa-trash-can" />
                        </span>
                    </td>
                    {/* delete button */}
                    <td style={{ width: '10%' }}><button className="button is-small is-danger" onClick={() => this.deleteEntry(entry.id)}>Eliminar</button></td>
                    <td style={{ width: '10%' }}>{entry.created_at}</td>
                </tr>
            );
        });
        return (
            <div className="table-container box">
                <table className="table bordered is-striped is-hoverable is-fullwidth">
                    {/* <thead>
                        <tr>
                        <th style={{ width: '80%' }}>Entrada</th>
                        <th style={{ width: '20%' }}>Fecha</th>
                        </tr>
                    </thead> */}
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        )
    }
    deleteEntry(id) {
        const pog = new Pog();
        pog.delete(id);
        this.props.getJournalEntries();
    }
    render() {
        // window.confirm("Do you really want to leave?");
        return (
            <>
                <Form getJournalEntries={this.props.getJournalEntries} />
                <div className="column is-full">{this.tableEntries()}</div >
            </>
        )
    }
}