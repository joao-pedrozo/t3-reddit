import { type NextPage } from 'next';

import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import CommunityList from '../components/CommunityList';
import CreateCommunity from '../components/CreateCommunity';
import CreatePost from '../components/CreatePost';
import Timeline from '../components/Timeline';

import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
  const { data: sessionData } = useSession();

  const router = useRouter();

  // const nonSubscribedCommunities =
  //   trpc.community.getNonSubscribedCommunities.useQuery();

  return (
    <>
      <div className="h-12 w-full bg-gray-700"></div>
      <div className="flex w-full justify-center gap-24">
        <div className="w-full max-w-xl">
          <button
            className="bg-red-500"
            onClick={sessionData ? () => signOut() : () => signIn()}
          >
            {sessionData ? 'Sign out' : 'Sign in 5'}
          </button>
          <div className="flex w-full gap-3 bg-red-100 p-4">
            {sessionData?.user && sessionData?.user.image && (
              <Image
                src={sessionData.user.image}
                width={50}
                height={50}
                alt="Imagem do usuário"
                className="rounded-full"
              />
            )}
            <input
              type="text"
              className="w-full border-4 bg-transparent p-2"
              placeholder="Create a post"
              onFocus={() => router.push('/submit')}
            />
          </div>
          {/* <CreatePost />
        <CreateCommunity /> */}
          <Timeline />
        </div>
        <div>
          <CommunityList />
        </div>
      </div>
    </>
  );
};

export default Home;
