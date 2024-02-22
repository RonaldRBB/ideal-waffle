import React from 'react';
import Entries from './entries';
export default class Main extends React.Component {
    render() {
        return (
            <section className="section has-background-light pl-0 pr-0" style={{ minHeight: '80vh' }}>
                <div className="container is-fluid">
                    <Entries
                        journalEntries={this.props.journalEntries}
                        getJournalEntries={this.props.getJournalEntries}
                    />
                </div>
            </section>
        )
    }
}
