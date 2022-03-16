import './Profile.css';
import React, { useContext } from 'react';
import { GithubContext } from '../context/GithubContext';
import Githuber from './parts/Githuber';
import Biography from './parts/Biography';

function Profile() {
  const { githubUser, followersFile, followingsFile } = useContext(GithubContext);

  return (
    <section className="section">
      <div className="section-center">
        <div className='profile'>
          <Biography githubUser={githubUser} />
          <div className="rover">
            <Githuber githubersFile={followersFile} follower={true} />
            <Githuber githubersFile={followingsFile} follower={false} />
          </div>
        </div>
      </div>

    </section>
  )
}

export default Profile