import styled from 'styled-components';

export const SectionTitle = styled.h2`
  border-bottom: 3px solid ${({ theme }) => theme.sectionTitle.lineColor};
  color: ${({ theme }) => theme.sectionTitle.color};
`;
