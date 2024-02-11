import React from 'react';
export default class Form extends React.Component {
    render() {
        return (
            <div className="container box">
                <form>
                    <div className="field">
                        <label className="label">Titulo</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="Titulo" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Message</label>
                        <div className="control">
                            <textarea className="textarea" placeholder="Textarea" defaultValue={""} />
                        </div>
                    </div>
                    <div className="field is-grouped">
                        <div className="control">
                            <button className="button is-link">Submit</button>
                        </div>
                        <div className="control">
                            <button className="button is-link is-light">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

