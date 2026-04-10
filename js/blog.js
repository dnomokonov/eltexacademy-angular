import { getCurrentDate } from './utils.js';
import {deletePost, isEmptyPosts, loadPosts, savePost} from "./action-posts.js";

const COUNT_SHOW_PAGINATION = 7;
let visibleCount = COUNT_SHOW_PAGINATION;

const addPostBtn = document.querySelector('#addPostBtn');
const showStatBtn = document.querySelector('#showStatBtn');

const postSection = document.querySelector('.add-post-section');
const postForm = postSection.querySelector('#addPostForm');
const formTitleInput = postForm.querySelector('#titleBlock');
const formTextArea = postForm.querySelector('#textPost');

const dialogStats = document.querySelector('#statsDialog');
const countPosts = dialogStats.querySelector('#countPost');

const emptyStateBlock = document.querySelector('.empty-state');
const paginationPosts = document.querySelector('#pagination');
const nextButton = paginationPosts.querySelector('#morePostButton');

const postsGrid = document.querySelector('.posts-grid');
const postTemplate = document.querySelector('#post-template').content;

function updateEmptyState() {
  const hasPosts = isEmptyPosts();
  emptyStateBlock.style.display = hasPosts ? 'flex' : 'none';
}

function showPagination() {
  const post = loadPosts();
  if (post.length > visibleCount) {
    paginationPosts.style.display = 'flex';
  } else {
    paginationPosts.style.display = 'none';
  }
}

function createElementPost(data) {
  if (!postTemplate) return;

  const postClone = postTemplate.cloneNode(true);

  const article = postClone.querySelector('.post-card');
  const titlePost = postClone.querySelector('.title');
  const descPost = postClone.querySelector('.desc');
  const datePost = postClone.querySelector('.date');
  const imagePost = postClone.querySelector('img');

  if (data.id) {
    article.dataset.id = data.id;
  }

  titlePost.textContent = data.title;
  descPost.textContent = data.text;
  datePost.textContent = data.dateStr;
  datePost.setAttribute('datetime', data.datetime);
  imagePost.src = data.image;

  return postClone;
}

function renderPost(data, prepend = true) {
  const el = createElementPost(data);
  if (prepend) {
    postsGrid.prepend(el);
  } else {
    postsGrid.append(el);
  }
}

function initPosts() {
  const posts = loadPosts();
  postsGrid.innerHTML = '';

  const postsToShow = posts.slice(0, visibleCount);
  postsToShow.forEach(post => renderPost(post, false));

  updateEmptyState();
  showPagination();
}

addPostBtn.addEventListener('click', () => {
  postSection.classList.toggle('open');
});

postForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = formTitleInput.value;
  const text = formTextArea.value;
  const { dateStr, datetime } = getCurrentDate();

  const data = {
    id: Date.now().toString(),
    title,
    text,
    image: 'assets/photos/default_photo.png',
    dateStr,
    datetime,
  };

  savePost(data);
  visibleCount = COUNT_SHOW_PAGINATION;
  initPosts();

  postSection.classList.remove('open');
  postForm.reset();
});

postForm.addEventListener('reset', () => {
  postSection.classList.remove('open');
});

function updateStats() {
  const totalPosts = document.querySelectorAll('.blog-content article').length;
  countPosts.textContent = `${totalPosts}`;
}

showStatBtn.addEventListener('click', () => {
  updateStats();
  dialogStats.showModal();
})

postsGrid.addEventListener('click', (evt) => {
  const deletePostBtn = evt.target.closest('.btn-delete-post');

  if (deletePostBtn) {
    const postCard = deletePostBtn.closest('.post-card');
    const postId = postCard.dataset.id;

    if (postId) {
      deletePost(postId);
      postCard.remove();
    }

    initPosts();
  }
})

nextButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  const posts = loadPosts();
  const currentCount = visibleCount;

  visibleCount += COUNT_SHOW_PAGINATION;

  const newPostsToShow = posts.slice(currentCount, visibleCount);
  newPostsToShow.forEach(post => renderPost(post, false));
  showPagination();
});

initPosts();
