import React from 'react';
import { withTranslation } from 'react-i18next';
class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.changeLanguage = this.changeLanguage.bind(this);
    }
    changeLanguage(event) {
        const { i18n } = this.props;
        i18n.changeLanguage(event.target.value);
    }
    render() {
        const { t } = this.props;
        return (
            <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        <img className='image is-32x32'
                        style={{ height: '100%' }}
                            src="logo_no_bg.png"
                            alt={t('appName')}
                        />
                    </a>
                </div>
                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <button className="button is-primary" onClick={this.changeLanguage} value='en'>English</button>
                                <button className="button is-primary" onClick={this.changeLanguage} value='es'>Español</button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default withTranslation()(Navbar);
