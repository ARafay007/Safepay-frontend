import { Outlet } from "react-router-dom";
import Stack from 'react-bootstrap/Stack';
import { NavigationBar } from './components/navbar';

export const Layout = () => {
  return (
    <Stack>
      <NavigationBar />
      <div className="p-5">
        <Outlet />
      </div>
    </Stack>
  );
}