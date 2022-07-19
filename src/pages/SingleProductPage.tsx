import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import Loading from "../components/Loading";
import Cart from "../components/Cart";

interface ParamTypes {
  id: string;
}

interface Meta {
  uuid: string;
  errors: any[];
}

interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

interface Image {
  url: string;
  width: number;
  height: number;
  sourceUrl: string;
  thumbnails: Thumbnail[];
}

interface PrimaryPhoto {
  image: Image;
}

interface CPrimaryCTA {
  label: string;
  linkType: string;
  link: string;
}

interface Meta2 {
  accountId: string;
  uid: string;
  id: string;
  timestamp: Date;
  folderId: string;
  language: string;
  countryCode: string;
  entityType: string;
}

interface Response {
  landingPageUrl: string;
  savedFilters: string[];
  primaryPhoto: PrimaryPhoto;
  name: string;
  c_cCategory: string[];
  c_color: string[];
  c_department: string;
  c_price: string[];
  c_primaryCTA: CPrimaryCTA;
  c_productCategory: string[];
  c_subtitle: string[];
  c_type: string[];
  meta: Meta2;
}

interface RootObject {
  meta: Meta;
  response: Response;
}

const SingleProductPage = () => {
  const { id } = useParams();
  const [data, setData] = useState<RootObject["response"] | null>();
  const [isLoading, setIsLoading] = useState(false);
  const fetchProduct = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://liveapi-sandbox.yext.com/v2/accounts/3147081/entities/${id}?api_key=8a7b1b2d11c99bd6cd676dc3b9ff4a65&v=20220101`
      );
      const responseJson: RootObject = await response.json();
      setData(await responseJson.response);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <Wrapper>
        <div className="section section-center page">
          <Link to="/" className="btn">
            back to products
          </Link>
          <div className="product-center">
            <ImageWrapper>
              <img src={data?.primaryPhoto.image.url} className="main" />
            </ImageWrapper>
            <section className="content">
              <h2>{data?.name}</h2>
              <h5 className="price">{data?.c_price}</h5>
              <p className="desc">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum,
                animi commodi ab in cum natus, distinctio accusantium
                praesentium deserunt dignissimos porro provident temporibus
                exercitationem sunt eligendi consequatur eum neque quas.
              </p>
              {data?.c_department && (
                <p className="info">
                  <span>For : </span> {data?.c_department}
                </p>
              )}
              {data?.c_productCategory && (
                <p className="info">
                  <span>Type : </span>
                  {data?.c_productCategory}
                </p>
              )}
              {data?.c_cCategory && (
                <p className="info">
                  <span>Category : </span>
                  {data?.c_cCategory}
                </p>
              )}
              <hr />
              {data?.c_color && (
                <CartWrapper>
                  <div className="colors">
                    <span>colors :</span>
                    <div>
                      {data?.c_color.map((color, index) => {
                        return (
                          <button
                            className="color-btn"
                            key={index}
                            style={{ background: color }}
                          >
                            <FaCheck />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="btn-container">
                    <Cart />
                    <Link
                      to="/cart"
                      className="btn"
                      onClick={(e) => e.preventDefault()}
                    >
                      add to cart
                    </Link>
                  </div>
                </CartWrapper>
              )}
            </section>
          </div>
        </div>
      </Wrapper>
    );
  }
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }
  img {
    margin-left: auto;
    margin-right: auto;
  }
  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

const CartWrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
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
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }
  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`;

const ImageWrapper = styled.section`
  .main {
    height: 600px;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .active {
    border: 2px solid var(--clr-primary-5);
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`;
export default SingleProductPage;
