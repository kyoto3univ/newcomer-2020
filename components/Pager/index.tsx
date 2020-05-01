import Link from 'next/link';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const PageLinkBase = styled.a`
  max-width: 35%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  position: relative;
  @media screen and (max-width: 520px) {
    padding-top: 0.3em;
    max-width: 100%;
  }
  ::before,
  ::after {
    position: absolute;
  }
`;
const PrevPageLink = styled(PageLinkBase)`
  text-align: left;
  padding-left: 0.8em;
  ::before {
    content: '«';
    left: 0;
  }
`;
const NextPageLink = styled(PageLinkBase)`
  text-align: right;
  padding-right: 0.8em;
  margin-left: auto;
  ::after {
    content: '»';
    right: 0;
  }
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
      {prev ? (
        <Link href={prev.href} as={prev.as} passHref>
          <PrevPageLink>{prev.title}</PrevPageLink>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link href={next.href} as={next.as} passHref>
          <NextPageLink>{next.title}</NextPageLink>
        </Link>
      ) : (
        <div />
      )}
    </Container>
  );
};
