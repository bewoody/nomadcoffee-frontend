import { faStore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { gql, useMutation, useQuery } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import FormBox from "../components/auth/FormBox";
import ButtonInactivable from "../components/ButtonInactivable";
import { HelmetTitle } from "../components/HelmetTitle";
import { FatText, Input } from "../components/shared";
import {
  seeCoffeeShop,
  seeCoffeeShopVariables,
} from "../__generated__/seeCoffeeShop";
import {
  editCoffeeShop,
  editCoffeeShopVariables,
} from "../__generated__/editCoffeeShop";
import {
  deleteCoffeeShop,
  deleteCoffeeShopVariables,
} from "../__generated__/deleteCoffeeShop";

const SEE_COFFEESHOP_QUERY = gql`
  query seeCoffeeShop($id: Int!) {
    seeCoffeeShop(id: $id) {
      id
      name
      longitude
      latitude
      photos {
        url
      }
      categories {
        name
      }
    }
  }
`;

const EDIT_COFFEESHOP_MUTATION = gql`
  mutation editCoffeeShop(
    $id: Int!
    $name: String
    $category: String
    $latitude: String
    $longitude: String
    $photos: [Upload]
  ) {
    editCoffeeShop(
      id: $id
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

const DELETE_COFFEESHOP_MUTATION = gql`
  mutation deleteCoffeeShop($id: Int!) {
    deleteCoffeeShop(id: $id) {
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
  name?: string;
  category?: string;
  latitude?: string;
  longitude?: string;
  photos?: FileList;
}

interface IParams {
  id: string;
}

const EditShop = () => {
  const { id } = useParams<IParams>();
  const history = useHistory();
  const { data: shopData } = useQuery<seeCoffeeShop, seeCoffeeShopVariables>(
    SEE_COFFEESHOP_QUERY,
    {
      variables: {
        id: +id,
      },
    }
  );
  const onCompleted = (data: { editCoffeeShop: { ok: Boolean } }) => {
    const {
      editCoffeeShop: { ok },
    } = data;
    if (!ok) {
      return;
    } else {
      history.push("/");
    }
  };
  const onClick = () => {
    deleteCoffeeShopMutation({
      variables: {
        id: +id,
      },
    });
  };
  const [editCoffeeShopMutation, { loading }] = useMutation<
    editCoffeeShop,
    editCoffeeShopVariables
  >(EDIT_COFFEESHOP_MUTATION, { onCompleted });
  const [deleteCoffeeShopMutation] = useMutation<
    deleteCoffeeShop,
    deleteCoffeeShopVariables
  >(DELETE_COFFEESHOP_MUTATION, { onCompleted: onClick });
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isDirty, isValid },
  } = useForm<IFormProps>({
    mode: "onChange",
    defaultValues: {
      name: shopData?.seeCoffeeShop?.name,
      category: shopData?.seeCoffeeShop?.categories
        ?.map((cate: any) => `#${cate?.name}`)
        .join(" "),
      latitude: shopData?.seeCoffeeShop?.latitude || "",
      longitude: shopData?.seeCoffeeShop?.longitude || "",
    },
  });
  const onSubmit = () => {
    const { name, category, longitude, latitude } = getValues();
    editCoffeeShopMutation({
      variables: {
        id: +id,
        name,
        category,
        longitude,
        latitude,
      },
    });
  };
  return (
    <div>
      <HelmetTitle title="Edit" />
      <FormBox>
        <FontAwesomeIcon icon={faStore} size="3x" color="#01A1DD" />
        <Subtitle>Edit Shop</Subtitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            {...register("name", { required: "Name is required." })}
            name="name"
            placeholder="Name"
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
            Edit CofeeShop
          </ButtonInactivable>
        </form>
      </FormBox>
      <button onClick={onClick}>DELETE</button>
    </div>
  );
};

export default EditShop;
