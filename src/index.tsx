import React from 'react';
import {createRoot} from 'react-dom/client'

import App from './App'
import * as serviceWorker from './serviceWorker'

const domNode = document.getElementById('root')

if (!domNode) throw new Error('Failed to find the root element');

const root = createRoot(domNode)
root.render(<App/>)

// ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
