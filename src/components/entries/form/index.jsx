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
            showContentError: false,
            isContentEditable: false,
            selectedOptions: [],
            options: [
                "Argentina", "Bolivia", "Brazil", "Chile",
                "Colombia", "Ecuador", "Guyana", "Paraguay",
                "Peru", "Suriname", "Uruguay", "Venezuela"
            ]
        }
        this.textareaRef = React.createRef();
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.eraseForm = this.eraseForm.bind(this);
        this.submitEntry = this.submitEntry.bind(this);
        this.deleteEntry = this.deleteEntry.bind(this);
        this.handleClickOnContent = this.handleClickOnContent.bind(this);
        this.handleContentBlur = this.handleContentBlur.bind(this);
        // Enlazar handleSelect
        this.handleSelect = this.handleSelect.bind(this);
    }
    componentDidUpdate(prevProps) {
        const { entry } = this.props;
        if (entry !== prevProps.entry) {
            this.setState({
                id: entry ? entry.id : null,
                title: entry ? entry.title : '',
                content: entry ? entry.content : '',
                created_at: entry ? entry.created_at : '',
                showTitleError: false,
                showContentError: false
            });
        }
    }
    handleTitleChange(event) {
        this.setState({ title: event.target.value });
    }
    handleContentChange(event) {
        this.setState({ content: event.target.value });
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
        id ? pog.update(id, title, content) : pog.create(4, title, content);
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
            content: '',
            showTitleError: false,
            showContentError: false
        })
        this.props.getJournalEntries();
    }
    handleClickOnContent() {
        this.setState({ isContentEditable: true }, () => {
            if (this.textareaRef.current) {
                this.textareaRef.current.focus();
            }
        });
    }
    handleContentBlur() {
        this.setState({ isContentEditable: false });
    }
    convertToHTML(content) {
        const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([\w\-_]+)/gi;
        content = content.replace(youtubeRegex, '<iframe width="560" height="315" src="https://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>');
        content = content.replace(/\n/g, '<br>');
        const div = document.createElement('div');
        div.innerHTML = content;
        return <span dangerouslySetInnerHTML={{ __html: div.innerHTML }} />;
    }
    handleSelect(event) {
        event.preventDefault();
        const value = event.target.value;
        this.setState(prevState => ({
            selectedOptions: [...prevState.selectedOptions, value],
            options: prevState.options.filter(option => option !== value)
        }));
    }

    handleRemove(optionToRemove) {
        const updatedOptions = this.state.selectedOptions.filter(option => option !== optionToRemove);
        this.setState(prevState => ({
            selectedOptions: updatedOptions,
            options: [...prevState.options, optionToRemove]
        }));
    }

    render() {
        const { t } = this.props;
        return (
            <div className="box-ns">
                <form onSubmit={this.submitEntry}>
                    <div className="field">
                        <div className="control">
                            <input
                                className="input-ne input-ne-title"
                                type="text"
                                placeholder={t('entryForm.title')}
                                value={this.state.title}
                                onChange={this.handleTitleChange}
                            />
                        </div>
                        <div>
                            {this.state.showTitleError && <p className="help is-danger">This field is required</p>}
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-label is-normal" style={{ display: "flex", alignItems: "center", paddingTop: 0 }}>
                            <label className="label">Fecha de Creación:</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <p className="control is-expanded">
                                    <input className="input-ne" value={this.state.created_at} />
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-label is-normal" style={{ display: "flex", alignItems: "center", paddingTop: 0 }}>
                            <label className="label">Etiqueta:</label>
                        </div>
                        <div className="field-body">
                            <div>
                                <div className="select">
                                    <select onChange={this.handleSelect}>
                                        <option value="">Selecciona una opción</option>
                                        {this.state.options.map(option => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="field is-grouped is-grouped-multiline">
                                    {this.state.selectedOptions.map(option => (
                                        <div key={option} className="control">
                                            <div className="tags has-addons">
                                                <span className="tag is-link">{option}</span>
                                                <button className="tag is-delete" onClick={() => this.handleRemove(option)}></button>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="field" onClick={this.handleClickOnContent}>
                        {this.state.isContentEditable ? (
                            <div className="control">
                                <textarea
                                    ref={this.textareaRef}
                                    id="content"
                                    className={`textarea-ne`}
                                    placeholder={t('entryForm.content')}
                                    value={this.state.content}
                                    onChange={this.handleContentChange}
                                    rows={this.state.content.split('\n').length}
                                    onBlur={this.handleContentBlur}
                                />
                                {this.state.showContentError && <p className="help is-danger">This field is required</p>}
                            </div>
                        ) : (
                            <div className="control">
                                <div className="textarea-ne">
                                    {this.state.content === '' ? t('entryForm.content') : this.convertToHTML(this.state.content)}
                                </div>
                                {this.state.showContentError && <p className="help is-danger">This field is required</p>}
                            </div>
                        )}
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
                </form >
            </div >
        )
    }
}
export default withTranslation()(Form);