import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'gray': '#5D6065',
        'middle-gray': '#1E1E1E',
        'primary': '#E4B61A',
        'white': '#E9EAEC',
        'marine': '#75C9C8',
        'dark-gray': '#2A2E34',
        'skyblue': '#3ABFF8',
        'green': '#36D399',
        'yellow': '#FBE134',
        'red': '#F87272',
        'black': '#0b0c0c'
      },
    },
  },
  plugins: [],
}
export default config
