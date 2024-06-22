import React from 'react';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Box, Text } from '@chakra-ui/react';

const IntensityChart = ({ data }) => {

    const processedData = data.map(item => ({
        ...item,
        start_year: item.start_year || 2016,
    }));

    const intensityByYear = processedData.reduce((acc, item) => {
        if (!acc[item.start_year]) {
            acc[item.start_year] = { totalIntensity: 0, count: 0 };
        }
        acc[item.start_year].totalIntensity += item.intensity;
        acc[item.start_year].count += 1;
        return acc;
    }, {});

    const avgIntensityByYear = Object.keys(intensityByYear).map(year => ({
        year,
        avgIntensity: intensityByYear[year].totalIntensity / intensityByYear[year].count,
    })).sort((a, b) => a.year - b.year);

    const years = avgIntensityByYear.map(item => item.year);
    const avgIntensities = avgIntensityByYear.map(item => item.avgIntensity);

    const assignColor = (value) => {
        return value > 50 ? '#FF453A' : '#7F00FF';
    };

    const chartData = {
        labels: years,
        datasets: [
            {
                label: 'Average Intensity',
                backgroundColor: avgIntensities.map(value => assignColor(value)),
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 1,
                data: avgIntensities,
            },
        ],
    };

    const chartOptions = {
        layout: {
            padding: {
                top: 20,
                bottom: 20,
                left: 20,
                right: 20,
            },
        },
        plugins: {
            tooltip: {
                enabled: true,
                backgroundColor: 'rgba(0,0,0,0.8)',
                titleColor: 'white',
                bodyColor: 'white',
                borderColor: 'white',
                borderWidth: 1,
                cornerRadius: 5,
                displayColors: false,
            },
            legend: {
                display: false,
            },
            datalabels: {
                anchor: 'end',
                align: 'start',
                offset: -20,
                font: {
                    size: 14,
                    weight: 'bold',
                },
                formatter: (value) => value.toFixed(2) + '%',
                shadowBlur: 10,
                shadowColor: 'white',
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        family: 'Roboto',
                        size: 14,
                        weight: 'bold',
                    },
                },
            },
            y: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        family: 'Roboto',
                        size: 14,
                        weight: 'bold',
                    },
                    callback: (value) => value + '%',
                },
            },
        },
        animation: {
            duration: 4000,
            easing: 'easeInOutQuart',
            mode: 'progressive',
        },
    };

    return (
        <Box my={5} style={{ padding: "25px", fontFamily: 'Arial, sans-serif', borderRadius: '10px' }} border='2px solid #e6e6e6'>
            <Text fontSize='2xl'>Average Intensity</Text>
            <Text color='grey' mb={4} p={0}>Shows the average intensity over the years</Text>
            <Bar data={chartData} options={chartOptions} plugins={[ChartDataLabels]} />
        </Box>
    );
};

export default IntensityChart;
