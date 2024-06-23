import React, { useState, useEffect } from "react";
import axios from "axios";
import IntensityChart from "./IntensityChart";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import Navbar from "./Navbar";
import RegionChart from "./RegionChart";
import SideDrawer from "./SideDrawer";
import { Box, Center, Grid, Spinner, useBreakpointValue } from "@chakra-ui/react";
import RelevanceScatterPlot from "./RelevanceScatterChart";
import TopicsPolarAreaChart from "./TopicChart";
import PieChart from "./SectorChart";
import LikelihoodPolar from "./LikelihoodPolar";
import Footer from "./Footer";

Chart.register(CategoryScale);

const Main = () => {
    const [data, setData] = useState([]);
    const [loading , setloading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setloading(true)
            const API_URL = "http://localhost:5000";
            try {
                const response = await axios.get(`${API_URL}/api/data`);
                setData(response.data);
                setloading(false)
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
                <Center>{loading && <Spinner />}</Center>
                <Box>
                    <Grid
                        templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
                        gap={4}
                    >
                        <Box
                            overflow='hidden'
                            
                        >
                            <RegionChart data={data} />
                        </Box>
                        <Box
                            overflow='hidden'
                            
                        >
                            <TopicsPolarAreaChart data={data} />
                        </Box>
                    </Grid>
                    <IntensityChart data={data} />
                    <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={4} overflow='hidden'>
                        <Box
                            overflow='hidden'
                        >
                            <LikelihoodPolar data={data} />
                        </Box>
                        <Box
                            overflow='hidden'
                        >
                            <PieChart data={data} />
                        </Box>
                    </Grid>

                    <RelevanceScatterPlot data={data}  />

                </Box>
            </Box>
            <Footer />
        </Box>
    );
};

export default Main;
