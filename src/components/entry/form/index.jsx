import React from 'react';
import Pog from '../../../services/journal';
export default class Form extends React.Component {
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
        const pog = new Pog();
        pog.create(4, this.state.title, this.state.content);
        this.props.getJournalEntries();
    }
    render() {
        return (
            <div className="container box">
                <form onSubmit={this.handleSubmit}>
                    <div className="field">
                        <label className="label">Titulo</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                placeholder="Titulo"
                                value={this.state.title}
                                onChange={this.handleTitleChange}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Message</label>
                        <div className="control">
                            <textarea
                                className="textarea"
                                placeholder="Textarea"
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
                                Submit
                            </button>
                        </div>
                        <div className="control">
                            <button
                                className="button is-link is-light"
                                type="button"
                                onClick={this.handleDelete}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
