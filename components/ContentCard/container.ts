import styled from 'styled-components';

export const ContentCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(auto, 320px));
  justify-content: space-around;
  align-content: center;
  grid-row-gap: 1.4rem;
  grid-column-gap: 1.4rem;
  margin: 1.2em;
`;
