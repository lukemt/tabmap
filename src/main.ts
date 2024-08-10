import './app.css'
import App from './App.svelte'
import { dragToScroll } from './dragToScroll'
import { initContentMessageBroker } from './lib/messageBroker/content-message-broker'
import { attachObservers } from './lib/stores/browserObservers'

initContentMessageBroker()
attachObservers()
dragToScroll(document.documentElement)

const app = new App({
  target: document.getElementById('app')!,
})

export default app
