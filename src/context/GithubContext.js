import { createContext, useState, useEffect, useCallback } from 'react';
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
    const [language, setLanguage] = useState({});
    const [stars, setStars] = useState([]);
    const [forks, setForks] = useState([]);
    const [starLang, setStarLang] = useState({});

    const fetchGihubUser = useCallback(async (searchUser) => {
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
        } else {
            setErrMsg('No such user.');
            setShowMsg(true);
            setTimeout(() => { setShowMsg(false) }, 3500);
        }

        setIsLoading(false);
    }, []);


    const checkLimit = async () => {
        const res = await axios(`${URL}/rate_limit`)
            .catch(err => console.log(err));
        if (res) {
            setRequests(res.data.rate.remaining);
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

    const analyzeRepo = useCallback(() => {
        setLanguage(repos.map(repo => repo.language)
          .filter(lang => typeof lang === 'string')
          .reduce((allLang, lang) => {
            if (lang in allLang) { allLang[lang] += 1 }
            else { allLang[lang] = 1 }
            return allLang
          }, {}));
    
          setStarLang(repos.map(repo=> {
            let {language, stargazers_count} = repo;
            return {language, stargazers_count}
          }).filter(t => typeof t.language === 'string' )
          .reduce((total, count)=>{
            let {language, stargazers_count} = count;
            if( language in total) {total[language] += stargazers_count}
            else {total[language] = stargazers_count}
            return total;
          },{}));   
    
        setStars(repos.sort(function (a, b) {
          return b.stargazers_count - a.stargazers_count
        }).slice(0, 10).filter(repo=>repo.stargazers_count !== 0));
    
        setForks(repos.sort(function (a, b) {
          return b.forks_count - a.forks_count
        }).slice(0, 10).filter(repo=>repo.forks_count !== 0));
      }, [repos])

    useEffect(() => {
        checkLimit();
    }, [repos, followersFile, followingsFile, githubUser])

    useEffect(() => {
        fetchGihubUser('github');
    }, [fetchGihubUser])

    useEffect(() => {
        analyzeRepo();
      }, [analyzeRepo])

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
        language,
        starLang,
        stars,
        forks,
        setSearchUser,
        fetchGihubUser,
    }}>
        {children}</GithubContext.Provider>
}

export { GithubContext, GithubProvider };