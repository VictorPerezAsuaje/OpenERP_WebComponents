
module.exports = {
    content: ["./wwwroot/**/*.{html,js,razor,cshtml}", "./**/Views/**/*.{cshtml,razor}"],
    theme: {
        extend: {
            colors: {
                /* Custom */
                transparent: 'transparent',
                current: 'currentColor',
                black: '#000',
                white: '#fff',
                primary: 'var(--oe-global-color-primary)',
                secondary: 'var(--oe-global-color-secondary)'
                
            }
        }
    },
    plugins: []
}

