import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import FormBox from "../components/auth/FormBox";
import { HelmetTitle } from "../components/HelmetTitle";
import { FatText, Input } from "../components/shared";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import {
  createCoffeeShop,
  createCoffeeShopVariables,
} from "../__generated__/createCoffeeShop";
import { useHistory } from "react-router";
import ButtonInactivable from "../components/ButtonInactivable";

const CREATE_COFFEESHOP_MUTATION = gql`
  mutation createCoffeeShop(
    $name: String!
    $category: String!
    $latitude: String
    $longitude: String
    $photos: [Upload]
  ) {
    createCoffeeShop(
      name: $name
      category: $category
      latitude: $latitude
      longitude: $longitude
      photos: $photos
    ) {
      ok
      error
    }
  }
`;

const Subtitle = styled(FatText)`
  font-size: 24px;
  margin-top: 10px;
`;

interface IFormProps {
  name: string;
  category: string;
  latitude?: string;
  longitude?: string;
  photos?: FileList;
}

const AddShop = () => {
  const history = useHistory();
  const onCompleted = (data: { createCoffeeShop: { ok: Boolean } }) => {
    const {
      createCoffeeShop: { ok },
    } = data;
    if (!ok) {
      return;
    } else {
      history.push("/");
    }
  };
  const [createCoffeeShopMutation, { loading }] = useMutation<
    createCoffeeShop,
    createCoffeeShopVariables
  >(CREATE_COFFEESHOP_MUTATION, { onCompleted });
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<IFormProps>({
    mode: "onChange",
  });
  const onSubmit = (data: any) => {
    if (loading) {
      return;
    }
    const { name, category, longitude, latitude, photos } = data;
    if (photos.length === 0) {
      createCoffeeShopMutation({
        variables: {
          name,
          category,
          longitude,
          latitude,
        },
      });
    } else {
      createCoffeeShopMutation({
        variables: {
          name,
          category,
          longitude,
          latitude,
          photos,
        },
      });
    }
  };
  return (
    <div>
      <HelmetTitle title="Add" />
      <FormBox>
        <FontAwesomeIcon icon={faStore} size="3x" color="#01A1DD" />
        <Subtitle>Add Shop</Subtitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            {...register("name", { required: "Name is required." })}
            name="name"
            placeholder="name"
          />
          <Input
            type="text"
            {...register("category", { required: "Category is required." })}
            name="category"
            placeholder="category"
          />
          <Input
            type="text"
            {...register("latitude")}
            name="latitude"
            placeholder="latitude"
          />
          <Input
            type="text"
            {...register("longitude")}
            name="longitude"
            placeholder="longitude"
          />
          <Input
            type="file"
            {...register("photos")}
            name="photos"
            multiple
            accept="image/*"
          />
          <ButtonInactivable
            isActivate={isValid && isDirty && !loading}
            loading={loading}
          >
            Create CofeeShop
          </ButtonInactivable>
        </form>
      </FormBox>
    </div>
  );
};

export default AddShop;
