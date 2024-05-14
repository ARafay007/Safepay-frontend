import { Routes, Route } from "react-router-dom";
import { Layout } from './layout';
import { Home } from './home';
import { EditStudent } from './editStudent';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />} >
        <Route index element={<Home />} />
        <Route path=':id' element={<EditStudent />} />
      </Route>
    </Routes>
  );
}

export default App;
