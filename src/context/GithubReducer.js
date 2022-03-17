const GithubReducer = (state, action) => {
    switch (action.type) {
        default:
            return state;
        case 'LOADING':
            return {
                ...state,
                isLoading: true,
            };
        case 'SEARCH_USER':
            return {
                ...state,
                isLoading: true,
                searchUser: action.payload,
            };
        case 'GET_GITHUBER':
            return {
                ...state,
                githubUser: action.payload,
            };
        case 'GET_REPOS':
            return {
                ...state,
                isLoading: false,
                language: action.payload.map(repo => repo.language)
                    .filter(lang => typeof lang === 'string')
                    .reduce((allLang, lang) => {
                        if (lang in allLang) { allLang[lang] += 1 }
                        else { allLang[lang] = 1 }
                        return allLang
                    }, {}),

                starLang: action.payload.map(repo => {
                    let { language, stargazers_count } = repo;
                    return { language, stargazers_count }
                }).filter(t => typeof t.language === 'string')
                    .reduce((total, count) => {
                        let { language, stargazers_count } = count;
                        if (language in total) { total[language] += stargazers_count }
                        else { total[language] = stargazers_count }
                        return total;
                    }, {}),

                stars: action.payload.sort(function (a, b) {
                    return b.stargazers_count - a.stargazers_count
                }).slice(0, 10).filter(repo => repo.stargazers_count !== 0),

                forks: action.payload.sort(function (a, b) {
                    return b.forks_count - a.forks_count
                }).slice(0, 10).filter(repo => repo.forks_count !== 0),
            };
        case 'GET_FOLLOWERS':
            return {
                ...state,
                isLoading: false,
                followersFile: action.payload,
            };
        case 'GET_FOLLOWINGS':
            return {
                ...state,
                isLoading: false,
                followingsFile: action.payload,
            };
        case 'CHECK_LIMIT':
            return {
                ...state,
                isLoading: false,
                requests: action.payload,
            }
    }
}

export default GithubReducer;