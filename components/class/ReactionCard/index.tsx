import styled from 'styled-components';

const Card = styled.a`
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  box-shadow: 5px;
  padding: 1.25rem;
  box-shadow: 2.5px 2.5px 5px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease-in;
  transform: scale(1);
  text-decoration: none;
  color: ${({ theme }) => theme.card.textColor};
  width: 90%;
  margin: 5px;
`;

const Text = styled.p`
  margin: 0;
`;

type Props = {
  content: string;
};
export const ReactionCard = ({ content }: Props) => {
  return (
    <Card>
      <Text>{content}</Text>
    </Card>
  );
};
export * from './container';
