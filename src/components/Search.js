import './Search.css';
import { GoMarkGithub } from "react-icons/go";
import React, { useContext } from 'react';
import { GithubContext } from '../context/GithubContext';

function Search() {
    const { fetchGihubUser, requests, searchUser, dispatch } = useContext(GithubContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchGihubUser(searchUser);
    }

    return (
        <section className="section">
            <div className="section-center">
                <div className="search">

                    <form onSubmit={handleSubmit}>
                        <GoMarkGithub />
                        <input
                            type="text"
                            onChange={(e) => { dispatch({ type: 'SEARCH_USER', payload: e.target.value }) }}
                            value={searchUser}
                        />
                        <button
                            className="btn"
                        >Search</button>
                        <div className="limit">
                            <p>{Math.floor(requests / 4)} / 15</p>
                        </div>
                    </form>

                </div>
            </div>
        </section>
    )
}

export default Search