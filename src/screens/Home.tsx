import { gql, useQuery } from "@apollo/client";
import React from "react";
import styled from "styled-components";
import { HelmetTitle } from "../components/HelmetTitle";
import { Loader } from "../components/Loader";
import { FatText } from "../components/shared";
import CoffeeShop from "../components/shop/CoffeeShop";
import { seeCoffeeShops } from "../__generated__/seeCoffeeShops";

const SEECOFFEESHOPS_QUERY = gql`
  query seeCoffeeShops {
    seeCoffeeShops {
      id
      name
      photos {
        url
      }
      categories {
        name
      }
      isMine
    }
  }
`;

const HomeLayOut = styled.div`
  display: flex;
`;

const CategoryContainer = styled.div`
  border: 2px #2c2c2c;
  display: flex;
  justify-content: flex-start;
  width: 210px;
  border-right: 1px solid ${(props) => props.theme.borderColor};
`;

const SubjectText = styled(FatText)`
  font-size: 16px;
  color: #555555;
`;

const CoffeeShopContainer = styled.div`
  width: 720px;
  padding-left: 50px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

export const Home = () => {
  const { data, loading } = useQuery<seeCoffeeShops>(SEECOFFEESHOPS_QUERY);
  console.log(data);
  return (
    <div>
      <HelmetTitle title="Home" />
      {loading ? (
        <Loader />
      ) : (
        <HomeLayOut>
          <CategoryContainer>
            <SubjectText>FILTER BY CATEGORY</SubjectText>
          </CategoryContainer>
          <CoffeeShopContainer>
            {data?.seeCoffeeShops?.map((shop: any) => (
              <CoffeeShop key={shop?.id} shop={shop} />
            ))}
          </CoffeeShopContainer>
        </HomeLayOut>
      )}
    </div>
  );
};
