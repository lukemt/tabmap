import './app.css'
import App from './App.svelte'
import { initContentMessageBroker } from './lib/messageBroker/content-message-broker'
import { attachObservers } from './lib/stores/browserObservers'

initContentMessageBroker()
attachObservers()
// dragToScroll(document.body)

const app = new App({
  target: document.getElementById('app')!,
})

export default app
