import Link from 'next/link';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  @media screen and (max-width: 520px) {
    flex-direction: column;
  }
`;
const PageLinkBase = styled.a`
  max-width: 35%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  @media screen and (max-width: 520px) {
    padding-top: 0.3em;
    max-width: 100%;
  }
`;
const PrevPageLink = styled(PageLinkBase)`
  text-align: left;
`;
const NextPageLink = styled(PageLinkBase)`
  text-align: right;
  align-self: right;
`;
type Props = {
  next?: {
    href: string;
    as?: string;
    title: string;
  };
  prev?: {
    href: string;
    as?: string;
    title: string;
  };
};
export const Pager = ({ prev, next }: Props) => {
  return (
    <Container>
      {prev && (
        <Link href={prev.href} as={prev.as} passHref>
          <PrevPageLink>&laquo; {prev.title}</PrevPageLink>
        </Link>
      )}
      {next && (
        <Link href={next.href} as={next.as} passHref>
          <NextPageLink>{next.title} &raquo;</NextPageLink>
        </Link>
      )}
    </Container>
  );
};
