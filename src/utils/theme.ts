const color = {
  cu_pink: "#F96491",
  white: "#FFFFFF",

  red: "#EA4040",
  yellow: "#EDAE30",
  orange: "#F2994A",
  blue: "#305FED",
  green: "#008143",
  gray: "#717D8A",
  black: "#0C1116",

  primary: "#F96491",
  secondary: "#FF887C",
  success: "#00C767",
  error: "#EA4040",
  warning: "#EDAE30",
  action: "#305FED",
  disable: "#DCDCDC",
  backgroundColor: "#F5F6F9",
  backgroundOnHover: "#D9D9D9",
  border: "#D6DADE",  

<<<<<<< HEAD
  primary50: "#F7F4FF",
  primary100: "#DAD2F6",
  primary200: "#B5A6ED",
};
=======
  primary50: '#F7F4FF',
  primary100: '#DAD2F6',
  primary200: '#B5A6ED',

  primaryHover: '#ED998E'
}
>>>>>>> main

const input = {
  label: "#717D8A",
  text: "#0C1116",
  placeholder: "#D6DADE",
  border: "#EAECEE",
  border_active: "#D6DADE",
  disable: "#FAFAFA",
};

const color_level = {
  pink: {
    medium: color.cu_pink,
    light: "#FF8DB0",
  },

  red: {
    high: "#D70004",
    medium: "#EA4040",
    low: "#F55759",
    light: "#FDE8E8",
  },

  orange: {
    high: "#E8740E",
    medium: "#F2994A",
    low: "#FFB879",
    light: "#FFF0E2",
  },

  yellow: {
    high: "#D78F00",
    medium: "#EDAE30",
    low: "#F5BF57",
  },

  blue: {
    high: "#134EE4",
    medium: "#305FED",
    low: "#577AF5",
  },

  green: {
    high: "#00B377",
    medium: "#00C767",
    low: "#13E44E",
    light: "#EFFCCA",
  },

  gray: {
    dark: "#454545",
    medium: "#8A8A8A",
    light: "#BABABA",
  },
};

const media = {
  mobile: "@media screen and (max-width: 425px)",
  tablet: "@media screen and (max-width: 768px)",
  pc: "@media screen and (max-width: 1024px)",
  wirescreen: "@media screen and (max-width: 1440px)",
};

const theme = {
  color,
  color_level,
  input,
  media,
};

export default theme;
