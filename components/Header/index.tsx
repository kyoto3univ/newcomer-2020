import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { Container } from '../Container';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0%;
  left: 0;
  margin: 0;
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  background: ${({ theme }) => theme.header.bgColor};
  z-index: 2;
  @media screen and (max-width: 520px) {
    height: 50px;
  }
`;

const HeaderInnerContainer = styled(Container)`
  display: flex;
`;

const HeaderLink = styled.a`
  display: inline-flex;
  text-decoration: none;
`;

const Logo = styled.img`
  border-radius: 50%;
  padding: 10px;
  height: 40px;
  @media screen and (max-width: 520px) {
    display: none;
  }
`;

const Title = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.header.linkColor};
  font-size: 22px;
  padding-left: 10px;
  line-height: 60px;
`;

const NormalTitle = styled(Title)`
  @media screen and (max-width: 520px) {
    display: none;
  }
`;

const SpTitle = styled(Title)`
  display: none;
  font-size: 18px;
  line-height: 50px;
  @media screen and (max-width: 520px) {
    display: inline-block;
  }
`;

const PWABack = styled.span`
  display: inline-block;
  height: 60px;
  width: 40px;
  @media screen and (max-width: 520px) {
    height: 50px;
    width: 40px;
  }
  background-image: url(/images/buttons/arrow-back.svg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 36px;
  cursor: pointer;
`;

const SubLinkContainer = styled.div`
  margin-left: auto;
`;

const SubLink = styled.a`
  margin: 0 0.5em;
  text-decoration: none;
  line-height: 60px;
  color: ${({ theme }) => theme.header.linkColor};

  @media screen and (max-width: 520px) {
    line-height: 50px;
  }
`;
export const Header = () => {
  const { pathname, back } = useRouter();
  const isPWA = React.useMemo(() => {
    return (
      process.browser &&
      window.matchMedia &&
      matchMedia('(display-mode: standalone)').matches
    );
  }, []);
  return (
    <HeaderContainer>
      <HeaderInnerContainer>
        {isPWA && pathname !== '/' && <PWABack onClick={back} />}
        <Link href='/' passHref>
          <HeaderLink>
            <Logo src='/logo.jpg' />
            <NormalTitle>京都工繊新入生応援サイト</NormalTitle>
            {pathname !== '/' && !isPWA && <SpTitle>TOPに戻る</SpTitle>}
          </HeaderLink>
        </Link>
        <SubLinkContainer>
          <Link href='/club-circle' passHref>
            <SubLink>サークル紹介</SubLink>
          </Link>
          <Link href='/class' passHref>
            <SubLink>授業紹介</SubLink>
          </Link>
        </SubLinkContainer>
      </HeaderInnerContainer>
      <style jsx global>
        {`
          body {
            margin-top: 75px !important;
          }
          @media screen and (max-width: 520px) {
            body {
              margin-top: 65px !important;
            }
          }
        `}
      </style>
    </HeaderContainer>
  );
};
