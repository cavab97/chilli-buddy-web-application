import defaultTheme from "marslab-library-react/settings/styles/theme/themedefault";
import clone from "clone";

const theme = clone(defaultTheme);
theme.palette.primary = [
  "rgb(242, 138, 34)", // 0: Default
  "rgb(232, 132, 32)", // 1: Darken 4%
  "rgb(230, 131, 32)", // 2: Darken 5%
  "rgba(242, 138, 34, 0.2)", // 3: Fade 20%
  "rgb(250, 142, 35)", // 4: Lighten 3%
  "rgba(242, 138, 34, 0.75)", // 5: Fade 75%
  "rgb(255, 156, 46)", // 6: Lighten 15%
  "rgb(255, 163, 46)", // 7: Lighten 12%
  "rgb(237, 135, 33)", // 8: Darken 2%
  "#3369e7", // 9: Algolia color
  "#5896FF", // 10: Lighten 8%
  "#2b69e6", // 11:
  "#236cfe", // 12: darken 10%
  "#4d88ff" // 13: Lighten 5%
];

theme.palette.secondary = [
  "rgb(252, 253, 255)", // 0: DarkBlue
  "#f1f3f6", // 1: LightBluish
  "#788195", // 2: LightBlue
  "#E4E6E9", // 3: LightBluish Darken 5%
  "#364d79", // 4:
  "#202739", // 5: DarkBlue Darken 5%
  "#f5f6f8", // 6: LighterBluish
  "#e9ebf1", // 7: DarkBluish
  "#F6F8FB", // 8: LighterBluish Lighten 2%
  "#E9EBEE", // 9: LighterBluish Darken 3%
  "#1a1a1a" // 10: Sidebar submenu select
];

theme.palette.color= [
  '#FEAC01', // 0: Orange
  '#42299a', // 1: Purple
  '#F75D81', // 2: Pink
  '#7ED321', // 3: LimeGreen
  '#39435f', // 4: BlueShade
  '#FFCA28', // 5: Yellow
  '#F2BD1B', // 6: Yellow Darken 5%
  '#3b5998', // 7: Facebook
  '#344e86', // 8: Facebook Darken 5%
  '#dd4b39', // 9: Google Plus
  '#d73925', // 10: Google Plus Darken 5%
  '#e14615', // 11: Auth0
  '#ca3f13', // 12: Auth0
  '#e0364c', // 13: themeColor--AlizarinCrimson
  '#42526e', // 14: dark grey
  '#ffffff', // 15: white
];

export default theme;
