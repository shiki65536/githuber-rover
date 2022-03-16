import './chart.css';
import { GoStar, GoRepoForked } from "react-icons/go";
import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import colorSet, { transparentSet } from './colorSet';

function Bar({data, type}) {
    const name = data.map(project => project.name);

    let axis = 'x';
    let count = [];
    if (type === 'forked') {
        count = data.map(project => project.forks_count);
        axis = 'y';
    } else if (type === 'starred') {
        count = data.map(project => project.stargazers_count);
    }    

    useEffect(()=>{
        const mostChart = new Chart(document.getElementById(type).getContext('2d'), {
            type: 'bar',
            data: {
                labels: name,
                datasets: [{
                    data: count,
                    backgroundColor: colorSet,
                    hoverBackgroundColor: transparentSet,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: axis,
                plugins: {
                    legend: false,
                },
            }
        });
        return () => { mostChart.destroy() };
    },[data])

    return (
        <div className='chart'>
            { type === 'starred' ? <span><GoStar /></span> : <span><GoRepoForked /></span>}
            <h3>Most {type} Repos</h3>
            <div className="chart-container">
            <canvas id={type}></canvas>
            </div>
        </div>
    )
}

export default Bar