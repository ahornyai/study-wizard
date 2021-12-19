import ReactDOM from 'react-dom'
import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Loader from 'react-loader-spinner'

import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './i18n'

import App from './elements/App'

ReactDOM.render(
  <BrowserRouter>
    <Suspense fallback={
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loader
            type="Oval"
            color="#00BFFF"
            height={ 100 }
            width={ 100 }
          />
      </div> } 
    >
      <App />
    </Suspense>
  </BrowserRouter>,
  document.getElementById('root')
)
