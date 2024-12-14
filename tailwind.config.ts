import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			montserrat: ["var(--font-montserrat)"],
  			poppins: ["var(--font-poppins)"],
  			lato: ['Lato'],
  			garamond: ['Garamond']
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			'custom-gradient': 'linear-gradient(180deg, #988AFF 0%, #5945ED 100%)',
  		},
		  textColor: {
			'gradient': 'linear-gradient(180deg, #988AFF 0%, #5945ED 100%)',
		  },
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		  animation: {
			'flip-horizontal': 'flipHorizontal 1s ease-in-out infinite',
		  },
		  keyframes: {
			flipHorizontal: {
			  '0%': { transform: 'rotateY(0deg)' },
			  '50%': { transform: 'rotateY(180deg)' },
			  
			  '100%': { transform: 'rotateY(360deg)' },
			},
		  },
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
