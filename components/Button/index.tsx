import styled from 'styled-components';

export const Button = styled.a`
  cursor: pointer;
  color: ${({ theme }) => theme.button.color};
  background-color: ${({ theme }) => theme.button.bgColor};
  border: 2px solid ${({ theme }) => theme.button.bgColor};
  margin: 5px;
  padding: 0.3rem 0.7rem;
  font-size: 1.1em;
  line-height: 1.2em;
  border-radius: 0.4rem;
  display: inline-block;

  &:hover {
    border: 2px solid ${({ theme }) => theme.button.hoverBorderColor};
    background-color: ${({ theme }) => theme.button.hoverBgColor};
  }
`;
