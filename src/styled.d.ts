import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
    boardColor: string;
    cardBgColor: string;
    headerBgColor: string;
    btnColor: string;
  }
}

declare module "./css/*.module.css";