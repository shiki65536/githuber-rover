import './Info.css';
import React, { useContext } from 'react';
import { GithubContext } from '../context/GithubContext';
import { GoBroadcast, GoTelescope, GoRepo, GoGist } from "react-icons/go";
import Detail from './parts/Detail';

function Info() {
  const { githubUser } = useContext(GithubContext);
  let { public_repos: repos, public_gists: gists, followers, following, type } = githubUser;

  if (type === 'Organization') {
    followers = 'N/A';
    following = 'N/A';
  }

  const info = [
    {
      label: 'followers',
      value: followers,
      icon: <GoBroadcast />,
      color: 'purple'
    },
    {
      label: 'following',
      value: following,
      icon: <GoTelescope />,
      color: 'green'
    },
    {
      label: 'repository',
      value: repos,
      icon: <GoRepo />,
      color: 'pink'
    },
    {
      label: 'gists',
      value: gists,
      icon: <GoGist />,
      color: 'yellow'
    },
  ]

  return (
    <section className="section">
      <div className="section-center">
        <div className="info">
          {info.map((item, idx) => {
          return <Detail key={idx} {...item} />
          }
         )}
        </div>
      </div>
    </section>
  )
}

export default Info