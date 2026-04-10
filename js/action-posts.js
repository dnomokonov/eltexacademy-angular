const LOCAL_STORAGE_KEY = 'blog_post';

export function loadPosts() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
}

export function savePost(data) {
  const posts = loadPosts();
  localStorage.removeItem(LOCAL_STORAGE_KEY);
  posts.unshift(data);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts));
}

export function deletePost(postId) {
  let posts = loadPosts();
  localStorage.removeItem(LOCAL_STORAGE_KEY);
  posts = posts.filter((post) => post.id !== postId);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts));
}

export function isEmptyPosts() {
  const posts = loadPosts();
  return posts.length === 0;
}
