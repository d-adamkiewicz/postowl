import { getPosts } from '$lib/api';

export async function load({ locals, url }) {
  const q = url.searchParams.get('q') || '';
  const f = url.searchParams.get('f') || '';
  const posts = await getPosts(locals.currentUser, q, f);
	console.log(`src/routes/+page.server.js: ${locals.currentUser?.name}`);

  return {
    posts,
    searchQuery: q,
    searchFilter: f,
    ...locals
  };
}
