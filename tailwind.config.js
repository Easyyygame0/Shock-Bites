export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        sans: ['Nunito', 'sans-serif'],
      },
      colors: {
        brand: {
          green:  '#1e5c2e',
          light:  '#e8f0e1',
          cream:  '#f0f4e8',
          accent: '#d4f53c',
          card:   '#ffffff',
          muted:  '#5a7a4a',
        }
      }
    }
  },
  plugins: []
};
