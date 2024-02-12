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
    render() {
        return (
            <>
                <Form getJournalEntries={this.props.getJournalEntries} />
                {this.entriesHtml()}
            </>
        )
    }
}