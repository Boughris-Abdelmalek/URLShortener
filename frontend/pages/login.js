import { useState, useEffect, useContext } from "react";
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
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { Formik, Field } from "formik";
import Link from "next/link";
import MyContext from "@/lib/context";
import { login } from "@/lib/auth";
import { useRouter } from "next/router";

const Login = () => {
  const { isLoggedIn, setUser } = useContext(MyContext);

  const router = useRouter();

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard");
    }
  }, [isLoggedIn]);

  return (
    <Center h="100vh" minH="30rem" minW="350px">
      <Container>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const registration = await login(values);
            console.log(registration);
            if (registration.jwt) {
              setUser(registration.user);
              router.push("/dashboard");
            } else {
              setErrors({
                server: registration?.error?.message || "Error from server",
              });
              console.log(errors);
            }
          }}
        >
          {({
            errors,
            touched,
            values,
            handleSubmit,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <Stack spacing={50}>
                <Heading textAlign="center" color="#2C7A7B">
                  URL Shortener
                </Heading>
                <Stack spacing={5}>
                  <FormControl isRequired>
                    <FormLabel htmlFor="email">Email Address</FormLabel>
                    <Field
                      as={Input}
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      variant="filled"
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <InputGroup>
                      <Field
                        as={Input}
                        id="password"
                        name="password"
                        type={show ? "text" : "password"}
                        placeholder="test"
                        variant="filled"
                      />
                      <InputRightElement width="4.5rem">
                        <Button
                          h="1.75rem"
                          size="sm"
                          colorScheme="teal"
                          variant="ghost"
                          onClick={() => setShow(!show)}
                        >
                          {show ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                </Stack>
                <Flex>
                  <Button colorScheme="teal" variant="outline" size="lg">
                    <Link href="./register">Don't have an account?</Link>
                  </Button>
                  <Spacer />
                  <Button type="submit" colorScheme="teal" size="lg">
                    Login
                  </Button>
                </Flex>
              </Stack>
            </form>
          )}
        </Formik>
      </Container>
    </Center>
  );
};

export default Login;
