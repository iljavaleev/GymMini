
import { Generic } from '../generic/generic'
import { Routes, Route, Outlet, Navigate } from 'react-router';
import { StyledChiled, StyledContainer } from './styles';


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
     <StyledContainer>
      <StyledChiled>
        <Outlet />
      </StyledChiled>
     </StyledContainer>
  );
};

export default App
