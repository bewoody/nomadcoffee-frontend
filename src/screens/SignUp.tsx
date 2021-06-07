import React from "react";
import { faUntappd } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { AuthLayout } from "../components/auth/AuthLayout";
import FormBox from "../components/auth/FormBox";
import { HelmetTitle } from "../components/HelmetTitle";
import { Input } from "../components/shared";
import { SubmitHandler, useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import {
  createAccount,
  createAccountVariables,
} from "../__generated__/createAccount";
import ButtonInactivable from "../components/ButtonInactivable";
import { FatLink } from "../components/shared";
import { useHistory } from "react-router";
import routes from "../routers/routes";
import { ButtomBox } from "../components/auth/ButtomBox";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $username: String!
    $email: String!
    $name: String!
    $location: String!
    $password: String!
  ) {
    createAccount(
      username: $username
      email: $email
      name: $name
      location: $location
      password: $password
    ) {
      ok
      error
    }
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

interface ISignUp {
  username: string;
  email: string;
  name: string;
  location: string;
  password: string;
}

const SignUp = () => {
  const history = useHistory();
  const onCompleted = (data: { createAccount: { ok: boolean } }) => {
    const { username, password } = getValues();
    const {
      createAccount: { ok },
    } = data;
    if (!ok) {
      return;
    }
    history.push(routes.home, {
      message: "Account created. Please log in.",
      username,
      password,
    });
  };
  const [createAccount, { loading }] = useMutation<
    createAccount,
    createAccountVariables
  >(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });
  const {
    register,
    getValues,
    handleSubmit,
    formState: { isValid, isDirty },
  } = useForm<ISignUp>({
    mode: "onChange",
  });
  const onSubmitValid: SubmitHandler<ISignUp> = (data) => {
    if (loading) {
      return;
    }
    createAccount({
      variables: {
        ...data,
      },
    });
  };
  return (
    <AuthLayout>
      <HelmetTitle title={"SignUp"} />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faUntappd} size="3x" color="#01A1DD" />
          <Subtitle>
            Sign up to see the coffee shop owner will have a web admin panel.
          </Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            type="text"
            {...register("username", {
              required: "Username is required.",
            })}
            name="username"
            placeholder="username"
          />
          <Input
            type="email"
            {...register("email", {
              required: "Email is required.",
            })}
            name="email"
            placeholder="email"
          />
          <Input
            type="text"
            {...register("name", {
              required: "Name is required.",
            })}
            name="name"
            placeholder="name"
          />
          <Input
            type="text"
            {...register("location", {
              required: "Location is required.",
            })}
            name="location"
            placeholder="location"
          />
          <Input
            type="password"
            {...register("password", {
              required: "Password is required.",
            })}
            name="password"
            placeholder="password"
          />
          <ButtonInactivable
            isActivate={isValid && isDirty && !loading}
            loading={loading}
          >
            Sign up
          </ButtonInactivable>
        </form>
      </FormBox>
      <ButtomBox cta="Have an account?" linkText="Log in" link={routes.home} />
    </AuthLayout>
  );
};

export default SignUp;
