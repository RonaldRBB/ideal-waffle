import React from 'react';
import Row from './row';
export default class Table extends React.Component {
    tableEntries() {
        if (!this.props.journalEntries) return null;
        return this.props.journalEntries.map((entry) => (
            <Row key={entry.id}
                entry={entry}
                getJournalEntries={this.props.getJournalEntries}
                editEntry={this.props.editEntry}
            />
        ));
    }
    render() {
        return (
            <div className="table-container box-ns">
                <table className="table bordered is-striped is-hoverable is-fullwidth">
                    <tbody>
                        {this.tableEntries()}
                    </tbody>
                </table>
            </div>
        );
    }
}