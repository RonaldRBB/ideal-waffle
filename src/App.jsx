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
    changeLanguage() {
        const { i18n } = this.props;
        this.setState(prevState => ({
            language: prevState.language === 'en' ? 'es' : 'en'
        }))
        i18n.changeLanguage(this.state.language);
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