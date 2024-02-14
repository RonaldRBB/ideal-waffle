import React from 'react';
import Pog from '../../../services/journal';
import { withTranslation } from 'react-i18next';
class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: ''
        }
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
    handleDelete(event) {
        event.preventDefault();
        this.setState({
            title: '',
            content: ''
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        const { title, content } = this.state;
        const { t } = this.props;
        if (title === '' || content === '') {
            alert(t('alertErrorSubmit'));
            return;
        }
        event.preventDefault();
        const pog = new Pog();
        pog.create(4, this.state.title, this.state.content);
        this.props.getJournalEntries();
        this.setState({
            title: '',
            content: ''
        });
    }
    render() {
        const { t } = this.props;
        return (
            <div className="box">
                <form onSubmit={this.handleSubmit}>
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
                                rows="14"
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
                                onClick={this.handleDelete}>
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