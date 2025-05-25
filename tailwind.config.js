module.exports = {
  theme: {
    extend: {
      colors: {
        blue: {
          900: '#003a7a',
          700: '#0057b8',
        },
        yellow: {
          400: '#ffd700',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui'],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
