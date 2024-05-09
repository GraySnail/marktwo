import React, { useState, useEffect } from 'react'

export interface DocListOptions {}

const DocListPanel: React.FC<DocListOptions> = ({}) => {
  return (
    <div className="m2-docs modal is-active">
      <div className="modal-background" onClick={() => this.setState({ showDocs: false })}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Docs</p>
          <button className="delete" aria-label="close" onClick={() => this.setState({ showDocs: false })}></button>
        </header>
        <section className="modal-card-body">
          <div>
            <label className="m2-import">
              <span className="button is-text is-clear" disabled={this.state.offlineMode}>
                Import
              </span>
              <input type="file" onChange={this.handleImport} accept=".txt,.md" disabled={this.state.offlineMode} />
            </label>
            <button className="button is-outline" onClick={this.startNewFile} disabled={this.state.offlineMode}>
              New
            </button>
          </div>
          <table className="table is-striped is-fullwidth">
            <thead>
              <tr>
                <th></th>
                <th>
                  <abbr title="Filename">Filename</abbr>
                </th>
                <th>
                  <abbr title="Last modified">Last modified</abbr>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.docs &&
                this.state.docs
                  .filter(f => !!f.archived == this.state.viewArchive)
                  .map(f => (
                    <tr key={f.id}>
                      <td>
                        <div className="select">
                          <select value={'default'} onChange={e => this.takeFileAction(e, f)}>
                            <option hidden value="default"></option>
                            <option value="rename">Rename</option>
                            {f.id === this.state.currentDoc && <option value="export">Export</option>}
                            <option value="toggleArchive">{!f.archived ? 'Archive' : 'Move to docs'}</option>
                            <option value="delete">Delete</option>
                          </select>
                        </div>
                      </td>
                      <td className={f.id === this.state.currentDoc ? 'm2-is-current-doc' : undefined}>
                        <a onClick={() => this.openFile(f.id)}>
                          {f.title ? <abbr title={f.title}>{f.title.substring(0, 20)}</abbr> : 'Untitled'}
                        </a>
                      </td>
                      <td>{moment(f.lastModified).fromNow()}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
          <div className="m2-footer">
            <a onClick={() => this.setState({ viewArchive: !this.state.viewArchive })}>
              {this.state.viewArchive ? 'View docs' : 'View archive'}
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}

export default DocListPanel
