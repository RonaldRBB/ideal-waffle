import React from 'react';
import Main from './components/main';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Pog from '../src/services/journal';
export default class App extends React.Component {
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
    render() {
        return <>
            <Navbar />
            <section className="section has-background-light">
                <div className="container">
                    <div className="columns is-vcentered is-multiline">
                        <Main journalEntries={this.state.journalEntries} getJournalEntries={this.getJournalEntries} />
                    </div>
                </div>
            </section>
            <Footer />
        </>
    }
}
