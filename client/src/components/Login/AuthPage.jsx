import React, { useState } from 'react';
import {
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    Heading,
    IconButton,
    Image,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    useToast
} from '@chakra-ui/react';
import { FaEye, FaEyeSlash, FaFacebook, FaGoogle } from 'react-icons/fa';
import mobile from '../../assests/mobile.png';
import axios from 'axios'
import { useNavigate } from 'react-router';
import { useUser } from '../../providers/usercontext';
import bg from '../../assests/bg.jpg'

const AuthPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [signin, setSignin] = useState(false);
    const [loading, setloading] = useState(false)

    const { setuser } = useUser()

    const toast = useToast();
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpass, setCpass] = useState('');

    const handleAccount = async () => {

        //signup
        if (!signin) {
            if (!fname || !email || !password || !cpass) {
                toast({
                    title: 'Error',
                    description: 'Please complete all fields.',
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                });
                return;
            }
            if (password !== cpass) {
                toast({
                    title: 'Error',
                    description: 'Passwords do not match!!',
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                });
                return;
            }

            await axios.post('http://localhost:5000/auth/signup', { fname, lname, email, password }, { withCredentials: true }).then(res => {
                setloading(true)
                if (res.data.error) {
                    toast({
                        title: res.data.error,
                        status: 'error',
                        duration: 2000,
                        isClosable: true,
                    })
                    setloading(false)
                    return;
                }
                toast({
                    title: 'SignUp Successfull',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                })
                setloading(false)
                setuser(res.data.user)
                localStorage.setItem('jwt', (res.data.token))
                localStorage.setItem('user', JSON.stringify(res.data.user))
                navigate('/dashboard')
            })
        }

        //sign in
        else {
            if (!email || !password) {
                toast({
                    title: 'Error',
                    description: 'Please complete all fields.',
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                });
                return;
            }

            await axios.post('http://localhost:5000/auth/signin', { email, password }, { withCredentials: true }).then(res => {
                setloading(true)
                if (res.data.error) {
                    toast({
                        title: res.data.error,
                        status: 'error',
                        duration: 2000,
                        isClosable: true,
                    })
                    setloading(false)
                    return;
                }
                toast({
                    title: 'Login Successfull',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                })
                setloading(false)
                setuser(res.data.user)
                localStorage.setItem('jwt', (res.data.token))
                localStorage.setItem('user', JSON.stringify(res.data.user))
                navigate('/dashboard')
            })
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleAccount();
        }
    };

    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            minH="100vh"
            p={4}
            backgroundImage={`url(${bg})`}
            backgroundSize="cover"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            onKeyDown={handleKeyDown}
        >
            <Box
                bg="white"
                p={8}
                borderRadius="lg"
                boxShadow='10px 10px 10px rgba(255, 255, 255, 0.5)'
                w="full"
                maxW="4xl"
            >
                <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}>
                    <GridItem>
                        <Heading as="h4" size="lg" mb={4}>
                            {signin ? 'Sign In' : 'Create Account'}
                        </Heading>

                        {!signin && (
                            <Flex mb={3}>
                                <Input
                                    onChange={(e) => setFname(e.target.value)}
                                    type="text"
                                    placeholder="First name"
                                    mr={2}
                                />
                                <Input
                                    onChange={(e) => setLname(e.target.value)}
                                    type="text"
                                    placeholder="Last name (Op)"
                                />
                            </Flex>
                        )}

                        <Input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Email"
                            mb={3}
                        />

                        <InputGroup mb={3}>
                            <Input
                                onChange={(e) => setPassword(e.target.value)}
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                            />
                            <InputRightElement>
                                <IconButton
                                    aria-label="Toggle password visibility"
                                    icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                                    onClick={togglePasswordVisibility}
                                    variant="ghost"
                                />
                            </InputRightElement>
                        </InputGroup>

                        {!signin && (
                            <InputGroup mb={3}>
                                <Input
                                    onChange={(e) => setCpass(e.target.value)}
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="Confirm Password"
                                />
                                <InputRightElement>
                                    <IconButton
                                        aria-label="Toggle password visibility"
                                        icon={showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                        onClick={toggleConfirmPasswordVisibility}
                                        variant="ghost"
                                    />
                                </InputRightElement>
                            </InputGroup>
                        )}

                        <Button
                            colorScheme="blue"
                            w="full"
                            mb={3}
                            onClick={handleAccount}
                            display={{ base: 'none', md: 'block' }}
                            isLoading = {loading}
                        >
                            {signin ? 'Sign In' : 'Create Account'}
                        </Button>

                        <Flex justify="space-between" align="center" mb={3} display={{ base: 'flex', md: 'none' }}>
                            <Button
                                colorScheme="blue"
                                onClick={handleAccount}
                                isLoading={loading}
                            >
                                {signin ? 'Sign In' : 'Create Account'}
                            </Button>
                            <Text
                                color="blue.500"
                                cursor="pointer"
                                onClick={() => setSignin(!signin)}
                            >
                                {signin ? 'or, Create Account' : 'or, Sign In'}
                            </Text>
                        </Flex>

                        <Flex direction="column" mb={3}>
                            <Button
                                leftIcon={<FaFacebook />}
                                colorScheme="facebook"
                                variant="outline"
                                mb={2}
                            >
                                {signin ? 'Sign in with Facebook' : 'Sign up with Facebook'}
                            </Button>
                            <Button
                                leftIcon={<FaGoogle />}
                                colorScheme="red"
                                variant="outline"
                            >
                                {signin ? 'Sign in with Google' : 'Sign up with Google'}
                            </Button>
                        </Flex>

                        <Text
                            fontSize="sm"
                            textAlign="center"
                            display={{ base: 'block', md: 'none' }}
                        >
                            By Signing up you agree to our terms & conditions, Privacy policy
                        </Text>
                    </GridItem>

                    <GridItem display={{ base: 'none', md: 'flex' }} flexDir='column' textAlign='center'>
                        <Text mb={4}>
                            {signin ? (
                                <>
                                    Don't have an account yet?
                                    <Text
                                        as="span"
                                        color="blue.500"
                                        cursor="pointer"
                                        onClick={() => setSignin(false)}
                                    >
                                        {' '}
                                        Create new for free!
                                    </Text>
                                </>
                            ) : (
                                <>
                                    Already have an account?
                                    <Text
                                        as="span"
                                        color="blue.500"
                                        cursor="pointer"
                                        onClick={() => setSignin(true)}
                                    >
                                        {' '}
                                        Sign In
                                    </Text>
                                </>
                            )}
                        </Text>
                        <Image src={mobile} maxH="360px" alt="Mobile" />
                        <Text fontSize="sm">
                            By Signing up you agree to our terms & conditions, Privacy policy
                        </Text>
                    </GridItem>
                </Grid>
            </Box>
        </Flex>
    );
};

export default AuthPage;
