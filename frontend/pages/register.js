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
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { Formik, Field } from "formik";
import Link from "next/link";
import {
  validateUsername,
  validateEmail,
  validatePassword,
} from "../lib/formUtils";
import MyContext from "@/lib/context";
import { register } from "@/lib/auth";
import { useRouter } from "next/router";

const Register = () => {
  const { isLoggedIn, setUser } = useContext(MyContext);

  const router = useRouter();

  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard");
    }
  }, [isLoggedIn]);

  return (
    <Center h="100vh" minH="30rem" minW="350px">
      <Container>
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          onSubmit={async (values) => {
            const registration = await register(values);
            console.log(registration)
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
                  <FormControl
                    isRequired
                    isInvalid={!!errors.username && touched.username}
                  >
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <Field
                      as={Input}
                      id="username"
                      name="username"
                      type="text"
                      placeholder="Enter your username"
                      variant="filled"
                      validate={() => validateUsername(values.username)}
                    />
                    <FormErrorMessage>{errors.username}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isRequired
                    isInvalid={!!errors.email && touched.email}
                  >
                    <FormLabel htmlFor="email">Email Address</FormLabel>
                    <Field
                      as={Input}
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      variant="filled"
                      validate={() => validateEmail(values.email)}
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isRequired
                    isInvalid={!!errors.password && touched.password}
                  >
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <InputGroup>
                      <Field
                        as={Input}
                        id="password"
                        name="password"
                        type={show ? "text" : "password"}
                        placeholder="test"
                        variant="filled"
                        validate={() => validatePassword(values.password)}
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
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>
                </Stack>
                <Flex>
                  <Button colorScheme="teal" variant="outline" size="lg">
                    <Link href="./login">Back to Login?</Link>
                  </Button>
                  <Spacer />
                  <Button type="submit" colorScheme="teal" size="lg">
                    Register
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

export default Register;
