export const theme = {
  textColor: '#212529',
  linkColor: '#0f94b3',
  header: {
    bgColor: '#0f94b3',
    linkColor: '#fff',
  },
  sectionTitle: {
    color: '#0f94b3',
    lineColor: '#0f94b3',
    fontSize: '1.3em',
  },
  card: {
    titleColor: '#0f94b3',
    textColor: '#212529',
  },
  club: {
    cardTitleColor: '#0f94b3',
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
