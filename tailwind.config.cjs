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
			},
			typography(theme) {
				return {
					DEFAULT: {
						css: {
							'code::before': {
								content: 'none' // don’t generate the pseudo-element
								//                content: '""', // this is an alternative: generate pseudo element using an empty string
							},
							'code::after': {
								content: 'none'
							},
							code: {
								color: theme('colors.gray.300'),
								backgroundColor: theme('colors.gray.700'),
								borderRadius: theme('borderRadius.DEFAULT'),
								paddingLeft: theme('spacing[1.5]'),
								paddingRight: theme('spacing[1.5]'),
								paddingTop: theme('spacing.1'),
								paddingBottom: theme('spacing.1')
							}
						}
					}
				};
			}
		}
	},
	plugins: [require('@tailwindcss/aspect-ratio'), require('@tailwindcss/typography')]
};
