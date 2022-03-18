import './Search.css';
import { GoMarkGithub } from "react-icons/go";
import React, { useContext } from 'react';
import { GithubContext } from '../context/GithubContext';

function Search() {
    const { fetchGihubUser, requests, dispatch, showSearch } = useContext(GithubContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (requests > 0) {
        fetchGihubUser(showSearch);
        dispatch({ type: 'SEARCH_USER', payload: showSearch })}
    }

    return (
        <section className="section">
            <div className="section-center">
                <div className="search">

                    <form onSubmit={handleSubmit}>
                        <GoMarkGithub />
                        <input
                            type="text"
                            onChange={(e) => { dispatch({ type: 'CHANGE_SEARCH', payload: e.target.value }) }}
                            value={showSearch}
                        />
                        <button
                            className="btn"
                            disabled={requests === 0 ? true : false}
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