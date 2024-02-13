import React from 'react';
import Form from './form';
import Table from './table';
export default class Entries extends React.Component {
    render() {
        return (
            <>
                <div className="column is-full">
                    <Form getJournalEntries={this.props.getJournalEntries} />
                </div>
                <div className="column is-full">
                    <Table
                        journalEntries={this.props.journalEntries}
                        getJournalEntries={this.props.getJournalEntries}
                    />
                </div >
            </>
        )
    }
}