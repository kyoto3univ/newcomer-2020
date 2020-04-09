import styled from 'styled-components';

export const SectionTitle = styled.h2<{ sakura?: boolean }>`
  border-bottom: 3px solid ${({ theme }) => theme.sectionTitle.lineColor};
  color: ${({ theme }) => theme.sectionTitle.color};
  font-size: ${({ theme }) => theme.sectionTitle.fontSize};

  ${({ sakura }) =>
    sakura
      ? `
    &::before {
      content: '🌸';
      font-size: 0.9em;
    }
  `
      : ''}
`;
