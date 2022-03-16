import './Biography.css';
import { GoLocation, GoBriefcase, GoHome } from "react-icons/go";
import React from 'react';

function Biography({githubUser}) {
    const { login, avatar_url, html_url, name, location, company, blog, bio } = githubUser;

    return (
        <div className='biography'>
            <div className="bio-header">
                <div className="avatar"><img src={avatar_url} alt={name} /></div>
                <div><h3>{name}</h3><p>@{login ? login : ''}</p></div>
                <div className='follow-btn'><a href={html_url} className="btn">follow</a></div>
            </div>
            <div className='bio'> {bio ? bio : ''}</div>

            <div className="appendix">

                <div><span><GoLocation /></span> {location ? location : '---'}</div>
                <div><span><GoBriefcase /></span> {company ? company : '---'}</div>
                <div><span><GoHome /></span> {blog ? <a href={blog}>{blog}</a> : '---'}</div>
            </div>
        </div>
    )
}

export default Biography