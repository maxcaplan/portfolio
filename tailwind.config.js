import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		fontFamily: {
			sans: [...defaultTheme.fontFamily.sans],
			mono: ["JetBrains Mono", ...defaultTheme.fontFamily.mono],
		},
		extend: {
			colors: {
				"brand-gray": {
					DEFAULT: "#0C0C0C",
					50: "#B9B9B9",
					100: "#A5A5A5",
					200: "#919191",
					300: "#7C7C7C",
					400: "#686868",
					500: "#535353",
					600: "#3F3F3F",
					700: "#212121",
					800: "#121212",
					900: "#0C0C0C",
					950: "#080808",
				},
				"brand-white": {
					DEFAULT: "#F2EFEF",
					50: "#F2EFEF",
					100: "#E5E0E0",
					200: "#CCC1C1",
					300: "#B3A2A2",
					400: "#9A8383",
					500: "#7E6666",
					600: "#5F4D4D",
					700: "#403434",
					800: "#211B1B",
					900: "#020202",
					950: "#000000",
				},
				"brand-purple": {
					DEFAULT: "#B692C8",
					50: "#FFFFFF",
					100: "#FFFEFF",
					200: "#ECE3F1",
					300: "#DAC8E3",
					400: "#C8ADD6",
					500: "#B692C8",
					600: "#9D6DB5",
					700: "#824E9B",
					800: "#633C76",
					900: "#432951",
					950: "#341F3E",
				},
				"brand-blue": {
					DEFAULT: "#7CC6FE",
					50: "#FFFFFF",
					100: "#FFFFFF",
					200: "#F5FBFF",
					300: "#CDE9FF",
					400: "#A4D8FE",
					500: "#7CC6FE",
					600: "#44AEFE",
					700: "#0D96FD",
					800: "#0277D0",
					900: "#015798",
					950: "#01477D",
				},
				"brand-green": {
					DEFAULT: "#DDF597",
					50: "#FFFFFF",
					100: "#FFFFFF",
					200: "#FFFFFF",
					300: "#F5FCE1",
					400: "#E9F9BC",
					500: "#DDF597",
					600: "#CCF064",
					700: "#BCEB31",
					800: "#A0D014",
					900: "#789D0F",
					950: "#415408",
				},
				"brand-yellow": {
					DEFAULT: "#FCDC4D",
					50: "#FFFFFF",
					100: "#FFFCED",
					200: "#FEF4C5",
					300: "#FDEC9D",
					400: "#FDE475",
					500: "#FCDC4D",
					600: "#FBD116",
					700: "#D5AF04",
					800: "#9E8203",
					900: "#675402",
					950: "#4B3E01",
				},
				"brand-red": {
					DEFAULT: "#FE938C",
					50: "#FFFFFF",
					100: "#FFFFFF",
					200: "#FFFFFF",
					300: "#FFDFDD",
					400: "#FEB9B4",
					500: "#FE938C",
					600: "#FE5F54",
					700: "#FD2B1D",
					800: "#E01002",
					900: "#A80C01",
					950: "#5b0701",
				},
			},
			animation: {
				"fade-in": "fade-in 1s linear forwards",
				"fade-in-up": "fade-in-up 0.5s linear forwards",
				appear: "fade-in 1s steps(1, start) forwards",
				blink: "fade-in-out 1s steps(1, start) infinite",
			},
			keyframes: {
				"fade-in": {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				"fade-in-out": {
					"0%": { opacity: "0" },
					"50%": { opacity: "1" },
					"100%": { opacity: "0" },
				},
				"fade-in-up": {
					"0%": { opacity: "0", transform: "translateY(1rem)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
			},

			typography: ({ theme }) => ({
				brand: {
					css: {
						"--tw-prose-body": theme("colors.brand-white[50]"),
						"--tw-prose-headings": theme("colors.brand-white[50]"),
						"--tw-prose-lead": theme("colors.brand-gray[300]"),
						"--tw-prose-links": theme("colors.brand-blue[500]"),
						"--tw-prose-bold": theme("colors.brand-white[50]"),
						"--tw-prose-counters": theme("colors.brand-white[50]"),
						"--tw-prose-bullets": theme("colors.brand-gray[400]"),
						"--tw-prose-hr": theme("colors.brand-gray[600]"),
						"--tw-prose-quotes": theme("colors.brand-white[50]"),
						"--tw-prose-quote-borders": theme("colors.brand-blue[500]"),
						"--tw-prose-captions": theme("colors.brand-white[50]"),
						"--tw-prose-code": theme("colors.brand-purple[400]"),
						"--tw-prose-pre-code": theme("colors.brand-white[50]"),
						"--tw-prose-pre-bg": theme("colors.brand-gray[700]"),
						"--tw-prose-th-borders": theme("colors.brand-blue[400]"),
						"--tw-prose-td-borders": theme("colors.brand-gray[400]"),
					},
				},
			}),
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
