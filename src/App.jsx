import React from 'react';
import Main from './components/main';
import Navbar from './components/navbar';
import Footer from './components/footer';
export default class App extends React.Component {
    render() {
        return <>
            <Navbar />
            <section className="section has-background-light">
                <div className="container">
                    <div className="columns is-vcentered is-multiline">
                        <Main />
                    </div>
                </div>
            </section>
            <Footer />
        </>
    }
}
