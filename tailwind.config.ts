
import type { Config } from "tailwindcss";

const {heroui} = require("@heroui/react");
const config: Config = {
    darkMode: ["class"],
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	  "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
   ],
   theme: {
   	extend: {
		animation: {
			scroll: 'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
			'accordion-down': 'accordion-down 0.2s ease-out',
			'accordion-up': 'accordion-up 0.2s ease-out'
		},
		lineClamp: {
			7: '7',
			8: '8',
			9: '9',
		  },
   		screens: {
   			crudCustom1: '1020px',
   			crudCustom2: '860px'
   		},
   		backgroundImage: {
   			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
   			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
   		},
   		fontFamily: {
   			montserrat: ["var(--font-montserrat)"]
   		},
   		colors: {
   			dark: '#13181e',
   			light: '#dadee7',
   			btnColor: '#3c417c',
   			background: 'hsl(var(--background))',
   			foreground: 'hsl(var(--foreground))',
   			card: {
   				DEFAULT: 'hsl(var(--card))',
   				foreground: 'hsl(var(--card-foreground))'
   			},
   			popover: {
   				DEFAULT: 'hsl(var(--popover))',
   				foreground: 'hsl(var(--popover-foreground))'
   			},
   			primary: {
   				DEFAULT: 'hsl(var(--primary))',
   				foreground: 'hsl(var(--primary-foreground))'
   			},
   			secondary: {
   				DEFAULT: 'hsl(var(--secondary))',
   				foreground: 'hsl(var(--secondary-foreground))'
   			},
   			muted: {
   				DEFAULT: 'hsl(var(--muted))',
   				foreground: 'hsl(var(--muted-foreground))'
   			},
   			accent: {
   				DEFAULT: 'hsl(var(--accent))',
   				foreground: 'hsl(var(--accent-foreground))'
   			},
   			destructive: {
   				DEFAULT: 'hsl(var(--destructive))',
   				foreground: 'hsl(var(--destructive-foreground))'
   			},
   			border: 'hsl(var(--border))',
   			input: 'hsl(var(--input))',
   			ring: 'hsl(var(--ring))',
   			chart: {
   				'1': 'hsl(var(--chart-1))',
   				'2': 'hsl(var(--chart-2))',
   				'3': 'hsl(var(--chart-3))',
   				'4': 'hsl(var(--chart-4))',
   				'5': 'hsl(var(--chart-5))'
   			},
			   'primary-color1': 'var(--primary-color1)',
			   'primary-color2': 'var(--primary-color2)',
			   'primary-color3': 'var(--primary-color3)',
			   'primary-color4': 'var(--primary-color4)',
   		},
   		borderRadius: {
   			lg: 'var(--radius)',
   			md: 'calc(var(--radius) - 2px)',
   			sm: 'calc(var(--radius) - 4px)'
   		},
   		keyframes: {
   			'accordion-down': {
   				from: {
   					height: '0'
   				},
   				to: {
   					height: 'var(--radix-accordion-content-height)'
   				}
   			},
   			'accordion-up': {
   				from: {
   					height: 'var(--radix-accordion-content-height)'
   				},
   				to: {
   					height: '0'
   				}
   			}
   		},
   	
   	}
   },
   plugins: [require("tailwindcss-animate"),heroui()],
};
export default config;
