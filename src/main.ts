import './app.css'
import App from './App.svelte'
import { initContentMessageBroker } from './lib/messageBroker/content-message-broker'

initContentMessageBroker()

const app = new App({
  target: document.getElementById('app')!,
})

export default app
