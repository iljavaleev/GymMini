
import { Generic } from '../generic/generic'
import { Routes, Route, Outlet, Navigate } from 'react-router';


const App = () => {
  
  return (
      <Routes>
          <Route element={<Layout/>}>
            <Route index element={<Generic />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Route>
      </Routes>
  )
}

const Layout = () => {
  return (
     <div id='styled-container'>
      <div id='styled-child'>
        <Outlet />
      </div>
     </div>
  );
};

export default App
