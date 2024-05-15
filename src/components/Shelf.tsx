import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faEllipsisV, faSearch, faFileAlt, faCog } from '@fortawesome/free-solid-svg-icons'
import './Shelf.scss'
import anonymous from '../img/anonymous.png'

import user from '../img/user.png'
import { set, get } from 'idb-keyval'
import Contact from './Contact'
import About from './About'
import Help from './Help'

interface ShelfProps {
  tryItNow: string
  showShelf: boolean
}

interface UserInfo {
  username: string
  email: string
  avatar: string
}
const Shelf: React.FC<ShelfProps> = ({ tryItNow, showShelf }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>()

  const getUserProfile = () => {
    if (this.props.gapi) {
      const profile = this.props.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile()
      const userEmail = profile.getEmail()
      const userName = profile.getName()
      this.setState({ userEmail, photoUrl: profile.getImageUrl(), userName })
      set('userEmail', userEmail)
      set('userName', userName)
    } else {
      get('userEmail').then(userEmail => {
        get('userName').then(userName => {
          this.setState({ userEmail, userName, photoUrl: user })
        })
      })
    }
  }

  return showShelf ? (
    <div className="m2-shelf">
      <div className="m2-profile">
        <div className="m2-profile-photo">
          <img src={this.state.photoUrl} alt="profile" />
        </div>
        <div className="m2-username">{this.state.userName}</div>
        <div className="m2-email">{this.state.userEmail}</div>
        <div className="m2-switch-user">
          <button className="button is-clear" onClick={this.props.handleSwitchUser} disabled={this.props.offlineMode}>
            Switch user
          </button>
          <button className="button is-clear" onClick={this.props.handleLogout} disabled={this.props.offlineMode}>
            Sign out
          </button>
        </div>
      </div>
      <div className="m2-menu-links">
        <div>
          <a onClick={this.props.showSearch}>
            <FontAwesomeIcon icon={faSearch} />
            &nbsp;&nbsp;Search
          </a>
        </div>
        <div>
          <a onClick={() => this.props.showDocs(true)}>
            <FontAwesomeIcon icon={faFileAlt} />
            &nbsp;&nbsp;Docs
          </a>
        </div>
        <div>
          <a onClick={this.props.showSettings}>
            <FontAwesomeIcon icon={faCog} />
            &nbsp;&nbsp;Settings
          </a>
        </div>
      </div>
      <div className="m2-menu-footer">
        <Contact />
        <Help />
        <About />
      </div>
      <a className="m2-close" onClick={() => this.props.setShelf(false)}>
        <FontAwesomeIcon icon={faTimes} />
      </a>
    </div>
  ) : (
    <div className="m2-menu">
      <a className="m2-ellipsis" onClick={() => this.props.setShelf(true)}>
        <FontAwesomeIcon icon={faEllipsisV} />
      </a>
    </div>
  )
}

export default Shelf
