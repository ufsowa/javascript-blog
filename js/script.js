'use strict';

/***************************************************/
/***************  Global variables *****************/

const opt = {
  
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagSelector = '.post-tags .list',
  optTagsListSelector = '.tags.list',
  optArticleAuthorSelector = '.post-author',
  optAuthorsListSelector = '.authors.list';

const optCloudClasCount = 5,
  optCloudClassPrefix = 'tag-size-';

/********************************************/
/*************  Callback handlers ***********/

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
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
  //console.log('selected tags: ', selectedTagLinks);
  /* START LOOP: for each found tag link */
  for( let selectedTagLink of selectedTagLinks){
    /* add class active */
    selectedTagLink.classList.add('active');
  }/* END LOOP: for each found tag link */
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

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

function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  // reset active links
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  for ( let activeAuthorLink of activeAuthorLinks ){
    activeAuthorLink.classList.remove('active');
  }
  // get author
  const href = clickedElement.getAttribute('href');
  const selectedAuthorId = href.replace('#author-', '');
  const selectedAuthor = selectedAuthorId.replace('-', ' ');
  //console.log('clicked author: ', selectedAuthor);
  // set links active  
  const authorLinks = document.querySelectorAll('a[href="'+ href +'"]');
  for ( let selectedLink of authorLinks) {
    selectedLink.classList.add('active');
  }
  // filter out author's articles
  generateTitleLinks('[data-author="'+ selectedAuthor +'"]');
}

/********************************************/
/***************  Functions *****************/

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
    //console.log(linkHTML);
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

function calculateTagsParams(allTags) {
  const tagCount = [];
  for (let tag in allTags) {
    tagCount.push(allTags[tag]);
  }
  console.log(tagCount);
  return { 
    'max': Math.max(...tagCount),
    'min': Math.min(...tagCount)
  };
}

function generateTagClass(count, params) {
  let lenght = params.max - params.min;
  let binSize = lenght / (optCloudClasCount - 1);
  let binNumber = Math.floor((count - params.min) / binSize) + 1;
  console.log(count, binSize, binNumber);
  
  return '"' + optCloudClassPrefix + binNumber + '"';
}

function generateTags(){
  let allTags = {};
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
      /* check of tag is NOT present in allTags */
      if (!allTags[tag]) {
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    } /* END LOOP: for each tag */
    /* insert HTML of all the links into the tags wrapper */
    //console.log('tags:', html);
    tagWrapper.innerHTML = html;
  } /* END LOOP: for every article: */
  const tagList = document.querySelector(optTagsListSelector);
  console.log(allTags);
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams: ', tagsParams);
  let allTagsHTML = '';
  for ( let tag in allTags) {
    let htmlLink = '<li><a class=' + generateTagClass(allTags[tag], tagsParams) +
                    'href=#tag-' + tag + '><span>' + tag +
                    '</span></a></li>';
    allTagsHTML += htmlLink;
  }
  tagList.innerHTML = allTagsHTML;
}

function getAuthorId(name){
  return name.replace(' ', '-');
}

function generateAuthors(){
  let allAuthors = {};
  const articles = document.querySelectorAll(optArticleSelector);
  for( let article of articles ){
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    const author = article.getAttribute('data-author');
    const authorId = getAuthorId(author);
    let html = '<a href="#author-' + authorId + '"><span> by '+ author +'</span></a>';
    authorWrapper.innerHTML = html;
    if (!allAuthors[author]){
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }
  }
  const authorsList = document.querySelector(optAuthorsListSelector);
  let allAuthorsHTML = '';
  console.log(allAuthors);
  for ( let author in allAuthors) {
    let htmlLink = '<li><a href=#author-' + getAuthorId(author) + '><span>' + author + '  (' + allAuthors[author] + ')'+
                    '</span></a></li>';
    allAuthorsHTML += htmlLink;
  }
  authorsList.innerHTML = allAuthorsHTML;
}

function addClickListenersToTags(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for ( let tagLink of tagLinks ) {
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
  }/* END LOOP: for each link */
}

function addClickListenersToAuthors(){
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');
  for ( let authorLink of authorLinks ) {
    authorLink.addEventListener('click', authorClickHandler);
  }
}

/********************************************/
/******************  Main *******************/
    
generateTitleLinks();

generateTags();

generateAuthors();

addClickListenersToTags();

addClickListenersToAuthors();



