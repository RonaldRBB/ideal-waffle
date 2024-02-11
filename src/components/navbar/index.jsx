import React from 'react';

export default class Navbar extends React.Component {
    render() {
        return (
            <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        Diario / Bitácora
                    </a>
                </div>
            </nav>
        )
    }
}
