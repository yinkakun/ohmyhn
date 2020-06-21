const links = document.querySelectorAll('.js-nav-link');
const mainNavLink = document.querySelector('.js-main-nav-link');

const setActiveLink = () => {
  links.forEach(link => {
    const linkPath = link.getAttribute('href');
    const currentPath = window.location.hash;

    if (linkPath === currentPath) {
      link.classList.add('active');
    }
    if (currentPath === '') {
      mainNavLink.classList.add('active');
    }

    if (linkPath !== currentPath) {
      link.classList.remove('active');
    }
  });
};

export default setActiveLink;
