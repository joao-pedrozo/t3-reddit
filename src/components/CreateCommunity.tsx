import { trpc } from '../utils/trpc';

const CreateCommunity = () => {
  const createPost = trpc.community.createCommunity.useMutation();

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    await createPost.mutateAsync({ name, description });
  };

  return (
    <form onSubmit={onFormSubmit}>
      <input
        type="text"
        className="border-2 border-red-500"
        placeholder="name"
        id="name"
        name="name"
      />

      <input
        type="text"
        className="border-2 border-red-500"
        placeholder="description"
        id="description"
        name="description"
      />
      <button>Create community</button>
    </form>
  );
};

export default CreateCommunity;
