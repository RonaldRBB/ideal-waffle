import React from 'react';
import Pog from '../../../services/journal';
import { withTranslation } from 'react-i18next';
class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            title: '',
            content: ''
        }
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleDelete = this.eraseForm.bind(this);
        this.submitEntry = this.submitEntry.bind(this);
    }
    componentDidUpdate(prevProps) {
        const { entry } = this.props;
        if (entry !== prevProps.entry) {
            this.setState({
                id: entry ? entry.id : null,
                title: entry ? entry.title : '',
                content: entry ? entry.content : ''
            });
        }
    }
    handleTitleChange(event) {
        this.setState({
            title: event.target.value
        });
    }
    handleContentChange(event) {
        this.setState({
            content: event.target.value
        });
    }
    eraseForm(event) {
        event.preventDefault();
        this.setState({
            id: null,
            title: '',
            content: ''
        });
    }
    submitEntry(event) {
        event.preventDefault();
        const { id, title, content } = this.state;
        const { t } = this.props;
        if (title === '' || content === '') {
            alert(t('alertErrorSubmit'));
            return;
        }
        const pog = new Pog();
        if (id) {
            pog.update(id, title, content);
        } else {
            pog.create(4, title, content); 
        }
        this.props.getJournalEntries();
        this.setState({
            id: null,
            title: '',
            content: ''
        });
    }
    render() {
        const { t } = this.props;
        return (
            <div className="box">
                <form onSubmit={this.submitEntry}>
                    <div className="field">
                        <label className="label">{t('entryForm.title')}</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                placeholder={t('entryForm.title')}
                                value={this.state.title}
                                onChange={this.handleTitleChange}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">{t('entryForm.content')}</label>
                        <div className="control">
                            <textarea
                                className="textarea"
                                placeholder={t('entryForm.content')}
                                value={this.state.content}
                                onChange={this.handleContentChange}
                            />
                        </div>
                    </div>
                    <div className="field is-grouped">
                        <div className="control">
                            <button
                                className="button is-link"
                                type="submit">
                                {t('submitButton')}
                            </button>
                        </div>
                        <div className="control">
                            <button
                                className="button is-link is-light"
                                type="button"
                                onClick={this.eraseForm}>
                                {t('cancelButton')}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
export default withTranslation()(Form);