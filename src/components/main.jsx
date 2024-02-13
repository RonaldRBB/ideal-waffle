import React from 'react';
import Form from './entry/form';
import Card from './entry/card';
export default class Main extends React.Component {
    entriesHtml() {
        return this.props.journalEntries ? this.props.journalEntries.map((entry) => (
            <div className="column is-full" key={entry.id}>
                <Card entry={entry} getJournalEntries={this.props.getJournalEntries} />
            </div>
        )) : null;
    }
    entries() {
        let rows = [];
        console.log(this.props.journalEntries);
        if (!this.props.journalEntries) return null;
        this.props.journalEntries.forEach((entry) => {
            rows.push(
                <tr>
                    <td>{entry.title}</td>
                    <td>{entry.created_at}</td>
                </tr>
            );
        });
        return (
            <div className="table-container box">
                <table className="table bordered is-striped is-narrow is-hoverable is-fullwidth">
                    <thead>
                        <tr>
                        <th style={{ width: '80%' }}>Entrada</th>
                        <th style={{ width: '20%' }}>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        )
    }
    render() {
        return (
            <>
                <Form getJournalEntries={this.props.getJournalEntries} />
                <div className="column is-full">
                    {this.entries()}
                </div >
            </>
        )
    }
}