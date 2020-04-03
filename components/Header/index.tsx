import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { Container } from '../Container';

const HeaderContainer = styled.header`
  margin: 0;
  box-sizing: border-box;
  width: 100vw;
  height: 60px;
  background: #111;
  @media screen and (max-width: 520px) {
    height: 40px;
  }
`;

const HeaderLink = styled.a`
  display: flex;
  text-decoration: none;
`;

const Logo = styled.img`
  border-radius: 50%;
  padding: 10px;
  height: 40px;
  @media screen and (max-width: 520px) {
    height: 30px;
    padding: 5px;
  }
`;

const Title = styled.span`
  display: block;
  color: #fff;
  font-size: 22px;
  padding-left: 10px;
  line-height: 60px;
  @media screen and (max-width: 520px) {
    visibility: hidden;
  }
`;

export const Header = () => {
  return (
    <HeaderContainer>
      <Container>
        <Link href='/' passHref>
          <HeaderLink>
            <Logo src='/logo.jpg' />
            <Title>京都三大学新入生応援サイト</Title>
          </HeaderLink>
        </Link>
      </Container>
    </HeaderContainer>
  );
};