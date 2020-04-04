import Link from 'next/link';
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
  background: #111;
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
  color: #fff;
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

const SubLink = styled.a`
  margin-left: auto;
  text-decoration: none;
  line-height: 60px;
  color: #fff;

  @media screen and (max-width: 520px) {
    line-height: 50px;
  }
`;
export const Header = () => {
  return (
    <HeaderContainer>
      <HeaderInnerContainer>
        <Link href='/' passHref>
          <HeaderLink>
            <Logo src='/logo.jpg' />
            <NormalTitle>京都工繊新入生応援サイト</NormalTitle>
            <SpTitle>トップ</SpTitle>
          </HeaderLink>
        </Link>
        <Link href='/club-circle' passHref>
          <SubLink>サークル紹介</SubLink>
        </Link>
      </HeaderInnerContainer>
      <style jsx global>
        {`
          body {
            margin-top: 75px;
          }
          @media screen and (max-width: 520px) {
            body {
              margin-top: 65px;
            }
          }
        `}
      </style>
    </HeaderContainer>
  );
};
