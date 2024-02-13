import React from 'react';
import { withTranslation } from 'react-i18next';

class Footer extends React.Component {
    render() {
        const { t } = this.props;
        const currentYear = new Date().getFullYear();
        return (
            <footer className="footer has-background-primary">
                <div className="content has-text-centered">
                    <p>
                        {t('appName')} - &copy; {currentYear}
                    </p>
                </div>
            </footer>
        )
    }
}
export default withTranslation()(Footer)
