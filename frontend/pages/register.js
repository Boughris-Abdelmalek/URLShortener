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
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import Link from "next/link";

const Register = () => {
  const [show, setShow] = useState(false);

  const validateUsername = (value) => {
    let error;
    if (!value) {
      error = "Username is required";
    } else if (value.length < 3) {
      error = "Username must be at least 3 characters long";
    }
    return error;
  };

  const validateEmail = (value) => {
    let error;
    if (!value) {
      error = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  };

  const validatePassword = (value) => {
    let error;
    if (!value) {
      error = "Password is required";
    } else if (value.length < 8) {
      error = "Password must be at least 8 characters long";
    }
    return error;
  };

  return (
    <Center h="100vh" minH="30rem" minW="350px">
      <Container>
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          onSubmit={(values) => {
            console.log(values);
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
                    isInvalid={!!errors.username && touched.username}
                  >
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <Field
                      as={Input}
                      id="username"
                      name="username"
                      type="text"
                      variant="filled"
                      validate={() => validateUsername(values.username)}
                    />
                    <FormErrorMessage>{errors.username}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.email && touched.email}>
                    <FormLabel htmlFor="email">Email Address</FormLabel>
                    <Field
                      as={Input}
                      id="email"
                      name="email"
                      type="email"
                      variant="filled"
                      validate={() => validateEmail(values.email)}
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={!!errors.password && touched.password}
                  >
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type="password"
                      variant="filled"
                      validate={() => validatePassword(values.password)}
                    />
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
