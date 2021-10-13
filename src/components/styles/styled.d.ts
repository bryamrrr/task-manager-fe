import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    background: string;
    body: string;
    checkBackground: string;
    error: string;
    headings: string;
    link: string;
    primaryFont: string;
    text: string;
    buttonBackground: string;
    buttonColor: string;
  }
}
