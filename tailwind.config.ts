/**
 * 다른 tailwind default color palette 사용 시 참고
 * https://tailwindcss.com/docs/customizing-colors#default-color-palette
 */

import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            fontFamily: {
                // sans: ['var(--default-font)'],
                // sans: 'AppleSDGothicNeo',
                // logo: ['var(--logo-font)'],
            },
            colors: {
                black: '#444449',
                white: '#ffffff',
                blue: {
                    primary: '#4282ff',
                    3: '#a9c6ff',
                    2: '#d7e5ff',
                    1: '#f2f7ff',
                },
                yellow: {
                    sub: '#ffd363',
                    3: '#ffe49d',
                    2: '#fff2cf',
                    1: '#fffbf0',
                },
                grey: {
                    6: '#72717a',
                    5: '#a9a8b7',
                    4: '#cbcad7',
                    3: '#deddeb',
                    2: '#ecebf3',
                    1: '#f4f3f6',
                },
                green: {
                    4: '#38dc8d',
                    3: '#7ff0ba',
                    2: '#ccf5e1',
                    1: '#e7fbf1',
                },
                red: { 4: '#ff3c5f', 3: '#ffaebd', 2: '#ffe5ec', 1: '#fff4f5' },
            },
        },
    },
    plugins: [],
};
export default config;
