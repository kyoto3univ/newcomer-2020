import React from 'react';
import { Collapse as ReactCollapse } from 'react-collapse';
import styled from 'styled-components';

const CollapseContainer = styled.div`
  .ReactCollapse--collapse {
    transition: all 0.2s ease-in;
  }
`;
const CollapseHeader = styled.div<{ open: boolean }>`
  cursor: pointer;
  &::after {
    content: '${({ open }) => (open ? '[非表示]' : '[表示]')}';
    color: #007bff;
  }
`;

type Props = {
  header: string | React.ReactElement;
  content: string | React.ReactElement;
  defaultState?: boolean;
};
export const Collapse = ({ header, content, defaultState = false }: Props) => {
  const [open, setOpen] = React.useState(defaultState);

  const toggle = React.useCallback(() => {
    setOpen(!open);
  }, [open]);
  return (
    <CollapseContainer>
      <CollapseHeader onClick={toggle} open={open}>
        {header}
      </CollapseHeader>
      <ReactCollapse isOpened={open}>{content}</ReactCollapse>
    </CollapseContainer>
  );
};
