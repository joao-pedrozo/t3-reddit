import { useRouter } from 'next/router';
import { trpc } from '../utils/trpc';

const PostPage = () => {
  const router = useRouter();
  const { postId } = router.query;

  const post = trpc.post.findPostById.useQuery(
    {
      id: postId as string,
    },
    {
      onSuccess: (data) => {
        if (!data) {
          router.push('/404');
        }
      },
    }
  );

  return (
    <div>
      <h1>Reddit post #{postId}</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </div>
  );
};

export default PostPage;
