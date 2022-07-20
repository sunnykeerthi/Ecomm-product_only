import { useAnswersActions } from "@yext/answers-headless-react";
import { LocationBias, Pagination } from "@yext/answers-react-components";

import { useLayoutEffect } from "react";
import usePageSetupEffect from "../hooks/usePageSetupEffect";

import styled from "styled-components";
import FacetsSection from "../components/cards/FacetsSection";
import FacetContent from "../components/Layouts/FacetContent";
import MainContent from "../components/Layouts/MainContent";
import ResultCountSection from "../components/cards/ResultCountSection";
import ProductsListContainer from "../components/cards/ProductsListContainer";

const customSearchBarCss = {
  searchBarContainer: "mb-3 text-emerald-800",
};

export function ProductsPage() {
  const answersActions = useAnswersActions();
  useLayoutEffect(() => {
    answersActions.setVertical("products");
  });
  usePageSetupEffect("products");

  return (
    <>
      <Wrapper className="page">
        <div className="section-center products">
          <FacetContent component={<FacetsSection />} />
          <div>
            <MainContent
              result={
                <ResultCountSection isProducts={true} sortOptions={true} />
              }
              component={<ProductsListContainer />}
            ></MainContent>
          </div>
        </div>
      </Wrapper>
      <Pagination />
      <LocationBias />
    </>
  );
}

const Wrapper = styled.div`
  .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 250px 1fr;
    }
  }
`;

const WrapperGrid = styled.section`
  img {
    height: 175px;
  }
  .products-container {
    display: grid;
    gap: 2rem 1.5rem;
  }
  @media (min-width: 992px) {
    .products-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 1170px) {
    .products-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;
