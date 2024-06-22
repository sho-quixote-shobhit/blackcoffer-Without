import React from "react";
import { Box, Text, Flex, useColorModeValue, Icon, useBreakpointValue } from "@chakra-ui/react";
import { RiGithubFill, RiLinkedinFill } from "react-icons/ri";

const Footer = () => {
    const iconColor = useColorModeValue("gray.600", "gray.400");
    const containerWidth = useBreakpointValue({ base: "85%", lg: "80%" });

    const handleGithub = () => {
        window.open("https://github.com/sho-quixote-shobhit", "_blank");
    }

    const handleLinkedIn = () => {
        window.open("https://www.linkedin.com/in/shobhit-singh-645690249/", "_blank");
    }

    return (
        <Box display='flex' justifyContent='space-between' py={5} w={containerWidth} m='auto auto'>
            <Text fontSize="sm" color="gray.500">
                &copy; 2024 Made with ❤️ By Shobhit Singh
            </Text>
            <Flex alignItems="center">
                <Text mx={2} fontSize="sm" color="gray.500">
                    Contact Me
                </Text>
                <Box mx={2}>
                    <Icon cursor='pointer' onClick={handleGithub} as={RiGithubFill} boxSize={5} color={iconColor} />
                </Box>
                <Box mx={2}>
                    <Icon cursor='pointer' onClick={handleLinkedIn} as={RiLinkedinFill} boxSize={5} color={iconColor} />
                </Box>
            </Flex>
        </Box>
    );
};

export default Footer;
