import React from 'react';
import { withTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonText: 'en'
        }
        this.changeButtonText = this.changeButtonText.bind(this);
    }
    changeButtonText() {
        this.props.changeLanguage();
        const { i18n } = this.props;
        this.setState({ buttonText: i18n.language === 'en' ? 'es' : 'en' });
    }
    render() {
        const { t } = this.props;
        return (
            <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        <img className='image is-32x32'
                            style={{ height: '100%' }}
                            src="logo_no_bg_2.png"
                            alt={t('appName')}
                        />
                    </a>
                </div>
                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <button className="button is-info"
                                    onClick={this.changeButtonText}>
                                    <span className="icon">
                                        <FontAwesomeIcon icon="fa-solid fa-language" />
                                    </span>
                                    <span>{this.state.buttonText}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default withTranslation()(Navbar);
