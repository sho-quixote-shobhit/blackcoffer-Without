import React, { useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import { Box, Text, Select } from '@chakra-ui/react';
import 'chart.js/auto';

const RelevanceScatterPlot = ({ data }) => {
    const [filter, setFilter] = useState('relevance');

    const getColor = (item) => {
        switch (filter) {
            case 'relevance':
                return `rgba(75, 192, 192, ${item.relevance / 10})`;
            case 'intensity':
                return `rgba(255, 99, 132, ${item.intensity / 10})`;
            case 'likelihood':
                return `rgba(54, 162, 235, ${item.likelihood / 10})`;
            default:
                return 'rgba(75, 192, 192, 0.6)';
        }
    };

    const aggregatedData = {};
    data.forEach(item => {
        const key = `${item.likelihood}-${item.impact}`;
        if (aggregatedData[key]) {
            aggregatedData[key].count += 1;
        } else {
            aggregatedData[key] = {
                x: item.likelihood,
                y: item.impact,
                count: 1,
                backgroundColor: getColor(item),
            };
        }
    });

    const chartData = {
        datasets: [
            {
                label: filter.charAt(0).toUpperCase() + filter.slice(1),
                data: Object.values(aggregatedData),
                backgroundColor: Object.values(aggregatedData).map(item => item.backgroundColor),
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 1,
                pointRadius: 10,
                pointHoverRadius: 15,
            }
        ]
    };

    const chartOptions = {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                title: {
                    display: true,
                    text: 'Likelihood',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Impact',
                },
            },
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const item = context.raw;
                        return `Likelihood: ${item.x}, Impact: ${item.y}, Count: ${item.count}`;
                    }
                }
            },
            legend: {
                display: true,
            },
        },
    };

    return (
        <Box style={{ padding: "25px" }} mt={8} borderRadius={10} border='2px solid #e6e6e6'>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Text fontSize='2xl'>Relevance</Text>
                <Select width="150px" value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="relevance">Relevance</option>
                    <option value="likelihood">Likelihood</option>
                    <option value="intensity">Intensity</option>
                </Select>
            </Box>
            <Text mb={4} color='grey'>Show relation between relevance and attributes</Text>
            <Scatter data={chartData} options={chartOptions} />
        </Box>
    );
};

export default RelevanceScatterPlot;
