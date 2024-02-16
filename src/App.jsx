import React from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Pog from '../src/services/journal';
import Main from './components/main';
import { withTranslation } from 'react-i18next';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            journalEntries: null,
            language: null
        }
        this.getJournalEntries = this.getJournalEntries.bind(this);
        this.changeLanguage = this.changeLanguage.bind(this);
    }
    componentDidMount() {
        const { i18n } = this.props;
        this.setState({ language: i18n.language });
        this.getJournalEntries();
    }
    changeLanguage(callback) {
        const { i18n } = this.props;
        const newLang = i18n.language === 'en' ? 'es' : 'en';
        this.setState({ language: newLang });
        i18n.changeLanguage(newLang);
        if (callback) { callback(newLang); }
    }
    async getJournalEntries() {
        try {
            const pog = new Pog();
            const journalEntries = (await pog.index()).sort((a, b) => b.id - a.id);
            this.setState({ journalEntries });
        } catch (error) {
            console.error('Error handling JSON data:', error);
        }
    }
    render() {
        return <>
            <Navbar changeLanguage={this.changeLanguage} />
            <Main
                journalEntries={this.state.journalEntries}
                getJournalEntries={this.getJournalEntries}
            />
            <Footer />
        </>
    }
}
export default withTranslation()(App); 