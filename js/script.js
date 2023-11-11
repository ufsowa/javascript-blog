'use strict';

/********************************************/
/***************  Global variables *****************/

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagSelector = '.post-tags .list';

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

function generateTitleLinks(customSelector = ''){
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  /* for each article */
  let html = '';
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
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

function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for ( let article of articles) {
    /* find tags wrapper */
    const tagWrapper = article.querySelector(optArticleTagSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    /* split tags into array */
    const tags = articleTags.split(' ');
    /* START LOOP: for each tag */
    for ( let tag of tags) {
      /* generate HTML of the link */
      const tagLink = '<li><a href=#tag-' + tag + '><span>' + tag + '</span></a></li>';
      /* add generated code to html variable */
      html = html + tagLink;
    } /* END LOOP: for each tag */
    /* insert HTML of all the links into the tags wrapper */
    console.log('tags:', html);
    tagWrapper.innerHTML = html;
  } /* END LOOP: for every article: */
}

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = this.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log('clicked tag:', clickedElement, href, tag);
  /* find all tag links with class active */
  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for( let tagLink of tagLinks){
    /* remove class active */
    tagLink.classList.remove('active');
  }/* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  const selectedTagLinks = document.querySelectorAll('a[href="'+ href +'"]');
  console.log('selected tags: ', selectedTagLinks);
  /* START LOOP: for each found tag link */
  for( let selectedTagLink of selectedTagLinks){
    /* add class active */
    selectedTagLink.classList.add('active');
  }/* END LOOP: for each found tag link */
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll(optArticleTagSelector + ' a');
  /* START LOOP: for each link */
  for ( let tagLink of tagLinks ) {
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
  }/* END LOOP: for each link */
}

/********************************************/
/***************  Main *****************/
    
generateTitleLinks();

generateTags();

addClickListenersToTags();


