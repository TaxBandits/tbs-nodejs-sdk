import './styles/css/Site.css'
import './styles/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import './styles/css/icons-mdi/css/materialdesignicons.min.css' // Importing material design icon files

import {  BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import ListBusinesses from './pages/ListBusiness'
import CreateBusiness from './pages/CreateBusiness';
import CreateForm1099misc from './pages/CreateForm1099Misc';
import ListForm1099Misc from './pages/ListForm1099Misc';
import UpdateForm1099Misc from './pages/UpdateForm1099Misc';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/listBusiness' element={<ListBusinesses/>}></Route>
          <Route path='/createBusiness' element={<CreateBusiness/>}></Route>
          <Route path='/createForm1099MISC/:businessId' element={<CreateForm1099misc/>}></Route>
          <Route path='/listForm1099MISC/:businessId' element={<ListForm1099Misc/>}></Route>
          <Route path='/Update/:SubmissionId/:RecordId' element={<UpdateForm1099Misc/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
