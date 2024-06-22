import React from "react";
import {
	Box,
	Container,
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	IconButton,
	useDisclosure,
	Divider,
	Text,
	Avatar,
	List,
	ListItem,
	ListIcon,
	useColorModeValue,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import {
	MdDashboard,
	MdAssignment,
	MdSettings,
	MdExitToApp,
} from "react-icons/md";
import { useUser } from "../../providers/usercontext";

const SideDrawer = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const hoverBg = useColorModeValue('blue.100', 'blue.300');
	const { user } = useUser();

	return (
		<Container>
			<IconButton
				icon={<ChevronRightIcon />}
				onClick={onOpen}
				position="fixed"
				top="50%"
				left={0}
				transform="translateY(-50%)"
				zIndex={1}
				colorScheme="teal"
				variant="outline"
			/>

			<Drawer placement="left" onClose={onClose} isOpen={isOpen}>
				<DrawerOverlay />
				<DrawerContent
					color={useColorModeValue("gray.800", "white")}
				>
					<DrawerHeader
						borderBottomWidth="1px"
						fontSize="xl"
						fontWeight="bold"
						color="black.500"
						display="flex"
						alignItems="center"
					>
					 DashBoard
					</DrawerHeader>
					<DrawerBody>

						{user && <Box>
							<Avatar size='lg' cursor='pointer' name={user.fname} src={user.fname} />
							<Text fontSize='xl'>{user.fname} {user.lname}</Text>
						</Box>}
						<Divider
							mb={4}
							borderColor={useColorModeValue("gray.300", "gray.600")}
						/>

						<Text fontSize="lg" mb={2} fontWeight="bold">
							Menu
						</Text>
						<Divider
							mb={4}
							borderColor={useColorModeValue("gray.300", "gray.600")}
						/>

						<List spacing={5}>
							<ListItem cursor="pointer" py={2} _hover={{ bg: hoverBg }} borderRadius='10px'>
								<ListIcon as={MdDashboard} fontSize="xl" />
								Dashboard
							</ListItem>
							<ListItem cursor="pointer"  py={2} _hover={{ bg: hoverBg }} borderRadius='10px'>
								<ListIcon as={MdAssignment} fontSize="xl" />
								Tasks
							</ListItem>
							<ListItem cursor="pointer" py={2} _hover={{ bg: hoverBg }} borderRadius='10px'>
								<ListIcon as={MdSettings} fontSize="xl" />
								Settings
							</ListItem>
							<ListItem cursor="pointer" onClick={onClose} py={2} _hover={{ bg: hoverBg }} borderRadius='10px'>
								<ListIcon as={MdExitToApp} fontSize="xl" />
								Logout
							</ListItem>
						</List>

					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</Container>
	);
};

export default SideDrawer;
