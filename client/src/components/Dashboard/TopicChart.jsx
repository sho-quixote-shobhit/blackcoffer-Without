import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Box, Text, Select } from '@chakra-ui/react';

const TopicsPolarAreaChart = ({ data }) => {
    const [filter, setFilter] = useState('relevance');

    const topicTotals = {};
    data.forEach(item => {
        const value = item[filter];
        if (item.topic in topicTotals) {
            topicTotals[item.topic].total += value;
            topicTotals[item.topic].count += 1;
        } else {
            topicTotals[item.topic] = {
                total: value,
                count: 1
            };
        }
    });

    const topics = Object.keys(topicTotals);
    const avgValues = topics.map(topic => {
        return topicTotals[topic].total / topicTotals[topic].count;
    });

    const sortedTopics = topics.sort((a, b) => topicTotals[b].total - topicTotals[a].total);

    const topTopics = sortedTopics.slice(0, 14);
    const topAvgValues = topTopics.map(topic => avgValues[topics.indexOf(topic)]);

    const chartData = {
        labels: topTopics,
        datasets: [
            {
                data: topAvgValues,
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4CAF50',
                    '#FF9800',
                    '#9C27B0',
                    '#3F51B5',
                    '#FFD700', 
                    '#8A2BE2',
                    '#00FF00',
                    '#FF6347',
                    '#1E90FF',
                    '#FFA500',
                    '#BA55D3',
                    '#ADFF2F'
                ],
                hoverBackgroundColor: [
                    '#FFB6C1',
                    '#87CEFA',
                    '#FFFACD',
                    '#98FB98',
                    '#FFA07A',
                    '#DA70D6',
                    '#6495ED',
                    '#FFEC8B', 
                    '#9370DB',
                    '#00FA9A',
                    '#FFA07A',
                    '#1E90FF',
                    '#FFD700',
                    '#BA55D3',
                    '#ADFF2F'
                ],
                borderColor: [
                    'rgba(255, 255, 255, 1)',
                ],
                borderWidth: 3,
            },
        ],
    };

    const chartOptions = {
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    boxWidth: 20,
                },
            },
        },
    };

    return (
        <Box style={{ padding: "25px", fontFamily: 'Arial, sans-serif' }} border='2px solid #e6e6e6' borderRadius='10px'>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Text fontSize='2xl'>
                    Topics Relation
                </Text>
                <Select width="150px" value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="relevance">Relevance</option>
                    <option value="likelihood">Likelihood</option>
                    <option value="intensity">Intensity</option>
                </Select>
            </Box>
            <Text color='grey' mb={4}>Shows relation of top topics</Text>
            <Doughnut data={chartData} options={chartOptions} />
        </Box>
    );
};

export default TopicsPolarAreaChart;
