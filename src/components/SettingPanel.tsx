import React, { useState, useEffect } from 'react'

export interface SettingOptions {}
const SettingPanel: React.FC<SettingOptions> = () => {
  return (
    <div className="m2-settings modal is-active">
      <div className="modal-background" onClick={() => this.setState({ showSettings: false })}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Settings</p>
          <button className="delete" aria-label="close" onClick={() => this.setState({ showSettings: false })}></button>
        </header>
        <section className="modal-card-body">
          <div className="field">
            <input
              id="m2-dark-mode-switch"
              type="checkbox"
              name="m2-dark-mode-switch"
              className="switch"
              checked={this.state.darkMode}
              onChange={e => this.setDarkMode(e.target.checked)}
            />
            <label htmlFor="m2-dark-mode-switch">Dark mode</label>
          </div>

          <div className="field">
            <input
              id="m2-offline-mode-switch"
              type="checkbox"
              name="m2-offline-mode-switch"
              className="switch"
              checked={this.state.offlineMode}
              onChange={e => this.setOfflineMode(e.target.checked)}
            />
            <label htmlFor="m2-offline-mode-switch">
              Offline mode <FontAwesomeIcon icon={faBolt} />
            </label>
          </div>

          <div className="field">
            <input
              id="m2-spellcheck-switch"
              type="checkbox"
              name="m2-spellcheck-switch"
              className="switch"
              checked={this.state.spellcheck}
              onChange={e => this.setSpellcheck(e.target.checked)}
            />
            <label htmlFor="m2-spellcheck-switch">Spellcheck</label>
          </div>

          <div className="field">
            <input
              id="m2-serif-switch"
              type="checkbox"
              name="m2-serif-switch"
              className="switch"
              checked={this.state.serif}
              onChange={e => this.setSerif(e.target.checked)}
            />
            <label htmlFor="m2-serif-switch">Serif font</label>
          </div>

          <div className="field">
            <p>
              <FontAwesomeIcon icon={faInfoCircle} />
              &nbsp;&nbsp;Images you upload via <code>/image</code> are served out of your Google Drive{' '}
              <a onClick={this.handleViewImageFolder}>here</a>.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default SettingPanel
