import './styles/css/Site.css' // Importing bootstrap files
import './styles/css/bootstrap.min.css' // Importing bootstrap files
import './styles/css/icons-mdi/css/materialdesignicons.min.css' // Importing material design icon files
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom' // Importing router
import Home from './pages/Home' // Importing Home page
import CreateBusiness from './pages/CreateBusiness' // Importing Create Business page
import ListBusinesses from './pages/ListBusinesses' // Importing List Business page
import UpdateBusiness from './pages/UpdateBusiness' // Importing Update Businesss page


function App() {
  return (
    <div className="App">
      {/*Defining Routes*/}
      <Router>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route exact path='create' element={<CreateBusiness />}></Route>
          <Route exact path='list' element={<ListBusinesses />}></Route>
          <Route exact path='update/:businessId' element={<UpdateBusiness />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
