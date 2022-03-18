import React, { useContext } from 'react';
import Loading from './Loading';
import Info from './components/Info';
import Profile from './components/Profile';
import Repo from './components/Repo';
import { GithubContext } from './context/GithubContext';
import Footer from './Footer';
import Error from './Error';

function Dashboard() {
  const { isLoading, requests, isError, errMsg } = useContext(GithubContext);

  return (
    <div>
      {isLoading ? <Loading /> :
        <>{requests !== 0 && !isError ?
          <>
            <Info />
            <Profile />
            <Repo /><Footer />
          </>
          : <Error message={errMsg}/>}
        </>}
    </div>
  )
}

export default Dashboard