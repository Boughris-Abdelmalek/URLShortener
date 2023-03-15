import { useState, useContext, useEffect, useRef } from "react";
import MyContext from "@/lib/context";
import { useRouter } from "next/router";
import { get, create, deleteAlias } from "@/lib/shortener";
import { logout } from "@/lib/auth";
import {
    SimpleGrid,
    Box,
    Heading,
    Button,
    Stack,
    Table,
    Thead,
    Tbody,
    FormControl,
    FormLabel,
    Input,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    IconButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const Dashboard = () => {
    const { user, isLoggedIn, urls, setUser, setUrls } = useContext(MyContext);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialRef = useRef(null);
    const finalRef = useRef(null);

    const router = useRouter();

    const [errors, setErrors] = useState({});
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");

    const shorten = async () => {
        if (!url) {
            return setErrors({ url: "Url must not be empty" });
        }
        if (!alias) {
            return setErrors({ alias: "Alias must not be empty" });
        }
        try {
            const short = await create(url, alias);
            if (short.data && !short.error) {
                onClose();
                await getAll(); // update the table
            } else {
                setErrors({
                    server: short?.error?.message || "Error from server",
                });
            }
        } catch (error) {
            setErrors({
                server: error?.response?.data?.message || "Error from server",
            });
            console.log(errors);
        }
    };

    const getAll = async () => {
        try {
            const response = await get();
            console.log("getAll response:", response);
            if (response && response.data) {
                console.log("getAll urls:", response.data);
                setUrls(response.data.attributes.results);
            }
        } catch (error) {
            setErrors({
                server: error?.response?.data?.message || "Error from server",
            });
            console.log(errors);
        }
    };

    console.log(urls);

    const deleteShort = async (id) => {
        if (!id) return;
        const deleted = await deleteAlias(id);
        if (deleted.data && !deleted.error) {
            await getAll();
        }
    };

    const signOut = () => {
        logout();
        setUser(null);
        router.push("/login");
    };

    useEffect(() => {
        if (!isLoggedIn) {
            router.push("/login");
        }
        getAll();
    }, [urls.length]);

    return (
        <>
            <withAction />
            <SimpleGrid>
                <Box
                    style={{
                        height: "10rem",
                        width: "100%",
                        minWidth: "10rem",
                        margin: "0 auto",
                        padding: "0 8rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingInline: "2rem",
                        gap: "2rem",
                    }}
                >
                    <Heading textAlign="center" color="#2C7A7B" fontSize={{ base: "1.25rem", md: "2rem" }}>
                        URL Shortener
                    </Heading>
                    <Stack
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection={{ base: "column", md: "row" }}
                        gap={{ base: ".5rem", md: "2rem" }}
                    >
                        <p>{user && user.username}</p>
                        <Button
                            colorScheme="red"
                            variant="outline"
                            onClick={() => signOut()}
                        >
                            Logout
                        </Button>
                    </Stack>
                </Box>
                <Box h={`calc(100vh - 10rem)`}>
                    <TableContainer
                        style={{
                            maxWidth: "60rem",
                            margin: "0 auto",
                        }}
                        padding={{ base: "1rem", md: "8rem" }}
                    >
                        <Table variant="simple">
                            <TableCaption>You url shortned</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>URL</Th>
                                    <Th>ALIAS/SHORTNED</Th>
                                    <Th isNumeric>NO OF HITS</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {(!urls || urls.length === 0) && (
                                    <Tr>
                                        <Td></Td>
                                        <Td>No record found</Td>
                                        <Td></Td>
                                    </Tr>
                                )}
                                {urls &&
                                    urls.length > 0 &&
                                    urls.map((short) => (
                                        <Tr key={short.id}>
                                            <Td
                                                onClick={() => {
                                                    window.open(
                                                        `${short.url}`,
                                                        "blank"
                                                    );
                                                }}
                                            >
                                                {short.url}
                                            </Td>
                                            <Td
                                                onClick={() => {
                                                    window.open(
                                                        `/${short.alias}`,
                                                        "blank"
                                                    );
                                                }}
                                            >
                                                {short.alias}
                                            </Td>
                                            <Td isNumeric>
                                                {short?.visit || 0}
                                            </Td>
                                            <Td>
                                                <Button
                                                    color="red"
                                                    onClick={() =>
                                                        deleteShort(url.id)
                                                    }
                                                >
                                                    Delete
                                                </Button>
                                            </Td>
                                        </Tr>
                                    ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                    <div className="add-icon">
                        <IconButton
                            aria-label="Add"
                            icon={<AddIcon />}
                            colorScheme="teal"
                            borderRadius="50%"
                            w="3rem"
                            h="3rem"
                            onClick={onOpen}
                        />
                    </div>
                </Box>
                <>
                    <Modal
                        initialFocusRef={initialRef}
                        finalFocusRef={finalRef}
                        isOpen={isOpen}
                        onClose={onClose}
                    >
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Create a new url</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                                <FormControl>
                                    <FormLabel>Url</FormLabel>
                                    <Input
                                        ref={initialRef}
                                        placeholder="Enter url"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                    />
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel>Alias</FormLabel>
                                    <Input
                                        placeholder="Enter alias"
                                        value={alias}
                                        onChange={(e) =>
                                            setAlias(e.target.value)
                                        }
                                    />
                                </FormControl>
                            </ModalBody>

                            <ModalFooter>
                                <Button
                                    colorScheme="blue"
                                    mr={3}
                                    onClick={() => shorten()}
                                >
                                    Add
                                </Button>
                                <Button onClick={onClose}>Cancel</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </>
            </SimpleGrid>
        </>
    );
};

export default Dashboard;
