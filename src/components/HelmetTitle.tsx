import React from "react";
import { Helmet } from "react-helmet-async";
import { SITE_TITLE } from "../constants";

interface IHelmetTitle {
  title: string;
}

export const HelmetTitle: React.FC<IHelmetTitle> = ({ title }) => (
  <Helmet>
    <title>
      {title} | {SITE_TITLE}
    </title>
  </Helmet>
);
