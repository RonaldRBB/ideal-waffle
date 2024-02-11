import React from 'react';
import Pog from '../services/journal';
import Card from './entry/card';
export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            journalEntries: null
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.getJournalEntries();
        }, 500);
    }
    async getJournalEntries() {
        try {
            const pog = new Pog();
            const journalEntries = (await pog.getAll()).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            this.setState({ journalEntries });
        } catch (error) {
            console.error('Error handling JSON data:', error);
        }
    }
    entriesHtml() {
        return this.state.journalEntries ? this.state.journalEntries.map((entry) => (
            <div className="column is-full" key={entry.id}>
                <Card entry={entry} />
            </div>
        )) : null;
    }
    render() {
        return (
            this.entriesHtml()
        )
    }
}