import 'react-app-polyfill/stable'
import 'core-js'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import store from './store'
import { QueryClientProvider } from 'react-query'
import { queryClient } from './services/queryClient'
import { RecordsContextProvider } from './contexts/RecordsContext'

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <RecordsContextProvider>
        <App />
      </RecordsContextProvider>
    </Provider>
  </QueryClientProvider>,
  document.getElementById('root'),
)

serviceWorker.unregister()
