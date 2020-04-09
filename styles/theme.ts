export const theme = {
  textColor: '#212529',
  linkColor: '#007bff',
  header: {
    bgColor: '#222',
    linkColor: '#fff',
  },
  sectionTitle: {
    color: '#111',
    lineColor: '#f20',
  },
  card: {
    titleColor: '#007bff',
    textColor: '#212529',
  },
  club: {
    cardTitleColor: '#007bff',
    cardTextColor: '#212529',
  },
  class: {
    hourColor: '#fff',
    hourBgColor: '#777',
  },
} as const;

type AppTheme = typeof theme;
declare module 'styled-components' {
  interface DefaultTheme extends AppTheme {}
}
