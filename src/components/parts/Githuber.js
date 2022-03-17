import React, {useContext} from 'react';
import './Githuber.css';
import { GoOrganization, GoPerson } from "react-icons/go";
import { GithubContext } from '../../context/GithubContext';

function Githuber({ githubersFile, follower }) {
  const { fetchGihubUser, dispatch } = useContext(GithubContext);

  const handleClick = (login) => {
    fetchGihubUser(login);
    dispatch({type:'SEARCH_USER', payload: login})
  }

  return (
    <div className='githuber'>
      {follower ? <div><span><GoOrganization /></span><h3>Followers</h3></div>
       : <div><span><GoPerson /></span><h3>Followings</h3></div>}
       <div className='scroll-githuber'>
       {!githubersFile.length > 0 ? <h4>{follower ? 'No Follower' : 'No Following'}</h4> 
      : githubersFile.map((follower, idx) => {
          const { login, avatar_url } = follower;
          return (
            <div key={idx} className="githuber-list">
              <div className="avatar">
                <img src={avatar_url} alt={login} onClick={()=>{handleClick(login)}}/>
              </div>
              <h4><button onClick={()=>{handleClick(login)}}>@{login}</button></h4>
            </div>)
        })}
       </div>
    </div>
  )
}

export default Githuber