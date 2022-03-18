import { createContext, useEffect, useCallback, useReducer } from 'react';
import axios from 'axios';
import GithubReducer from './GithubReducer';

const URL = 'https://api.github.com';

const GithubContext = createContext();
const GithubProvider = ({ children }) => {
    const initialState = {
        searchUser: 'github',
        showSearch: 'github',
        githubUser: [],
        followersFile: [],
        followingsFile: [],
        language: {},
        starLang: {},
        stars: [],
        forks: [],
        requests: 60,
        isLoading: true,
        isError: false,
        errMsg: '',
        showMsgBox: false
    };

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    const fetchGihubUser = useCallback(async (searchUser) => {

        setIsLoading();
        const res = await axios(`${URL}/users/${searchUser}`)
            .catch(err => {
                if (err.response.status === 404) {

                    dispatch({
                        type: 'NO_USER_ERROR',
                        payload: 'No Such User',
                    })
                    setTimeout(()=> {dispatch({type:'CANCEL_BOX', payload: false})},3000)
                } else if(err.response.status === 403) {
                    dispatch({
                        type: 'REACH_LIMIT_ERROR',
                        payload: 'reached github access limit',
                    })
                    setTimeout(()=> {dispatch({type:'CANCEL_BOX', payload: false})},3000)
                } else {
                    dispatch({
                        type: 'FETCH_ERROR',
                        payload: 'errors in fetching data',
                    })
                    setTimeout(()=> {dispatch({type:'CANCEL_BOX', payload: false})},3000)
                }
            })

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
                dispatch({
                    type: 'REACH_LIMIT_ERROR',
                    payload: 'reached github access limit',
                })
                setTimeout(()=> {dispatch({type:'CANCEL_BOX', payload: false})},3000)
            }
        } else {
            dispatch({
                type: 'SERVER_ERROR',
                payload: 'errors in checking server limit.',
            })
            setTimeout(()=> {dispatch({type:'CANCEL_BOX', payload: false})},3000)
        }
    }

    const setIsLoading = () => {
        dispatch({ type: 'LOADING' });
    }

    useEffect(() => {
        checkLimit();
    }, [state.followersFile])

    useEffect(() => {
        fetchGihubUser('github');
    }, [fetchGihubUser])

    return <GithubContext.Provider value={{
        ...state,
        fetchGihubUser,
        dispatch,
    }}>
        {children}</GithubContext.Provider>
}

export { GithubContext, GithubProvider };