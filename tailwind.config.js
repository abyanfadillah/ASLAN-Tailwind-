
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'bg-auth': "url('/src/assets/image/bg-auth.jpg')",
        'bg-unsplash': "url('https://source.unsplash.com/random/?sea,fisherman,logistics')",
      }
      
    },
  },
  plugins: [],
}