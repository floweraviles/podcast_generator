module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js, ts, jsx, tsx}"
    ],
    theme: {
        extend: {
            colors: {
                'cyberBlack': "#1a1a1a",
                'neonBlue': "#4af",
                'neonBlue-dark': "0070cc",
                'neonPurple': "#b0f",
                'neonPink': "#f70",
                'neonGreen': "#39ff14",
                'neonOrange': "#ff9900",
                'cyberWhite': "#e0e0e0",
            },

            fontFamily: {
                cyber: ['sans-serif'],
            },

            boxShadow: {                  
                'neonBlue-sm': '0 0 6px 2px rgba(74, 170, 255, 0.5)',
                'neonBlue-md': '0 0 12px 4px rgba(74, 170, 255, 0.5)',
                'neonPink-sm': '0 0 6px 2px rgba(255, 119, 0, 0.5)',
                'neonPink-md': '0 0 12px 4px rgba(255, 119, 0, 0.5)',
                'neonPurple-sm': '0 0 6px 2px rgba(176, 0, 255, 0.5)',
                'neonPurple-md': '0 0 12px 4px rgba(176, 0, 255, 0.5)',
                'neonGreen-sm': '0 0 6px 2px rgba(57, 249, 0, 0.5)',
                'neonGreen-md': '0 0 12px 4px rgba(57, 249, 0, 0.5)',
              }
        },
    },
    plugins: [],
};