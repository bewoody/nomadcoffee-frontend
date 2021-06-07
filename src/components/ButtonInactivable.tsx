import React, { MouseEventHandler } from "react";
import styled, { css } from "styled-components";
import { Loader } from "./Loader";

interface IButtonInactivableType {
  isActivate?: boolean;
  loading: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = styled.button<{ isActive?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: min-content;
  height: 32px;
  ${(props) =>
    !props.isActive &&
    css`
      pointer-events: none;
    `};
  background-color: ${(props) => (props.isActive ? "#01A1DD" : "#B2DFFC")};
  color: white;
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 3px;
  margin-top: 5px;
`;

const ButtonInactivable: React.FC<IButtonInactivableType> = ({
  children,
  ...props
}) => {
  const { isActivate, loading, onClick, ...rest } = props;
  return (
    <Button isActive={isActivate} onClick={onClick} {...rest}>
      {loading ? <Loader /> : children}
    </Button>
  );
};

export default ButtonInactivable;
