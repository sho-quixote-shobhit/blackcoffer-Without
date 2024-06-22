import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Box, Text, Select } from "@chakra-ui/react";

const PieChart = ({ data }) => {
    const [selectedMetric, setSelectedMetric] = useState("intensity");

    const sectors = {};
    data.forEach((entry) => {
        const value = entry[selectedMetric];
        if (!sectors[entry.sector]) {
            sectors[entry.sector] = 0;
        }
        sectors[entry.sector] += value;
    });

    const sortedSectors = Object.keys(sectors)
        .map((sector) => ({ sector, total: sectors[sector] }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 15);

    const labels = sortedSectors.map((entry) => entry.sector);
    const dataCounts = sortedSectors.map((entry) => entry.total);

    const assignColors = (index) => {
        const colors = [
            "#9400D3",
            "#FF0080",
            "#00BFFF",
            "#32CD32",
            "#FF4500",
            "#FF6347",
            "#1E90FF",
            "#FFA500",
            "#BA55D3",
            "#ADFF2F",
            "#FF69B4",
            "#4682B4",
            "#FFD700",
            "#20B2AA",
            "#8A2BE2"
        ];
        return colors[index % colors.length];
    };

    const chartData = {
        labels: labels,
        datasets: [
            {
                data: dataCounts,
                backgroundColor: labels.map((_, index) => assignColors(index)),
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: "right",
                labels: {
                    boxWidth: 20,
                },
            },
        },
    };

    return (
        <Box style={{ padding: "25px", fontFamily: "Arial, sans-serif" }} border="2px solid #e6e6e6" borderRadius='10px'>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Text fontSize="2xl">Sector Distro</Text>
                <Select
                    value={selectedMetric}
                    onChange={(e) => setSelectedMetric(e.target.value)}
                    width="150px"
                >
                    <option value="intensity">Intensity</option>
                    <option value="likelihood">Likelihood</option>
                    <option value="relevance">Relevance</option>
                </Select>
            </Box>
            <Text color="grey" mb={4}>
                Shows distribution by {selectedMetric}
            </Text>
            <Pie data={chartData} options={chartOptions} />
        </Box>
    );
};

export default PieChart;
