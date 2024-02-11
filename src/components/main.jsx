import React from 'react';
import Pog from '../services/journal';
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
            <div class="column is-full">
                <div class="card">
                    <div class="card-content">
                        <p class="title">{entry.id} - {entry.title}</p>
                            <p class="subtitle">{entry.created_at}</p>
                        <div class="content">
                            {entry.content}
                        </div>
                        <p class="has-text-right">Actualización: {entry.updated_at}</p>
                    </div>
                </div>
            </div>
        )) : null;
    }
    render() {
        return (
            this.entriesHtml()
        )
    }
}