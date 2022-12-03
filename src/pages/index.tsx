import { type NextPage } from 'next';

import { signIn, signOut, useSession } from 'next-auth/react';
import CommunityList from '../components/CommunityList';
import CreateCommunity from '../components/CreateCommunity';
import CreatePost from '../components/CreatePost';
import Timeline from '../components/Timeline';

import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
  const { data: sessionData } = useSession();

  // const nonSubscribedCommunities =
  //   trpc.community.getNonSubscribedCommunities.useQuery();

  return (
    <div className="flex gap-24">
      <div>
        <h1>oi</h1>
        <button
          className="bg-red-500"
          onClick={sessionData ? () => signOut() : () => signIn()}
        >
          {sessionData ? 'Sign out' : 'Sign in 5'}
        </button>
        <CreatePost />
        <CreateCommunity />
        <Timeline />
      </div>
      <div>
        <CommunityList />
      </div>
    </div>
  );
};

export default Home;
