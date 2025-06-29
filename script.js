document.addEventListener('DOMContentLoaded', () => {
    const headerTitle = document.querySelector('header h1');

    headerTitle.addEventListener('click', () => {
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        headerTitle.style.color = randomColor;
    });

    console.log("Il blog è pronto!");
});