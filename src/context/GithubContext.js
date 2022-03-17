import { createContext, useState, useEffect, useCallback, useReducer } from 'react';
import axios from 'axios';
import GithubReducer from './GithubReducer';

const URL = 'https://api.github.com';

const GithubContext = createContext();
const GithubProvider = ({ children }) => {
    const initialState = {
        searchUser: 'github',
        githubUser: [],
        followersFile: [],
        followingsFile: [],
        language: {},
        starLang: {},
        stars: [],
        forks: [],
        isLoading: true,
        requests: 60,
        // errMsg: '',
        // showMsg
    };

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    const [errMsg, setErrMsg] = useState('');
    const [showMsg, setShowMsg] = useState(false);

    const fetchGihubUser = useCallback(async (searchUser) => {
        const res = await axios(`${URL}/users/${searchUser}`)
            .catch(err => console.log(err));

        if (res) {
            dispatch({
                type: 'GET_GITHUBER',
                payload: res.data,
            })

            const resRepos = await axios(`${URL}/users/${searchUser}/repos?per_page=100`).catch(err => console.log(err));
            const resFollowers = await axios(`${URL}/users/${searchUser}/followers?per_page=100`).catch(err => console.log(err));
            const resFollowings = await axios(`${URL}/users/${searchUser}/following?per_page=100`).catch(err => console.log(err));

            if (resRepos) {
                dispatch({
                    type: 'GET_REPOS',
                    payload: resRepos.data.map((r) => {
                        const { name, language, stargazers_count, forks_count } = r;
                        return { name, language, stargazers_count, forks_count }
                    }),
                })
            }
            if (resFollowers) {
                dispatch({
                    type: 'GET_FOLLOWERS',
                    payload: resFollowers.data.reverse(),
                })
            }
            if (resFollowings) {
                dispatch({
                    type: 'GET_FOLLOWINGS',
                    payload: resFollowings.data.reverse(),
                })
            }
        } else {
            setErrMsg('No such user.');
            setShowMsg(true);
            setTimeout(() => { setShowMsg(false) }, 3500);
        }
    }, []);


    const checkLimit = async () => {
        const res = await axios(`${URL}/rate_limit`)
            .catch(err => console.log(err));
        if (res) {
            dispatch({
                type: 'CHECK_LIMIT',
                payload: res.data.rate.remaining,
            })

            if (res.data.rate.remaining === 0) {
                setErrMsg('reached access limit');
                setShowMsg(true);
                setTimeout(() => { setShowMsg(false) }, 3500)
            }
        } else {
            setErrMsg('server error');
            setShowMsg(true);
            setTimeout(() => { setShowMsg(false) }, 3500)
        }
    }

    useEffect(() => {
        checkLimit();

}, [state.followersFile, state.followingsFile, state.githubUser])

    useEffect(() => {
        fetchGihubUser('github');
    }, [fetchGihubUser])


    return <GithubContext.Provider value={{
        githubUser: state.githubUser,
        searchUser: state.searchUser,
        followersFile: state.followersFile,
        followingsFile: state.followingsFile,
        language: state.language,
        starLang: state.starLang,
        stars: state.stars,
        forks: state.forks,
        isLoading: state.isLoading,
        requests: state.requests,
        errMsg,
        showMsg,
        fetchGihubUser,
        dispatch,
    }}>
        {children}</GithubContext.Provider>
}

export { GithubContext, GithubProvider };