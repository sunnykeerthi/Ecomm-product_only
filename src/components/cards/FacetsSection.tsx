import { useSearchState } from "@yext/search-headless-react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useProductsContext } from "../../context/ProductsContext";
import { Divider } from "../Divider";
import Facets from "../Facets";
import FilterDisplayManager from "../FilterDisplayManager";
interface ClassFacetsProps {
  isMobile?: boolean;
}
const FacetsSection = ({ isMobile }: ClassFacetsProps): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const { setPrice, setMaxPrice, price, setMinPrice, minPrice, maxPrice } =
    useProductsContext();
  const results = useSearchState((state) => state.vertical.results);
  const isLoading = useSearchState((state) => state.searchStatus.isLoading);

  const [value, setValue] = useState(1);
  const updatePriceRange = (e: any) => {
    e.preventDefault();
    setValue(e.target.value);
    setPrice(e.target.value);
  };

  useEffect(() => {
    if (results && results?.length > 0) {
      setLoading(true);
      const resData = results as unknown as Root;
      const min = Math.min(
        ...resData?.map((item: any) => item.rawData.price.value)
      );
      const max = Math.max(
        ...resData?.map((item: any) => item.rawData.price.value)
      );
      setLoading(false);
      if (!minPrice) {
        setMinPrice(min);
        setMaxPrice(max);
      }
    }
  }, [results]);

  return (
    <div className="content">
      <FilterDisplayManager>
        <div
          className="text-gray-900 text-sm font-medium text-left"
          style={{ display: "flex" }}
        >
          Price
          <h5
            style={{
              fontWeight: "bold",
              marginLeft: "auto",
              order: "2",
              marginRight: "18%",
            }}
          >
            {parseInt(price) === parseInt(minPrice) || parseInt(price) === 0
              ? ""
              : "<$" + parseInt(price) || parseInt(minPrice)}
          </h5>
        </div>
        {parseInt(minPrice)}
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={parseInt(price) || parseInt(minPrice)}
          onChange={(e: any) => updatePriceRange(e)}
        />
        {parseInt(maxPrice)}
        <br />
        <Divider />
        <Facets
          cssCompositionMethod="assign"
          searchOnChange={true}
          defaultExpanded={true}
          facetConfigs={{
            c_department: {
              label: "Department",
              showFacet: true,
            },
            c_cCategory: {
              label: "Category",
              collapsible: true,
              defaultExpanded: true,
              showFacet: true,
            },
            c_color: {
              label: "Colors",
              collapsible: true,
              defaultExpanded: true,
              showFacet: true,
              facetCss: { optionsContainer: "colors-container" },
              type: "color",
            },
          }}
        />
      </FilterDisplayManager>
    </div>
  );
};

export default FacetsSection;
const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }
  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }

  fieldset > button {
    display: flex !important;
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export type Root = Root2[];

export interface Root2 {
  rawData: RawData;
  source: string;
  index: number;
  name: string;
  id: string;
  highlightedFields: HighlightedFields;
  entityType: string;
}

export interface RawData {
  id: string;
  type: string;
  landingPageUrl: string;
  savedFilters: string[];
  price: Price;
  primaryPhoto: PrimaryPhoto;
  name: string;
  c_cCategory: string[];
  c_color: string[];
  c_department: string;
  c_fabric?: string[];
  c_fit: string[];
  c_price: string[];
  c_primaryCTA: CPrimaryCta;
  c_productCategory?: string[];
  c_size: string[];
  c_sleeveLength?: string[];
  c_subtitle?: string[];
  c_type?: string[];
  uid: string;
  c_isSale?: boolean;
  c_collarType?: string[];
  c_pockets?: string[];
}

export interface Price {
  value: string;
  currencyCode: string;
}

export interface PrimaryPhoto {
  image: Image;
}

export interface Image {
  url: string;
  width: number;
  height: number;
  sourceUrl: string;
  thumbnails: Thumbnail[];
}

export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface CPrimaryCta {
  label: string;
  linkType: string;
  link: string;
}

export interface HighlightedFields {}
