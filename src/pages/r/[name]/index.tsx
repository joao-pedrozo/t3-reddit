import { useRouter } from 'next/router';
import CreatePost from '../../../components/CreatePost';
import { trpc } from '../../../utils/trpc';

const CommunityPage = () => {
  const router = useRouter();
  const { name } = router.query;

  const community = trpc.community.findCommunityByName.useQuery({
    name: name as string,
  });

  return (
    <div>
      <h1>Community Page</h1>
      <p>{name}</p>
      {community.data && <CreatePost communityId={community.data.id} />}
    </div>
  );
};

export default CommunityPage;
