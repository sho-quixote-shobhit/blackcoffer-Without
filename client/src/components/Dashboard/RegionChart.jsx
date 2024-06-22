import React, { useState } from 'react';
import { PolarArea } from 'react-chartjs-2';
import { Box, Text, Select } from '@chakra-ui/react';

const RegionChart = ({ data }) => {
    const [filter, setFilter] = useState('intensity');

    const regionData = {};
    data.forEach(item => {
        const value = item[filter];
        const region = item.region || "N/A";
        if (region in regionData) {
            regionData[region].total += value;
            regionData[region].count += 1;
        } else {
            regionData[region] = {
                total: value,
                count: 1
            };
        }
    });

    const sortedRegions = Object.keys(regionData)
        .map(region => ({ region, average: regionData[region].total / regionData[region].count }))
        .sort((a, b) => b.average - a.average)
        .slice(0, 14);
    const labels = sortedRegions.map(entry => entry.region);
    const dataCounts = sortedRegions.map(entry => entry.average);

    const chartData = {
        labels: labels,
        datasets: [
            {
                data: dataCounts,
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
                <Text fontSize='2xl'>Region Distro</Text>
                <Select width="150px" value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="intensity">Intensity</option>
                    <option value="relevance">Relevance</option>
                    <option value="likelihood">Likelihood</option>
                </Select>
            </Box>
            <Text color='grey' mb={4}>Shows distribution of articles across regions</Text>
            <PolarArea data={chartData} options={chartOptions} />
        </Box>
    );
};

export default RegionChart;
