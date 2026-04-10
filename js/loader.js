export function createLoader() {
  const loader = document.createElement('div');
  loader.className = 'posts-loader';
  loader.innerHTML = `
    <span class="posts-loader__dot"></span>
    <span class="posts-loader__dot"></span>
    <span class="posts-loader__dot"></span>
  `;
  return loader;
}

export function showLoader(postsGrid, emptyStateBlock, paginationPosts) {
  postsGrid.innerHTML = '';
  emptyStateBlock.style.display = 'none';
  paginationPosts.style.display = 'none';

  const loader = createLoader();
  postsGrid.parentElement.insertBefore(loader, postsGrid);
}

export function hideLoader() {
  const loader = document.querySelector('.posts-loader');
  if (loader) loader.remove();
}

export function showFormSubmitting(submitBtn) {
  submitBtn.value = 'Отправка...';
  submitBtn.classList.add('btn-submitting');
}

export function hideFormSubmitting(submitBtn, originalValue) {
  submitBtn.value = originalValue;
  submitBtn.classList.remove('btn-submitting');
}
