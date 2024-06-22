import React, { useState, useEffect } from "react";
import axios from "axios";
import IntensityChart from "./IntensityChart";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import Navbar from "./Navbar";
import RegionChart from "./RegionChart";
import SideDrawer from "./SideDrawer";
import { Box, Grid, useBreakpointValue } from "@chakra-ui/react";
import RelevanceScatterPlot from "./RelevanceScatterChart";
import TopicsPolarAreaChart from "./TopicChart";
import PieChart from "./SectorChart";
import LikelihoodRadarChart from "./LikelihoodChart";
import Footer from "./Footer";

Chart.register(CategoryScale);

const Main = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const API_URL = "http://localhost:5000";
            try {
                const response = await axios.get(`${API_URL}/api/data`);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const containerWidth = useBreakpointValue({ base: "85%", lg: "80%" });

    return (
        <Box>
            <SideDrawer />
            <Box w={containerWidth} m="auto">
                <Navbar />
                <Box>
                    <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={4} my={5}>
                        <Box
                            overflow='hidden'
                        >
                            <LikelihoodRadarChart data={data} />
                        </Box>
                        <Box
                            overflow='hidden'
                        >
                            <PieChart data={data} />
                        </Box>
                    </Grid>
                    <IntensityChart data={data} />
                    <Grid
                        templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
                        gap={4}
                    >
                        <Box
                            overflow='hidden'
                            my={5}
                        >
                            <RegionChart data={data} />
                        </Box>
                        <Box
                            overflow='hidden'
                            my={5}
                        >
                            <TopicsPolarAreaChart data={data} />
                        </Box>
                    </Grid>
                    <RelevanceScatterPlot data={data} my={5} />

                    {/* <CountryChart data={data} /> */}
                </Box>
            </Box>
            <Footer />
        </Box>
    );
};

export default Main;
