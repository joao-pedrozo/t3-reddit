import { trpc } from '../utils/trpc';

const Timeline = () => {
  const timeline = trpc.post.timeline.useQuery();

  return (
    <div>
      <h1>Timeline</h1>
      {timeline.data &&
        timeline.data.map((post) => (
          <div key={post.id}>
            <h1>Nome: {post.title}</h1>
            <p>Content: {post.content}</p>
          </div>
        ))}
    </div>
  );
};

export default Timeline;
