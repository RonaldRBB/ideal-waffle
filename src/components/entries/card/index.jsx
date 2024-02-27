import React from 'react';
import Pog from '../../../services/journal';
import { withTranslation } from 'react-i18next';
class Card extends React.Component {
    constructor(props) {
        super(props);
        this.deleteEntry = this.deleteEntry.bind(this);
    }
    deleteEntry() {
        const pog = new Pog();
        pog.delete(this.props.entry.id);
        this.props.getJournalEntries();
    }
    render() {
        const { t } = this.props;
        return (
            <div className="card">
                <header className="card-header">
                    <p className="card-header-title">
                        {this.props.entry.id} - {this.props.entry.title} - {this.props.entry.created_at}
                    </p>
                    <button className="card-header-icon">
                        <span className="icon">
                        </span>
                    </button>
                </header>
                <div className="card-content">
                    <div className="content">
                        {this.props.entry.content}
                    </div>
                    <p className="has-text-right">Actualización: {this.props.entry.updated_at}</p>
                </div>
                <footer className="card-footer">
                    <div className="card-footer-item has-text-info">{t('saveButton')}</div>
                    <div className="card-footer-item has-text-info">{t('editButton')}</div>
                    <div className="card-footer-item has-text-info" onClick={this.deleteEntry}>{t('deleteButton')}</div>
                </footer>
            </div>
        )
    }
}

export default withTranslation()(Card)