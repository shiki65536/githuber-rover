import { createContext, useRef, useState, useEffect } from 'react';
import axios from 'axios';


const URL = 'https://api.github.com';

const GithubContext = createContext();

const GithubProvider = ({ children }) => {
    const [githubUser, setGithubUser] = useState([]);
    const [followersFile, setFollowersFile] = useState([]);
    const [repos, setRepos] = useState([]);
    const [followingsFile, setFollowingsFile] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [requests, setRequests] = useState(60);
    const [searchUser, setSearchUser] = useState('github');
    const [errMsg, setErrMsg] = useState('');
    const [showMsg, setShowMsg] = useState(false);

    const fetchGihubUser = async (searchUser) => {
        const res = await axios(`${URL}/users/${searchUser}`)
            .catch(err => console.log(err));

        if (res) {
            setGithubUser(res.data);

            const resRepos = await axios(`${URL}/users/${searchUser}/repos?per_page=100`).catch(err => console.log(err));
            const resFollowers = await axios(`${URL}/users/${searchUser}/followers?per_page=100`).catch(err => console.log(err));
            const resFollowings = await axios(`${URL}/users/${searchUser}/following?per_page=100`).catch(err => console.log(err));

            if (resFollowers) {
                setFollowersFile(resFollowers.data.reverse());
            }
            if (resRepos) {
                setRepos(resRepos.data.map((r) => {
                    const { name, language, stargazers_count, forks_count } = r;
                    return { name, language, stargazers_count, forks_count }
                }))
            }
            if (resFollowings) {
                setFollowingsFile(resFollowings.data.reverse())
            }
        } else if (requests === 0) {
            setErrMsg('reached access limit');
            setShowMsg(true);
            setTimeout(()=>{setShowMsg(false)},3500)
        } else {
            setErrMsg('No such user.');
            setShowMsg(true);
            setTimeout(()=>{setShowMsg(false)},3500);
        }

        setIsLoading(false);
    }


    const checkLimit = async () => {
        const res = await axios(`${URL}/rate_limit`)
            .catch(err => console.log(err));
        if (res) {
            setRequests(res.data.rate.remaining);
            if(res.data.rate.remaining === 0) {
                setErrMsg('reached access limit');
                setShowMsg(true);
                setTimeout(()=>{setShowMsg(false)},3500)
            }
        } else {
           setErrMsg('server error');
           setShowMsg(true);
           setTimeout(()=>{setShowMsg(false)},3500)
        }
    }

    useEffect(() => {
        checkLimit();
    }, [repos, followersFile, followingsFile, githubUser])

    return <GithubContext.Provider value={{
        githubUser,
        followersFile,
        followingsFile,
        repos,
        isLoading,
        requests,
        searchUser,
        errMsg,
        showMsg,
        setSearchUser,
        fetchGihubUser,
    }}>
        {children}</GithubContext.Provider>
}

export { GithubContext, GithubProvider };