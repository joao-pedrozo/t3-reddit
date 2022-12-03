import { trpc } from '../utils/trpc';

interface CreatePostProps {
  communityId?: string;
}

const CreatePost = ({ communityId }: CreatePostProps) => {
  const createPost = trpc.post.createPost.useMutation();

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    await createPost.mutateAsync({ title, content, communityId });
  };

  return (
    <form onSubmit={onFormSubmit}>
      <input
        type="text"
        className="border-2 border-red-500"
        placeholder="titlea"
        id="title"
        name="title"
      />

      <input
        type="text"
        className="border-2 border-red-500"
        placeholder="content"
        id="content"
        name="content"
      />
      <button>Create post</button>
    </form>
  );
};

export default CreatePost;
