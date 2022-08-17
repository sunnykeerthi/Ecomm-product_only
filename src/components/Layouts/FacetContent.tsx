import {
  useSearchActions,
  useSearchState,
} from "@yext/search-headless-react";
import { NumericalFacets } from "@yext/search-ui-react";
import { useEffect } from "react";
import styled from "styled-components";
import { useProductsContext } from "../../context/ProductsContext";
import Loading from "../Loading";

const FacetContent = ({ component }: any): JSX.Element => {
  return <Wrapper>{component}</Wrapper>;
};

export default FacetContent;

const Wrapper = styled.section``;
