import React from 'react'
import ReactDOM from 'react-dom'
import singleSpaReact from 'single-spa-react'
import SupportChatWidget from './SupportChatWidget.jsx'

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: SupportChatWidget,
  domElementGetter: () => document.getElementById('chat'),
  suppressComponentDidCatchWarning: true,
})

export const bootstrap = [reactLifecycles.bootstrap]

export const mount = [reactLifecycles.mount]

export const unmount = [reactLifecycles.unmount]