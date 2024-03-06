export function fetchPosts(page) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `http://localhost:3000/posts?_limit=9&_page=${page}`
    );
    const data = await response.json();
    resolve({ data });
  });
}
