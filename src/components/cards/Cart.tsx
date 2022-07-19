import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import styled from "styled-components";

const Cart = () => {
  const [amount, setAmount] = useState(1);
  const decrease = () => {
    var amnt = amount - 1;
    if (amnt < 1) setAmount(1);
    else setAmount(amnt);
  };
  const increase = () => {
    var amnt = amount + 1;
    if (amnt >= 20) setAmount(20);
    else setAmount(amnt);
  };

  return (
    <Wrapper className="amount-btns">
      <button type="button" className="amount-btn" onClick={decrease}>
        <FaMinus />
      </button>
      <h2 className="amount">{amount}</h2>
      <button type="button" className="amount-btn" onClick={increase}>
        <FaPlus />
      </button>
    </Wrapper>
  );
};

export default Cart;
const Wrapper = styled.div`
  display: grid;
  width: 140px;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  h2 {
    margin-bottom: 0;
  }
  button {
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    padding: 1rem 0;
    width: 2rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h2 {
    margin-bottom: 0;
  }
`;
