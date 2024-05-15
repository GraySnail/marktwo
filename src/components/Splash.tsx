import React, { useState, useLayoutEffect, useEffect } from 'react'
import MarkTwo from './MarkTwo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import $ from 'jquery'
import { get, set } from 'idb-keyval'
import $script from 'scriptjs'

import './Splash.scss'
import logo from '../img/logo512.png'

export interface SlashOptions {
  //
}

export default function Splash(props: SlashOptions) {
  const [tryItNow, setTryItNow] = useState<boolean>(document.location.pathname.startsWith('/try-it-now'))
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [userEmail, setUserEmail] = useState<string>('')
  const [offlineMode, setOfflineMode] = useState<boolean>(false)

  Error.stackTraceLimit = 100

  // useLayoutEffect(() => {
  //   $script('https://apis.google.com/js/client.js', () => {
  //     const gapi = window.gapi
  //     if (gapi) {
  //       gapi.load('client:auth2', () => {
  //         const initSettings = {
  //           client_id: '346746556737-32h3br6e6beeerm71norabl2icv4rl7e.apps.googleusercontent.com',
  //           scope:
  //             'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.appdata',
  //           discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
  //           response_type: 'id_token permission',
  //         }
  //         //  setState({ isAuthenticated, gapi, userEmail })

  //         gapi.client.init(initSettings).then(() => {
  //           const isAuthenticated = gapi.auth2.getAuthInstance().isSignedIn.get()
  //           setIsAuthenticated(isAuthenticated)

  //           if (isAuthenticated) {
  //             try {
  //               window.gtag('event', 'login', { method: 'Google' })
  //             } catch {}
  //             const userEmail = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail()
  //             setUserEmail(userEmail)

  //             set('userEmail', userEmail)
  //           } else {
  //           }
  //         })
  //       })
  //     } else {
  //       get('userEmail').then(userEmail => {
  //         setIsAuthenticated(true)
  //         setOfflineMode(true)
  //         setUserEmail(userEmail as string)
  //       })
  //     }
  //   })
  // }, [])

  const handleLogin = () => {
    try {
      window.gtag('event', 'sign_up', { method: 'Google' })
    } catch {}
    window.gapi.auth2
      .getAuthInstance()
      .signIn()
      .then(() => {
        const isAuthenticated = window.gapi.auth2.getAuthInstance().isSignedIn.get()
        if (isAuthenticated) {
          const userEmail = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail()
          setIsAuthenticated(isAuthenticated)
          setUserEmail(userEmail)
          set('userEmail', userEmail)
          $('.m2-is-signed-out').hide()
        }
      })
  }

  const handleSwitchUser = () => {
    window.gapi.auth2
      .getAuthInstance()
      .signIn({ prompt: 'select_account' })
      .then(() => {
        window.location.reload()
      })
  }

  useEffect(() => {
    if (!isAuthenticated) {
      $(window).scrollTop(0)
      $('body').removeClass('m2-dark-mode')
    }
  }, [isAuthenticated])

  const handleLogout = () => {
    window.gapi.auth2
      .getAuthInstance()
      .signOut()
      .then(() => setIsAuthenticated(false))
  }

  const AppLoading = () => (
    <div className="m2-load-screen">
      <h1 className="title is-1">
        <img src={logo} alt="logo" />
        MarkTwo
        <img src={logo} alt="logo" />
      </h1>
    </div>
  )

  const AppHome = () => (
    <div className="m2-splash-container">
      <div className="m2-splash">
        <div className="m2-hero">
          <h1 className="title is-1">
            <img src={logo} alt="logo" />
            MarkTwo
            <img src={logo} alt="logo" />
          </h1>
          <p>A seamless, speedy, syncing markdown editor.</p>
          <div className="m2-cta">
            <a className="button is-primary is-outlined" href="/try-it-now">
              Try the demo
            </a>
            <button className="button is-primary is-outlined" onClick={handleLogin}>
              Log in with Google
            </button>
          </div>
        </div>

        <div className="m2-tiles">
          <div className="columns">
            <div className="column">
              <h4 className="title is-4">Seamless</h4>
              <p>Read and edit markdown from a single view. No need to toggle back and forth.</p>
            </div>
            <div className="column">
              <h4 className="title is-4">Speedy</h4>
              <p>Tested on War & Peace, it's built for big docs like work notes, personal notes, and journals.</p>
            </div>
            <div className="column">
              <h4 className="title is-4">Syncing</h4>
              <p>MarkTwo is web-native, so it works across devices, and your docs are always synced.</p>
            </div>
          </div>
          <hr />
          <div className="columns">
            <div className="column">
              <h4 className="title is-4">Private</h4>
              <p>MarkTwo is a static app backed by your own Google Drive&mdash;we don't store any of your data.</p>
            </div>
            <div className="column">
              <h4 className="title is-4">Powerful</h4>
              <p>Hashtags, search, reminders, slash commands, and much more help you stay productive.</p>
            </div>
            <div className="column">
              <h4 className="title is-4">Free</h4>
              <p>No lock-in&mdash;MarkTwo is free and open source, and you can export your docs at any time.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div>
      {/* {tryItNow && (
        <MarkTwo
          gapi={gapi}
          handleLogout={() => (window.location.href = '/')}
          handleLogin={() => alert("You're in anonymous mode! To log in please sign in under your google account")}
          handleSwitchUser={() => alert("Sorry! Can't switch users in anonymous mode.")}
          tryItNow={true}
          offlineMode={offlineMode}
        />
      )}
      {!tryItNow && isAuthenticated && (
        <MarkTwo
          key={userEmail}
          userEmail={userEmail}
          gapi={gapi}
          handleLogout={handleLogout}
          handleLogin={handleLogin}
          handleSwitchUser={handleSwitchUser}
          tryItNow={false}
          offlineMode={offlineMode}
        />
      )} */}
      {!tryItNow && isAuthenticated === null && <AppLoading />}
      {!tryItNow && isAuthenticated === false && <AppHome />}
    </div>
  )
}
