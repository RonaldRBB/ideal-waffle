import React from 'react';
import Pog from '../services/journal';
import Card from './entry/card';
import Form from './entry/form';
export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            journalEntries: null
        }
        this.getJournalEntries = this.getJournalEntries.bind(this);
    }
    componentDidMount() {
        this.getJournalEntries();
    }
    async getJournalEntries() {
        try {
            const pog = new Pog();
            // const journalEntries = (await pog.index()).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            const journalEntries = (await pog.index()).sort((a, b) => b.id - a.id);
            this.setState({ journalEntries });
        } catch (error) {
            console.error('Error handling JSON data:', error);
        }
    }
    entriesHtml() {
        return this.state.journalEntries ? this.state.journalEntries.map((entry) => (
            <div className="column is-full" key={entry.id}>
                <Card entry={entry} getJournalEntries={this.getJournalEntries} />
            </div>
        )) : null;
    }
    render() {
        return (
            <>
                <Form getJournalEntries={this.getJournalEntries} />
                {this.entriesHtml()}
            </>
        )
    }
}