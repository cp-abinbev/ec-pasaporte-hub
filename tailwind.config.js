module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      white: '#FFFFFF',
      black: '#000000',
      primary: '#FFEB23',
      blue: '#303969',
      gray: '#C4C4C4',
    },
    screens: {
      xsm: '360px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1380px',
    },
    fontFamily: {
      montserrat: ['Montserrat', 'sans-serif'],
      futura: ['Futura', 'sans-serif'],
      futuraII: ['FuturaII', 'sans-serif'],
      sans: ['NotoSans'],
      dosis: ['Dosis'],
    },
    boxShadow: {
      md: '0px 4px 4px rgba(0, 0, 0, 0.15)',
    },
    borderRadius: {
      0: '0px',
      DEFAULT: '3px',
      full: '9999px',
    },
    fontSize: {
      xs: ['10px', { lineHeight: '12px' }],
      link: ['14px', { lineHeight: '12px' }],
      tc: ['11px', { lineHeight: '13px' }],
      sm: ['12px', { lineHeight: '14px' }],
      base: ['13px', { lineHeight: '15px' }],
      xl: ['15px', { lineHeight: '12px' }],
      '2xl': ['16px', { lineHeight: '18px' }],
      '3xl': ['18px', { lineHeight: '20px' }],
      '4xl': ['25px', { lineHeight: '29px' }],
      '5xl': ['34px', { lineHeight: '36px' }],
    },
    extend: {},
  },
  plugins: [],
};
