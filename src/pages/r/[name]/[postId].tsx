import { useRouter } from 'next/router';
import PostPage from '../../../components/PostPage';
import { trpc } from '../../../utils/trpc';

const RedditPost = () => <PostPage />;

export default RedditPost;
