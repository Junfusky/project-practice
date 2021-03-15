const toggle = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggle-icon');
const pic1 = document.getElementById('img1');
const pic2 = document.getElementById('img2');
const pic3 = document.getElementById('img3');

//change image mode
function picMode(theme) {
    pic1.src = `img/undraw_proud_coder_${theme}.svg`;
    pic2.src = `img/undraw_feeling_proud_${theme}.svg`;
    pic3.src = `img/undraw_conceptual_idea_${theme}.svg`;
}

// theme style
function darkMode() {
    nav.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    toggleIcon.children[0].textContent = 'Dark';
    toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon');
    picMode('dark');
}

function lightMode() {
    nav.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    toggleIcon.children[0].textcontent = 'Light';
    toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');
    picMode('light');
}

// switch
function switchTheme(e) {
    if(e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark'); //documentElement is root element (html)
        darkMode();
    }else {
        document.documentElement.setAttribute('data-theme', 'light');
        lightMode();
    }

}

toggle.addEventListener('change', switchTheme);

// local storage
const currentTheme = localStorage.getItem('theme');
if(currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if(currentTheme === 'dark') {
        toggle.checked = true;
        darkMode();
    };
}
