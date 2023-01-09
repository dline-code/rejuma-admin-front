import 'react-app-polyfill/stable'
import 'core-js'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import store from './store'
import { RecordsContextProvider } from './contexts/RecordsContext'
import { queryClient } from './services/queryClient'
import { QueryClientProvider } from 'react-query'

ReactDOM.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RecordsContextProvider>
        <App />
      </RecordsContextProvider>
    </QueryClientProvider>
  </Provider>,
  document.getElementById('root'),
)

serviceWorker.unregister()
