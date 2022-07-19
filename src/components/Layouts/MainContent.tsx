import styled from "styled-components";

const MainContent = ({ result, component }: any): JSX.Element => {
  return (
    <Wrapper>
      {result}
      {component}
    </Wrapper>
  );
};

export default MainContent;

const Wrapper = styled.section``;
