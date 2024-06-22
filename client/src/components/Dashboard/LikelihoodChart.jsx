import React, { useState } from "react";
import { Radar } from "react-chartjs-2";
import { Box, useColorModeValue, Text, Select } from "@chakra-ui/react";

const LikelihoodRadarChart = ({ data }) => {
    const [filter, setFilter] = useState('sector');

    // Calculate the average likelihood for each filter type
    const calculateAverages = (data, filterType) => {
        const averages = {};
        data.forEach((entry) => {
            const key = entry[filterType] || "N/A"; // Replace empty key with "N/A"
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

    const chartData = {
        labels: avgLikelihoods.map((entry) => entry.key),
        datasets: [
            {
                label: "Average Likelihood",
                data: avgLikelihoods.map((entry) => entry.avgLikelihood),
                backgroundColor: useColorModeValue(
                    "rgba(79, 59, 169, 0.7)",
                    "rgba(144, 104, 190, 0.7)"
                ),
                borderColor: useColorModeValue(
                    "rgba(79, 59, 169, 1)",
                    "rgba(144, 104, 190, 1)"
                ),
                borderWidth: 2,
                pointBackgroundColor: useColorModeValue("white", "black"),
                pointBorderColor: useColorModeValue(
                    "rgba(79, 59, 169, 1)",
                    "rgba(144, 104, 190, 1)"
                ),
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: true,
        scale: {
            ticks: {
                beginAtZero: true,
                min: 0,
                max: 5,
                stepSize: 1,
            },
        },
    };

    return (
        <Box style={{ padding: "25px", fontFamily: 'Arial, sans-serif' }} border='2px solid #e6e6e6' borderRadius='10px'>
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
            <Radar data={chartData} options={chartOptions} />
        </Box>
    );
};

export default LikelihoodRadarChart;
