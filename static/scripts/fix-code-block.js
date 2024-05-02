(function() {
    const targets = Array.prototype.slice.call(document.querySelectorAll('pre'));
    const main = document.querySelector('#main');

    const footer = document.querySelector('#footer');
    const pageTitle = document.querySelector('#page-title');
    let pageTitleHeight = 0;

    const footerHeight = footer.getBoundingClientRect().height;

    if (pageTitle) {
        pageTitleHeight = pageTitle.getBoundingClientRect().height;

        // Adding margin (Outer height)
        pageTitleHeight += 45;
    }

    // subtracted 20 for extra padding.
    const divMaxHeight = window.innerHeight - pageTitleHeight - footerHeight - 80;

    setTimeout(() => {
        targets.forEach(item => {
            const { innerHTML } = item;
            const divElement = document.createElement('div');

            divElement.style.maxHeight = `${divMaxHeight}px`;
            divElement.style.marginTop = '2rem';
            divElement.innerHTML = innerHTML;
            item.innerHTML = '';
            item.appendChild(divElement);
        });

        main.style.minHeight = `${window.innerHeight - footerHeight - 15}px`;

        // See if we have to move something into view
        const [, location] = window.location.href.split('#');

        if (location && location.length > 0) {
          try {
            const element = document.querySelector('#'.concat(location));

            element.scrollIntoView();
          } catch (_) {}
        }
    }, 300);
}());
