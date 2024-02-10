import React from 'react';
import Pog from '../services/journal_entries';
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
    entriesHtml() {
        return this.state.journalEntries ? this.state.journalEntries.map((entry) => (
            <div key={entry.id}>
                <p>id: {entry.id}</p>
                <p>user_id: {entry.user_id}</p>
                <p>title: {entry.title}</p>
                <p>content: {entry.content}</p>
                <p>created_at: {entry.created_at}</p>
                <p>updated_at: {entry.updated_at}</p>
            </div>
        )) : null;
    }
    async getJournalEntries() {
        try {
            const pog = new Pog();
            const journalEntries = await pog.getData();
            console.log(journalEntries);
            this.setState({ journalEntries });
        } catch (error) {
            console.error('Error handling JSON data:', error);
        }
    }
    render() {
        return (
            this.entriesHtml()
        )
    }
}