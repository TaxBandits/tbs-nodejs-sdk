import './styles/css/Site.css'
import './styles/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import './styles/css/icons-mdi/css/materialdesignicons.min.css' // Importing material design icon files

import {  BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import CreateBusiness from './pages/CreateBusiness'
import ListBusinesses from './pages/ListBusinesses'
import CreateForm1099k from './pages/CreateForm1099K'
import ListForm1099k from './pages/ListForm1099K'
import UpdateForm1099k from './pages/UpdateForm1099K'



function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/createBusiness' element={<CreateBusiness/>}></Route>
          <Route path='/listBusiness' element={<ListBusinesses/>}></Route>
          <Route path='/createForm1099K/:businessId' element={<CreateForm1099k/>}></Route>
          <Route path='/listForm1099K/:businessId' element={<ListForm1099k/>}></Route>
          <Route path='/Update/:SubmissionId/:RecordId' element={<UpdateForm1099k/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
