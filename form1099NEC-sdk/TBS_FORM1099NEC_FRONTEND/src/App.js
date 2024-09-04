import './styles/css/Site.css'
import './styles/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import './styles/css/icons-mdi/css/materialdesignicons.min.css' // Importing material design icon files
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import CreateForm1099NEC from './pages/CreateForm1099NEC'
import ListForm1099NEC from './pages/ListForm1099NEC'
import UpdateForm1099NEC from './pages/UpdateForm1099NEC'
import Home from './pages/Home'
import CreateBusiness from './pages/CreateBusiness'
import ListBusinesses from './pages/ListBusinesses'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/createBusiness' element={<CreateBusiness />}></Route>
          <Route exact path='/listBusiness' element={<ListBusinesses />}></Route>
          <Route exact path='/createForm1099NEC/:businessId' element={<CreateForm1099NEC />}></Route>
          <Route exact path='/listForm1099NEC/:businessId/:businessName' element={<ListForm1099NEC />}></Route>
          <Route exact path='/Update/:SubmissionId/:RecordId' element={<UpdateForm1099NEC />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
