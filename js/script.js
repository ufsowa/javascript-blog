'use strict';

const titleClickHandler = function(event) {
    console.log('link clicked: ', event);

    // remove class active from all links
    const activeLinks = document.querySelectorAll('.titles a.active');
    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }
    // add class active to the clicked link

    // remove class active from all articles
    const activeArticles = document.querySelectorAll('.posts article.active')
    for(let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }
    // get href attribute from clicked link

    // find the correct article using selector by id

    // add class active to the target article

}

const links = document.querySelectorAll('.titles a');

for (let link of links) {
    link.addEventListener('click', titleClickHandler);
}

