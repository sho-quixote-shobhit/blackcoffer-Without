import React, { useState } from "react";
import { PolarArea } from "react-chartjs-2";
import { Box, useColorModeValue, Text, Select } from "@chakra-ui/react";

const LikelihoodPolar = ({ data }) => {
    const [filter, setFilter] = useState('sector');

    const borderColor = useColorModeValue(
        "rgba(79, 59, 169, 1)",
        "rgba(144, 104, 190, 1)"
    );

    const calculateAverages = (data, filterType) => {
        const averages = {};
        data.forEach((entry) => {
            const key = entry[filterType] || "N/A";
            if (!averages[key]) {
                averages[key] = { total: 0, count: 0 };
            }
            averages[key].total += entry.likelihood;
            averages[key].count += 1;
        });

        return Object.keys(averages).map((key) => ({
            key,
            avgLikelihood: averages[key].total / averages[key].count,
        }));
    };

    const avgLikelihoods = calculateAverages(data, filter);

    const top15AvgLikelihoods = avgLikelihoods
        .sort((a, b) => b.avgLikelihood - a.avgLikelihood)
        .slice(0, 15);

    const chartData = {
        labels: top15AvgLikelihoods.map((entry) => entry.key),
        datasets: [
            {
                label: "Average Likelihood",
                data: top15AvgLikelihoods.map((entry) => entry.avgLikelihood),
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
                borderColor: top15AvgLikelihoods.map(() => borderColor),
                borderWidth: 2,
            },
            
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            r: {
                ticks: {
                    beginAtZero: true,
                    min: 0,
                    max: 5,
                    stepSize: 1,
                },
            },
        },
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
        <Box style={{ padding: "20px", fontFamily: 'Arial, sans-serif' }} border='2px solid #e6e6e6' borderRadius='10px'>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Text fontSize='2xl'>
                    Likelihood
                </Text>
                <Select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    width="150px"
                >
                    <option value="sector">Sector</option>
                    <option value="country">Country</option>
                    <option value="pestle">PESTLE</option>
                </Select>
            </Box>
            <Text color='grey' mb={4}>Shows average likelihood by selected filter</Text>
            <PolarArea data={chartData} options={chartOptions} />
        </Box>
    );
};

export default LikelihoodPolar;
