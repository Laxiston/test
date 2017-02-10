window.WebFontConfig = {
    google: {
        families: ['Roboto:300,400,500,700,900:cyrillic', 'PT+Mono', 'Roboto+Slab']
    },
    active: () => {
        sessionStorage.fonts = true;
    }
};

(function () {
    let wf = document.createElement('script');

    wf.src = ('https:' === document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    let s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
})();
