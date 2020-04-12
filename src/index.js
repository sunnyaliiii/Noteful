
import React from 'react'
import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faPlus, faChevronLeft, faTrashAlt, faCheckDouble
} from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter } from 'react-router-dom'
import 'typeface-roboto'
import './index.css'
import App from './App/App';
import ErrorPage from './ErrorPage/ErrorPage';

require('dotenv').config();


library.add(faPlus, faChevronLeft, faTrashAlt, faCheckDouble)

ReactDOM.render(
  <ErrorPage>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ErrorPage>,
  document.getElementById('root')
)
