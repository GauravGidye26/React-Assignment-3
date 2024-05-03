import { Outlet } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import classes from './RootPage.module.css';

function RootPage() {
  return (
    <>
      <NavigationBar />
      <main className={classes.content}>
        <Outlet />
      </main>
    </>
  );
}

export default RootPage;