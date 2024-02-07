import { client } from '@/sanity/lib/client';
import Container from '../components/Container';
import BlogListItem from '../components/BlogList';

export default async function Blog() {
  const posts = await getBlogPosts();

  return (
    <Container className='flex flex-col gap-8 bg-primary-200'>
      <p className='text-4xl'>My Blog</p>
      <div className='flex flex-col gap-4'>
        {posts.map((post) => (
            <BlogListItem key={post.slug} post={post}/>
        ))}
      </div>
    </Container>
  );
}

async function getBlogPosts() {
  const query = `*[_type == 'blogPost'] | order(date desc) {
    title,
    description,
    date,
    'slug':slug.current,
    image
  }`;

  const posts = await client.fetch(query);
  return posts;
}
