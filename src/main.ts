import './app.css'
import App from './App.svelte'
import { dragToScroll } from './lib/utils/impure/dragToScroll'
import { initContentMessageBroker } from './lib/messageBroker/content-message-broker'
import { attachObservers } from './lib/stores/browserObservers'
import { alertOnError } from './lib/utils/impure/setupDevErrorHandling'

if (import.meta.env.DEV) { alertOnError() }
initContentMessageBroker()
attachObservers()
dragToScroll(document.documentElement)

const app = new App({
  target: document.getElementById('app')!,
})

export default app
