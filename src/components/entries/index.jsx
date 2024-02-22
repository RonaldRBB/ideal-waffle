import React from 'react';
import Form from './form';
import Table from './table';
import Pog from '../../services/journal';

export default class Entries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormVisible: false,
            entry: null
        };
        this.toggleFormVisibility = this.toggleFormVisibility.bind(this);
    }
    toggleFormVisibility(bool) {
        this.setState({ "isFormVisible": bool });
    }
    async editEntry(id) {
        const pog = new Pog();
        const entry = await pog.getOne(id);
        await this.setState({ "entry": entry });
        this.toggleFormVisibility(true);
    }
    render() {
        return (
            <>
                <div className="columns">
                    <div className="column is-full">
                        <div className="buttons has-addons is-right">
                            <button className="button" onClick={() => this.toggleFormVisibility(!this.state.isFormVisible)}>
                                {this.state.isFormVisible ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="columns">
                    <div className={`column ${this.state.isFormVisible ? 'is-6' : 'is-full'}`}>
                        <Table
                            journalEntries={this.props.journalEntries}
                            getJournalEntries={this.props.getJournalEntries}
                            editEntry={this.editEntry.bind(this)}
                        />
                    </div>
                    <div className={'column is-6'}>
                        <Form getJournalEntries={this.props.getJournalEntries}
                            entry={this.state.entry}
                        />
                    </div>
                </div>
            </>
        );
    }
}
