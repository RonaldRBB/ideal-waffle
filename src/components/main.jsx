import React from 'react';
import Entries from './entries';
export default class Main extends React.Component {
    render() {
        return (
            <section className="section has-background-light" style={{ minHeight: '80vh' }}>
                <div className="container">
                    <div className="columns is-vcentered is-multiline">
                        <Entries
                            journalEntries={this.props.journalEntries}
                            getJournalEntries={this.props.getJournalEntries}
                        />
                    </div>
                </div>
            </section>
        )
    }
}
