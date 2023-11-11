'use strict';

/********************************************/
/***************  Main *****************/

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';
    
generateTitleLinks();

/********************************************/
/***************  Functions *****************/

const titleClickHandler = function(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('link clicked: ', event , clickedElement);
  // remove class active from all links
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  // add class active to the clicked link
  clickedElement.classList.add('active');
  // remove class active from all articles
  const activeArticles = document.querySelectorAll('.posts article.active');
  for(let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }
  // get href attribute from clicked link
  const articleId = clickedElement.getAttribute('href');
  console.log('Article id: ', articleId);
  // find the correct article using selector by id
  const selectedArticle = document.querySelector(articleId);
  // add class active to the target article
  selectedArticle.classList.add('active');
};

function generateTitleLinks(){
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  /* for each article */
  let html = '';
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute('id');
    /* find the title element */
    const articleElement = article.querySelector(optTitleSelector);
    /* get the title from the title element */
    const articleTitle = articleElement.innerHTML;
    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);
    /* insert link into titleList */
    //titleList.insertAdjacentHTML("beforeend", linkHTML);
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
