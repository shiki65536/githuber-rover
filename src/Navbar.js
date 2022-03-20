import './Navbar.css';
import { GoOctoface } from "react-icons/go";
import React, {useContext} from 'react';
import { GithubContext } from './context/GithubContext';

function Navbar() {
  const {errMsg, showMsgBox, fetchGihubUser, dispatch } = useContext(GithubContext);

  const handleClick = () => {
    fetchGihubUser('github');
    dispatch({ type: 'SEARCH_USER', payload: 'github' })
}

  return (
    <div className='navbar'>
      <div className="section-center">
        <div className="nav-header">
          <div className='logo' onClick={() => handleClick() }>
            <GoOctoface /> <h2>Githuber Rover</h2>
           </div>
           <div className="nav-message">
           {showMsgBox ? 
          <><div className="error-message" style={{opacity:1}}>{errMsg}</div><div className='arrow' style={{opacity:1}}></div></> 
          : 
          <><div className="error-message" style={{opacity:0}}>{errMsg}</div><div className='arrow' style={{opacity:0}}></div></>}
             
           </div>
        
        </div>

      </div>

    </div>


  )
}

export default Navbar