import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    avatarBackground: string;
    background: string;
    buttonBackground: string;
    buttonColor: string;
    body: string;
    checkBackground: string;
    error: string;
    headings: string;
    link: string;
    primaryFont: string;
    secondaryText: string;
    text: string;
  }
}
