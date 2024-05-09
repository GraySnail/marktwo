import React, { useState, useEffect } from 'react'

export interface SeachOptions {}
const SearchPanel: React.FC<SeachOptions> = ({}) => {
  return (
    <div className="m2-search modal is-active">
      <div
        className="modal-background"
        onClick={() => this.setState({ showSearch: false, searchString: '', searchResults: [] })}
      ></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Search</p>
          <button
            className="delete"
            aria-label="close"
            onClick={() => this.setState({ showSearch: false, searchString: '', searchResults: [] })}
          ></button>
        </header>
        <section className="modal-card-body">
          <form onSubmit={this.handleSearch}>
            <div className="field has-addons">
              <div className="control is-expanded">
                <input
                  className="input is-fullwidth"
                  type="search"
                  placeholder="Search this doc"
                  value={this.state.searchString}
                  onChange={e => this.setState({ searchString: e.target.value })}
                />
              </div>
              <div className="control m2-search-button">
                <button type="submit" className="button is-primary">
                  Search
                </button>
              </div>
            </div>
          </form>
          <div className="m2-search-results">
            {this.state.searchResults.length ? (
              this.state.searchResults.map(r => (
                <div
                  key={r.id}
                  className="m2-search-result"
                  onClick={() =>
                    this.setState({
                      goToBlock: r.id,
                      showSearch: false,
                      searchString: '',
                      searchResults: [],
                      showShelf: false,
                    })
                  }
                  dangerouslySetInnerHTML={{ __html: r.html }}
                ></div>
              ))
            ) : (
              <p>
                <em>Didn't find anything...</em>
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default SearchPanel
