import React, { useState, useEffect } from 'react'

interface AboutOptions {

}

const About: React.FC<AboutOptions> = ({ }) => {


    return (
        <div className="m2-about modal is-active">
            <div className="modal-background" onClick={() => this.setState({ showAbout: false })}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">About</p>
                    <button
                        className="delete"
                        aria-label="close"
                        onClick={() => this.setState({ showAbout: false })}
                    ></button>
                </header>
                <section className="modal-card-body">
                    <p>
                        MarkTwo was created by me, Anthony Garvan. I&apos;m a software developer based out of Chicago. I love
                        spending time with my family, working with my team, and tinkering with random projects like this one.
                    </p>

                    <p>
                        MarkTwo is my second attempt at a markdown editor, and obviously my best. It took many months to get
                        right, if you enjoy using it please consider showing your appreciation by buying me a cup of coffee
                        ☕❤️.
                    </p>
                    <div className="m2-me">
                        <img className="m2-profile" src={me} alt="developer" />
                        <div></div>
                    </div>
                </section>
                <footer className="modal-card-foot">
                    <a href="/privacy.txt" target="_blank">
                        Privacy
                    </a>
                    <a href="/terms.txt" target="_blank">
                        Terms
                    </a>
                    <a href="https://github.com/anthonygarvan/marktwo" target="_blank">
                        Source
                    </a>
                    <a className="m2-coffee is-pulled-right" href="https://www.buymeacoffee.com/GDsZofV" target="_blank">
                        <img src={coffee} alt="Buy Me A Coffee" />
                    </a>
                </footer>
            </div>
        </div>
    )
}