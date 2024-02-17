import React from 'react';
import Pog from '../../../services/journal';
import { withTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            title: '',
            content: '',
            showTitleError: false,
            showContentError: false
        }
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.eraseForm = this.eraseForm.bind(this);
        this.submitEntry = this.submitEntry.bind(this);
        this.deleteEntry = this.deleteEntry.bind(this);
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
            content: '',
            showTitleError: false,
            showContentError: false
        });
    }
    submitEntry(event) {
        event.preventDefault();
        const { id, title, content } = this.state;
        const showTitleError = title === '';
        const showContentError = content === '';
        if (showTitleError || showContentError) {
            this.setState({ showTitleError, showContentError });
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
            content: '',
            showTitleError: false,
            showContentError: false
        });
    }
    deleteEntry(event) {
        event.preventDefault();
        if (!this.state.id) return;
        const answer = window.confirm("Do you really want to delete?");
        if (!answer) return;
        const pog = new Pog();
        pog.delete(this.state.id);
        this.setState({
            id: null,
            title: '',
            content: ''
        })
        this.props.getJournalEntries();
    }
    render() {
        const { t } = this.props;
        return (
            <div className="box-ns">
                <form onSubmit={this.submitEntry}>
                    <div className="field">
                        <label className="label">{t('entryForm.title')}</label>
                        <div className="control">
                            <input
                                className={`input ${this.state.showTitleError ? "is-danger" : ""}`}
                                type="text"
                                placeholder={t('entryForm.title')}
                                value={this.state.title}
                                onChange={this.handleTitleChange}
                            />
                        </div>
                        <div>
                            {this.state.showTitleError && <p class="help is-danger">This field is required</p>}
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">{t('entryForm.content')}</label>
                        <div className="control">
                            <textarea
                                className={`textarea ${this.state.showContentError ? "is-danger" : ""}`}
                                placeholder={t('entryForm.content')}
                                value={this.state.content}
                                onChange={this.handleContentChange}
                            />
                        </div>
                        {this.state.showContentError && <p class="help is-danger">This field is required</p>}
                    </div>
                    <div className="field has-addons has-addons-right">
                        <div className="control">
                            <button className="button" type="submit">
                                <span>{t('submitButton')}</span>
                                <span className="icon">
                                    <FontAwesomeIcon icon="fa-solid fa-floppy-disk" />
                                </span>
                            </button>
                        </div>
                        <div className="control">
                            <button className="button" onClick={this.eraseForm}>
                                <span>{t('clearButton')}</span>
                                <span className="icon">
                                    <FontAwesomeIcon icon="fa-solid fa-eraser" />
                                </span>
                            </button>
                        </div>
                        <div className="control">
                            <button className="button" onClick={this.deleteEntry}>
                                <span>{t('deleteButton')}</span>
                                <span className="icon">
                                    <FontAwesomeIcon icon="fa-solid fa-trash-can" />
                                </span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
export default withTranslation()(Form);