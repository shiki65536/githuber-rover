import './Repo.css';
import React, { useContext } from 'react';
import { GithubContext } from '../context/GithubContext';
import Doughnut from './charts/Doughnut';
import Bar from './charts/Bar';

function Repo() {
  const { stars, forks, language, starLang } = useContext(GithubContext);

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