import { useState } from "react";
import {
  Stack,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Container,
  Center,
  Heading,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import Link from "next/link";

const login = () => {
  const [show, setShow] = useState(false);

  return (
    <Center h="100vh" minH="50rem">
      <Container>
        <Stack spacing={50}>
          <Heading textAlign="center" color="#2C7A7B">
            URL Shortener
          </Heading>
          <Stack spacing={5}>
            <Input variant="outline" placeholder="Enter username" />
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Stack>
          <Flex>
            <Button colorScheme="teal" size="lg">
              Button
            </Button>
            <Spacer />
            <Button colorScheme="teal" variant="outline" size="lg">
              <Link href="./register">Register</Link>
            </Button>
          </Flex>
        </Stack>
      </Container>
    </Center>
  );
};

export default login;
