import {
  DropdownItem,
  SearchBar,
  VisualAutocompleteConfig,
} from "@yext/search-ui-react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { config } from "../config";
import logo from "../icons/logo.png";
import CartIcon from "./CartComponents/CartIcon";
import { provideHeadless, SandboxEndpoints } from "@yext/search-headless-react";

export function Navbar() {
  const visualAutocompleteConfig: VisualAutocompleteConfig = {
    entityPreviewSearcher: provideHeadless({
      ...config,
      endpoints: SandboxEndpoints,
      headlessId: "visual-autocomplete",
    }),
    includedVerticals: ["products"],
    renderEntityPreviews: (isLoading, verticalKeyToResults) => {
      if (!verticalKeyToResults.products) {
        return null;
      }

      const { results } = verticalKeyToResults.products;

      return (
        <div className="SB_parent">
          {results.map((r: any, index: number) => (
            <DropdownItem
              key={index + "-" + r.name}
              value={r.name ? r.name : ""}
            >
              <Link to={`/product/${r.id}`}>
                <div className="SB_container2">
                  <div>
                    <img
                      src={r.rawData?.primaryPhoto?.image?.url}
                      className="SB_iconDetails"
                      alt={r.rawData.name}
                    />
                  </div>
                  <div style={{ marginLeft: "5em" }}>
                    <h4>{r.name}</h4>
                    <div>{r.rawData?.c_price}</div>
                  </div>
                </div>
              </Link>
            </DropdownItem>
          ))}
        </div>
      );
    },
  };
  return (
    <NavContainer>
      <div className="nav-center">
        <Link to="/">
          <img src={logo} alt="ecomm" style={{ width: "65%" }} />
        </Link>
        <ul className="nav-links">
          <li>
            <Link className="text-blue-500 hover:underline p-2" to="/">
              All Products
            </Link>
          </li>
        </ul>
        <SearchBar
          visualAutocompleteConfig={visualAutocompleteConfig}
          hideRecentSearches={true}
          customCssClasses={{
            searchBarContainer: "overrideContainer",
            recentSearchesOption: "hidden",
            icon: "none",
          }}
        />
      </div>
      <CartIcon />
    </NavContainer>
  );
}

const NavContainer = styled.nav`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: start;
  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
  }
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 175px;
      margin-left: -15px;
    }
  }
  .nav-toggle {
    background: transparent;
    border: transparent;
    color: var(--clr-primary-5);
    cursor: pointer;
    svg {
      font-size: 2rem;
    }
  }
  .nav-links {
    display: none;
  }
  .cart-btn-wrapper {
    display: none;
  }
  @media (min-width: 992px) {
    .nav-toggle {
      display: none;
    }
    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
    }
    .nav-links {
      display: flex;
      justify-content: start;
      li {
        margin: 0 0.5rem;
      }
      a {
        color: var(--clr-grey-3);
        font-size: 1rem;
        text-transform: capitalize;
        letter-spacing: var(--spacing);
        padding: 0.5rem;
        &:hover {
          border-bottom: 2px solid var(--clr-primary-7);
          text-decoration: none;
        }
      }
    }
    .cart-btn-wrapper {
      display: grid;
    }
  }
`;
