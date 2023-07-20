import '../src/styles/css/Site.css' // Importing css files
import '../src/styles/css/bootstrap.min.css' // Importing bootstrap files

import GenerateJWTToken from './pages/GenerateJWTToken' // Importing GenerateJWTToken page

function App() {
  return (
    <div className="App">
      <GenerateJWTToken />
    </div>
  );
}

export default App;
