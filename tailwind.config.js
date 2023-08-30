/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './public/index.html',
    "./src/**/*.{html,js,jsx}"
  ],
  theme: {
    fontFamily: {
      'head': ['Inter', 'sans-serif'],
      'body': ['DM Sans', 'sans-serif'],
    },
    fontSize: {
      'h1': ['7.594rem', {
        lineHeight: '8.3534rem',
        letterSpacing: '-0.112895em',
        fontWeight: '600',
      }],
      'h2': ['5.063rem', {
        lineHeight: '6.0756rem',
        letterSpacing: '-0.092895em',
        fontWeight: '500',
      }],
      'h3': ['3.375rem', {
        lineHeight: '4.3875rem',
        letterSpacing: '-0.072895em',
        fontWeight: '400',
      }],
      'h4': ['2.25rem', {
        lineHeight: '2.925rem',
        letterSpacing: '-0.062895em',
        fontWeight: '300',
      }],
      'h5': ['1.5rem', {
        lineHeight: '1.95rem',
        letterSpacing: '-0.052895em',
        fontWeight: '300',
      }],
      'para': ['1rem', {
        lineHeight: '1.45rem',
        letterSpacing: '-0.05em',
        fontWeight: '400',
      }],
      'small': ['.9rem', {
        lineHeight: '1.305rem',
        letterSpacing: '-0.045em',
        fontWeight: '400',
      }],
    },
    extend: {
      colors: {
        'base': '#056cf2',
        'dark': '#010626',
        'base-dark': '#0439d9',
        'base-light': '#0455bf',
        'light': '#f2f2f2',
        'gray-100': '#000106',
        'gray-75': '#000106bf',
        'gray-50': '#00010680',
        'gray-25': '#00010640',
        'gray-10': '#0001061a',
        'gray-05': '#0001060d',
        'error-500': 'f44336',
        'error-400': 'ef55350',
        'error-300': 'e57373',
        'error-200': 'ef9a9a',
        'error-100': 'ffcdd2',
        'error-50': 'ffebee',
      },
      fontFamily: {
        'sans': ['DM Sans', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}

