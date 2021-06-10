import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { seeCoffeeShops_seeCoffeeShops } from "../../__generated__/seeCoffeeShops";
import { FatText } from "../shared";

const ShopContainer = styled.div`
  background-color: white;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.borderColor};
`;

const ShopPhoto = styled.img`
  min-width: 100%;
  max-width: 100%;
  min-height: 240px;
  max-height: 240px;
  object-fit: cover;
`;

const ShopData = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 15px;
`;

const ShopName = styled(FatText)`
  color: #01a1dd;
  font-size: 18px;
`;

const CategoryData = styled.div`
  display: block;
  margin-top: 8px;
`;

const CategoryName = styled.span`
  font-size: 16px;
  color: black;
  margin-right: 12px;
`;

interface IShopItemProps {
  shop: seeCoffeeShops_seeCoffeeShops;
}

const CoffeeShop = ({ shop }: IShopItemProps) => {
  return (
    <>
      {shop.isMine ? (
        <ShopContainer key={shop.id}>
          <Link to={`/shop/${shop.id}`}>
            <ShopPhoto src={shop.photos?.slice(0, 1)[0]?.url} />
            <ShopData>
              <ShopName>{shop.name}</ShopName>
              <CategoryData>
                {shop.categories?.map((category: any, index: number) => (
                  <CategoryName key={index}>#{category?.name}</CategoryName>
                ))}
              </CategoryData>
            </ShopData>
          </Link>
        </ShopContainer>
      ) : null}
    </>
  );
};

export default CoffeeShop;
