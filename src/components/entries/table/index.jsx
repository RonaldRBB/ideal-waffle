import React from 'react';
import Row from './row';
export default class Table extends React.Component {
    tableEntries() {
        console.log("entries: ", this.props.journalEntries);
        if (!this.props.journalEntries) return null;
        return this.props.journalEntries.map((entry) => (
            <Row key={entry.id}
                entry={entry}
                getJournalEntries={this.props.getJournalEntries}
            />
        ));
    }
    render() {
        return (
            <div className="table-container box">
                <table className="table bordered is-striped is-hoverable is-fullwidth">
                    <tbody>
                        {this.tableEntries()}
                    </tbody>
                </table>
            </div>
        );
    }
}