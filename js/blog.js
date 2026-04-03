import { getCurrentDate } from './utils.js';

const addPostBtn = document.querySelector('#addPostBtn');
const showStatBtn = document.querySelector('#showStatBtn');

const postSection = document.querySelector('.add-post-section');
const postForm = postSection.querySelector('#addPostForm');
const formTitleInput = postForm.querySelector('#titleBlock');
const formTextArea = postForm.querySelector('#textPost');

const dialogStats = document.querySelector('#statsDialog');
const countPosts = dialogStats.querySelector('#countPost');

const postsGrid = document.querySelector('.posts-grid');
const postTemplate = document.querySelector('#post-template').content;

function renderPost(data) {
  if (!postTemplate) return;

  const postClone = postTemplate.cloneNode(true);

  const titlePost = postClone.querySelector('.title');
  const datePost = postClone.querySelector('.date');
  const imagePost = postClone.querySelector('img');


  titlePost.textContent = data.title;
  datePost.textContent = data.dateStr;
  datePost.setAttribute('datetime', data.datetime);
  imagePost.src = data.image;

  postsGrid.prepend(postClone);
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
    title,
    text,
    image: 'assets/photos/default_photo.png',
    dateStr,
    datetime,
  };

  renderPost(data);

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
