import React from "react";
import { HelmetTitle } from "../components/HelmetTitle";
import { faUntappd } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthLayout } from "../components/auth/AuthLayout";
import FormBox from "../components/auth/FormBox";
import { Input } from "../components/shared";
import { ButtomBox } from "../components/auth/ButtomBox";
import routes from "../routers/routes";
import styled from "styled-components";
import { gql, useMutation } from "@apollo/client";
import { login, loginVariables } from "../__generated__/login";
import { useForm } from "react-hook-form";
import ButtonInactivable from "../components/ButtonInactivable";
import { logUserIn } from "../apollo";
import FormError from "../components/auth/FormError";
import { useLocation } from "react-router";

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

const Notification = styled.div`
  color: #2ecc71;
`;

interface ILocationState {
  message: string;
  username: string;
  password: string;
}

const Login = () => {
  const location = useLocation<ILocationState>();
  const {
    register,
    getValues,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm<loginVariables>({
    mode: "onChange",
    defaultValues: {
      username: location?.state?.username || "",
      password: location?.state?.password || "",
    },
  });
  const onCompleted = (data: login) => {
    const {
      login: { ok, token },
    } = data;
    if (ok && token) {
      logUserIn(token);
    }
  };
  const [login, { data: loginMutationResult, loading }] = useMutation<
    login,
    loginVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });
  const onSubmitValid = () => {
    if (loading) {
      return;
    }
    const { username, password } = getValues();
    login({
      variables: {
        username,
        password,
      },
    });
  };
  return (
    <AuthLayout>
      <HelmetTitle title={"Login"} />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faUntappd} size="3x" color="#01A1DD" />
        </div>
        <Notification>{location?.state?.message}</Notification>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            type="text"
            {...register("username", { required: "Username is required." })}
            name="username"
            placeholder="username"
          />
          <FormError message={errors?.username?.message} />
          <Input
            type="password"
            {...register("password", { required: "Password is required." })}
            name="password"
            placeholder="password"
          />
          <FormError message={errors?.password?.message} />
          <ButtonInactivable isActivate={isValid && !loading} loading={loading}>
            Login
          </ButtonInactivable>
          {loginMutationResult?.login.error && (
            <FormError message={loginMutationResult.login.error} />
          )}
        </form>
        <ButtomBox
          cta="Don't have an account?"
          linkText="Sign up"
          link={routes.signUp}
        />
      </FormBox>
    </AuthLayout>
  );
};

export default Login;
