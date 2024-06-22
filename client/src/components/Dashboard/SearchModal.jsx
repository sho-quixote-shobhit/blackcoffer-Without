import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Input, Flex, Box, Text, useColorModeValue } from '@chakra-ui/react';
import React, { useRef, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { MdAnalytics, MdCalendarMonth, MdDialerSip, MdHomeMax, MdImportExport, MdLayers, MdReadMore, MdRollerShades, MdSettings, MdToggleOn } from 'react-icons/md';

const SearchModal = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef(null);
    const hoverBg = useColorModeValue('blue.700', 'blue.700');

    useEffect(() => {
        if (isOpen && initialRef.current) {
            initialRef.current.focus();
        }
    }, [isOpen]);

    return (
        <>
            <span onClick={onOpen}>{children}</span>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Flex alignItems="center">
                            <Box display='flex' alignItems='center'>
                                <Box mr={2}>
                                    <FaSearch />
                                </Box>
                                <Input
                                    ref={initialRef}
                                    placeholder="Search..."
                                    border="none"
                                    _focus={{ boxShadow: 'none' }}
                                />
                            </Box>
                            <ModalCloseButton mt={2} />
                        </Flex>
                    </ModalHeader>

                    <ModalBody>
                        <Flex justifyContent='space-between' alignItems='center'>
                            <Flex flexDir='column' justifyContent='center'>
                                <Text color='grey' mb={3}> Popular searches</Text>
                                <Text _hover={{ color: hoverBg }} cursor='pointer' my={2} display='flex' alignItems='center'><MdAnalytics /> Analytics</Text>
                                <Text _hover={{ color: hoverBg }} cursor='pointer' my={2} display='flex' alignItems='center'><MdToggleOn  /> Country</Text>
                                <Text _hover={{ color: hoverBg }} cursor='pointer' my={2} display='flex' alignItems='center'><MdImportExport /> Impact</Text>
                                <Text _hover={{ color: hoverBg }} cursor='pointer' my={2} display='flex' alignItems='center'><MdLayers /> Year</Text>
                                <Text _hover={{ color: hoverBg }} cursor='pointer' my={2} display='flex' alignItems='center'><MdReadMore  /> Relevance</Text>
                            </Flex>
                            <Flex flexDir='column' >
                                <Text color='grey' mb={3} >Apps & Pages</Text>
                                <Text _hover={{ color: hoverBg }} cursor='pointer' my={2} display='flex' alignItems='center'> <MdCalendarMonth  />Calender</Text>
                                <Text _hover={{ color: hoverBg }} cursor='pointer' my={2} display='flex' alignItems='center'> <MdRollerShades  />Roles</Text>
                                <Text _hover={{ color: hoverBg }} cursor='pointer' my={2} display='flex' alignItems='center'><MdSettings  /> Settings</Text>
                                <Text _hover={{ color: hoverBg }} cursor='pointer' my={2} display='flex' alignItems='center'><MdDialerSip  /> Dialog</Text>
                                <Text _hover={{ color: hoverBg }} cursor='pointer' my={2} display='flex' alignItems='center'><MdHomeMax  /> Examples</Text>
                            </Flex>
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default SearchModal;
