import React, { useState } from "react";
import {
    Box,
    Flex,
    Avatar,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useToast,
    Text,
    MenuDivider,
    Button,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useUser } from "../../providers/usercontext";
import { Link, useNavigate } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { FaSearch } from "react-icons/fa";
import SearchModal from "./SearchModal";
import { MdLogout } from "react-icons/md";

const Navbar = () => {
    const toast = useToast();
    const { user, setuser } = useUser();
    const navigate = useNavigate();
    const [isClicked, setisClicked] = useState(false);

    const handleLogout = () => {
        setisClicked(true)
        confirmAlert({
            message: `Are you sure to Logout!!`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        localStorage.clear();
                        setuser();
                        navigate('/');
                        toast({
                            description: 'Logged Out Successfully!!',
                            status: 'success',
                            duration: 2000,
                            isClosable: true,
                        });
                    }
                },
                {
                    label: 'No',
                    onClick: () => {setisClicked(false)}
                }
            ],
            closeOnClickOutside: false
        });
    };

    return (
        <Flex
            my={2}
            py={3}
            border='2px solid #e6e6e6'
            position={isClicked ? "relative" : "sticky"} 
            top= {isClicked ? 1 : 0}
            zIndex= {isClicked ? 0 : 100}
            borderRadius='10px'
            justify="space-between"
            align="center"
            bg="white"
            w={'full'}
        >
            <SearchModal>
                <Box display='flex' alignItems='center' cursor='pointer'>
                    <FaSearch style={{ margin: '0 10px 0 10px' }} />
                    <Text>search</Text>
                </Box>
            </SearchModal>
            <Box mr={4}>
                {user && <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        <Box display="flex" alignItems="center">
                            <Avatar size='sm' cursor='pointer' name={user.fname} src={user.fname} />
                            <Box ml="2">{user.fname}</Box>
                        </Box>
                    </MenuButton>
                    <MenuList>
                        <Link to="/editprofile"><MenuItem>Profile</MenuItem></Link>
                        <MenuDivider />
                        <MenuItem bg="red" color='white' borderRadius='10px' onClick={handleLogout}>Logout <MdLogout style={{margin : '0 0 0 5px'}} /> </MenuItem>
                    </MenuList>
                </Menu>}
            </Box>
        </Flex>
    );
};

export default Navbar;
