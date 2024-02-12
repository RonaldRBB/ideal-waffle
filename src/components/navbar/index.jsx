import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const { t } = useTranslation();
    return (
        <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="/">
                    {t('appName')}
                </a>
            </div>
        </nav>
    );
}
export default Navbar;
