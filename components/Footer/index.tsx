import Link from 'next/link';
import styled from 'styled-components';
import { Container } from '../Container';

const FooterText = styled.span`
  text-align: center;
  font-size: 0.9em;
  padding: 2em 0.5em;
`;
export const Footer = () => {
  return (
    <Container>
      <hr />
      <FooterText>
        {`Powered by `}
        <a href='https://twitter.com/kyoto3univ'>京都三大学学生交流会</a>
        {` / Source code: `}
        <a href='https://github.com/kyoto3univ/newcomer-2020'>GitHub</a>
        {` / `}
        <Link href='/privacy-policy' prefetch={false}>
          プライバシーポリシー
        </Link>
      </FooterText>
    </Container>
  );
};
