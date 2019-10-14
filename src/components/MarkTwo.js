import React from 'react';
import moment from 'moment';
import Shelf from './Shelf';
import shortid from 'shortid';
import Doc from './Doc';
import stringify from 'json-stringify-deterministic';
import './MarkTwo.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

class MarkTwo extends React.Component {
  constructor(props) {
    super(props);

    this.openFile = this.openFile.bind(this);
    this.startNewFile = this.startNewFile.bind(this);


    let appData;
    if(localStorage.getItem('appData')) {
      appData = JSON.parse(localStorage.getItem('appData'));
    } else {
      const currentDoc = shortid.generate();
      appData = { currentDoc, files: [ {id: currentDoc, title: false, lastModified: new Date()} ], revision: 0 };
    }

    localStorage.setItem('appData', stringify(appData));
    this.state = {
      newTitle: false,
      ...appData
    };

  }

  openFile(id) {
    const appData = JSON.parse(localStorage.getItem('appData'));
    appData.currentDoc = id;
    this.setState({ currentDoc: id, showFiles: false })
    localStorage.setItem('appData', stringify(appData));
  }

  startNewFile() {
   const appData = JSON.parse(localStorage.getItem('appData'));
   const id = shortid.generate();
   appData.files.unshift({ id, title: false, lastModified: new Date() });
   this.setState({ files: appData.files, currentDoc: id, showFiles: false });
   localStorage.setItem('appData', stringify(appData));
  }

  setTitle(id, title) {
    const appData = JSON.parse(localStorage.getItem('appData'));
    appData.file = appData.files.map(f => {
      if(f.id === id) {
        f.title = this.state.newTitle;
      }
    });
    this.setState({ files: appData.files, newTitle: false, editTitle: false });
    localStorage.setItem('appData', stringify(appData));
  }

  render() {
    return <div>
    <Doc key={this.state.currentDoc}
      currentDoc={this.state.currentDoc}
      gapi={this.props.gapi}
      handleLogout={this.props.handleLogout}
      handleSwitchUser={this.props.handleSwitchUser}
      tryItNow={this.props.tryItNow} />
    <Shelf handleLogout={this.props.handleLogout}
      handleSwitchUser={this.props.handleSwitchUser}
      gapi={this.props.gapi}
      tryItNow={this.props.tryItNow}
      showFiles={(val) => this.setState({ showFiles: val })} />

    <div className={`m2-files modal ${this.state.showFiles && 'is-active'}`}>
    <div className="modal-background" onClick={() => this.setState({showFiles: false})}></div>
      <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Files</p>
        <button className="delete" aria-label="close" onClick={() => this.setState({showFiles: false})}></button>
      </header>
      <section className="modal-card-body">
        <div><button className="button is-outline" onClick={this.startNewFile}>New</button></div>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th><abbr title="File name">Name</abbr></th>
              <th><abbr title="Last modified">Last modified</abbr></th>
            </tr>
          </thead>
          <tbody>
            {this.state.files.map(f =>
              <tr key={f.id}>
                <td>{this.state.editTitle !== f.id ? <span><a onClick={() => this.openFile(f.id)}>{f.title ? <abbr title={f.title}>{f.title.substring(0,20)}</abbr>: 'Untitled'}</a>
                <a className="is-pulled-right" onClick={() => this.setState({ editTitle: f.id, newTitle: f.title })}> <FontAwesomeIcon icon={faEdit} /></a></span>
                : <span><input value={this.state.newTitle || ''} placeholder="Untitled" onChange={(e) => this.setState({ newTitle: e.target.value })}/>
                <span className="is-pulled-right"><a onClick={() => this.setTitle(f.id)}><FontAwesomeIcon icon={faCheck} /></a> &nbsp;&nbsp;
                <a onClick={() => this.setState({ editTitle: false, newTitle: false })}><FontAwesomeIcon icon={faTimes} /></a></span></span>}
                </td>
                <td>{moment(f.lastModified).fromNow()}</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
    </div></div>
  }
}

export default MarkTwo
