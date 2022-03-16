import './chart.css';
import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import colorSet from './colorSet';
import { GoKeyboard, GoFlame } from "react-icons/go";

function Doughnut({ data, type }) {

    useEffect(() => {
        const count = Object.values(data);
        const name = Object.keys(data);

        let legend = false;
        let callbacks = {};

        if (type === 'doughnut') {
            legend = true;
            callbacks = {label: (context) => {
                let label = context.label;
                let value = context.formattedValue;

                if (!label)
                    label = 'Unknown'

                let sum = 0;
                let dataArr = context.chart.data.datasets[0].data;
                dataArr.map(data => {
                    sum += Number(data);
                });

                let percentage = (value * 100 / sum).toFixed(2) + '%';
                return label + ": " + percentage;
            }}
        }

        const myChart = new Chart(document.getElementById(type), {
            type,
            data: {
                labels: name,
                datasets: [{
                    data: count,
                    backgroundColor: colorSet,
                    hoverOffset: 50,
                    tooltip: {
                        callbacks,
                    }
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend,
                }
            },

        });

        return () => { myChart.destroy(); }
    }, [data])


    return (
        <div className='chart'>
            {type === 'doughnut'? <span><GoKeyboard /></span> : <span><GoFlame /></span>}
            
            {type === 'doughnut'? <h3>Coding Languages</h3> : <h3>Stars per  Language</h3>}
            <div className="chart-container">
                <canvas id={type}></canvas>
            </div>


        </div>
    )
}

export default Doughnut;

