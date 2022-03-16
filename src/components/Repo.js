import './Repo.css';
import React, { useContext, useEffect, useState } from 'react';
import { GithubContext } from '../context/GithubContext';
import Doughnut from './charts/Doughnut';
import Bar from './charts/Bar';

function Repo() {
  const { repos } = useContext(GithubContext);
  const [language, setLanguage] = useState({});
  const [stars, setStars] = useState([]);
  const [forks, setForks] = useState([]);
  const [starLang, setStarLang] = useState({});

  const analyzeRepo = () => {
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
  }

  useEffect(() => {
    analyzeRepo();
  }, [repos])
  
  return (
    <section className="section">
      <div className="section-center">

        <div className='repo'>
          <Doughnut data={language} type='doughnut'/>
          <Doughnut data={starLang} type='line'/>
          {stars.length > 0 ? <Bar data={stars} type='starred' /> : ''}
          {forks.length > 0 ? <Bar data={forks} type='forked' /> : ''}
        </div>
      </div>
    </section>

  )
}

export default Repo;