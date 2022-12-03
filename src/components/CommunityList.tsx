import Link from 'next/link';
import { trpc } from '../utils/trpc';

const CommunityList = () => {
  const userSession = trpc.auth.getSession.useQuery();

  const communities = trpc.community.getAllCommunities.useQuery();

  const subscribeToCommunity = trpc.community.subscribeToCommunity.useMutation({
    onSuccess: () => {
      communities.refetch();
    },
  });

  const onSubscribeButtonClick = async (id: string) => {
    subscribeToCommunity.mutate({ communityId: id });
  };

  return (
    <div className="flex flex-col gap-6">
      {communities.data &&
        communities.data.map((community) => (
          <div key={community.id} className="flex gap-9">
            <Link href={`/r/${community.name}`}>
              <h1>{community.name}</h1>
              <p>{community.description}</p>
            </Link>
            {community.members.some(
              (community) => community.id === userSession.data?.user?.id
            ) && (
              <button
                className="bg-blue-600 p-4 text-white"
                onClick={() => onSubscribeButtonClick(community.id)}
              >
                Subscribe
              </button>
            )}
          </div>
        ))}
    </div>
  );
};

export default CommunityList;
