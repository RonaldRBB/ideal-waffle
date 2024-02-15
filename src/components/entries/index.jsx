import React from 'react';
import Form from './form';
import Table from './table';

export default class Entries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormVisible: false
        };
        this.toggleFormVisibility = this.toggleFormVisibility.bind(this);
    }

    toggleFormVisibility() {
        this.setState(prevState => ({
            isFormVisible: !prevState.isFormVisible
        }));
    }

    render() {
        return (
            <>
                <div className="columns is-vcentered">
                    <div className="column is-full">
                        <div className="buttons has-addons is-right">
                            <button className="button" onClick={this.toggleFormVisibility}>
                                {this.state.isFormVisible ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="columns">
                    <div id="entries" className={`column ${this.state.isFormVisible ? 'is-6' : 'is-full'}`}>
                        <Table
                            journalEntries={this.props.journalEntries}
                            getJournalEntries={this.props.getJournalEntries}
                        />
                    </div>
                    <div id="form" className={'column is-6'}>
                        <Form getJournalEntries={this.props.getJournalEntries} />
                    </div>
                </div>
            </>
        );
    }
}
