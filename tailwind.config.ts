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
        keyframes: {
            bounce: {
                '0%, 100%': {
                    transform: 'translateY(-35%)',
                    'animation-timing-function': 'cubic-bezier(0.8,0,1,1)',
                },
                '50%': {
                    transform: 'none',
                    'animation-timing-function': 'cubic-bezier(0,0,0.2,1)',
                },
            },
        },
        extend: {
            backgroundImage: {
                main: 'linear-gradient(108deg, rgba(255, 228, 157, 0.21) -12.78%, #FFFBF0 19.6%, #F3F8FF 102.97%)',
                finish: 'linear-gradient(108deg, #FFE49D -12.78%, #FFFBF0 19.6%, #F3F8FF 102.97%)',
            },
            zIndex: {
                '50': '50', // Header
                '51': '51', // ProfileModal
            },
            fontSize: {
                // heading - bold
                heading1: ['56px', { fontWeight: '700', lineHeight: '66px' }],
                heading2: ['36px', { fontWeight: '700', lineHeight: '46px' }],
                heading3: ['24px', { fontWeight: '700', lineHeight: '34px' }],
                heading4: ['22px', { fontWeight: '700', lineHeight: '28px' }],
                heading5: ['18px', { fontWeight: '700', lineHeight: '24px' }],
                heading6: ['16px', { fontWeight: '700', lineHeight: '22px' }],
                // special heading
                specialHeading: [
                    '28px',
                    { fontWeight: '700', lineHeight: '38px' },
                ],
                specialHeading2: [
                    '22px',
                    { fontWeight: '600', lineHeight: '40px' },
                ],
                specialHeading3: [
                    '18px',
                    { fontWeight: '700', lineHeight: '18px' },
                ],
                specialHeading4: [
                    '12px',
                    { fontWeight: '700', lineHeight: '14px' },
                ],
                specialHeading5: [
                    '30px',
                    { fontWeight: '500', lineHeight: '45px' },
                ],
                // body - regular
                bodyLarge: ['22px', { fontWeight: '400', lineHeight: '36px' }],
                bodyLarger: ['24px', { fontWeight: '400', lineHeight: '46px' }],
                bodyDefault: [
                    '18px',
                    { fontWeight: '400', lineHeight: '30px' },
                ],
                bodySmall: ['16px', { fontWeight: '400', lineHeight: '28px' }],
                bodySmaller: [
                    '14px',
                    { fontWeight: '400', lineHeight: '24px' },
                ],
                bodyExtraSmaller: [
                    '10px',
                    { fontWeight: '600', lineHeight: '25px' },
                ],
                bodyExtraLarge: [
                    '36x',
                    { fontWeight: '400', lineHeight: '46px' },
                ],
                bodyTextarea: [
                    '20px',
                    { fontWeight: '500', lineHeight: '52px' },
                ],
                // input
                input: ['16px', { fontWeight: '400', lineHeight: '18px' }],
                // button
                buttonBlock: [
                    '18px',
                    { fontWeight: '700', lineHeight: '18px' },
                ],
                buttonRound: [
                    '16px',
                    { fontWeight: '700', lineHeight: '18px' },
                ],
                buttonChip: ['12px', { fontWeight: '700', lineHeight: '14px' }],
                // header
                header: ['30px', { fontWeight: '800' }],
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
            boxShadow: {
                header: '0px 2px 6px 0px rgba(20, 20, 43, 0.06)',
                buttonColor2: '0px 6px 20px rgba(74, 58, 255, 0.08)',
                4: '0px 14px 42px 0px rgba(20, 20, 43, 0.14)',
                3: '0px 8px 28px 0px rgba(20, 20, 43, 0.10)',
                2: '0px 2px 12px 0px rgba(20, 20, 43, 0.08)',
            },
            animation: {
                bounce: 'bounce 3.5s infinite',
            },
        },
    },
    plugins: [],
};
export default config;
