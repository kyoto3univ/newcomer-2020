import styled from 'styled-components';

const Container = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Item = styled.li`
  padding: 2px 16px;
  margin: 2px 5px;
  background-color: #eee;
  border-radius: 1em;
  border: 1px solid transparent;
  font-size: 0.9em;
  word-break: break-all;
  @media screen and (max-width: 520px) {
    margin: 1.5px 1.5px;
    padding: 0.5px 7px;
    font-size: 0.85em;
  }
`;

type Props = { data: string[] };
export const CategoryList = ({ data }: Props) => {
  return (
    <Container>
      {data.map((item) => (
        <Item key={item}>{item}</Item>
      ))}
    </Container>
  );
};
