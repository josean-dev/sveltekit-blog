/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Poppins', 'sans-serif']
			},
			colors: {
				'gray-900': '#0F161E'
			}
		}
	},
	plugins: [require('@tailwindcss/aspect-ratio'), require('@tailwindcss/typography')]
};
