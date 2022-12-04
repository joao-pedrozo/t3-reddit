import { type NextPage } from 'next';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Select, { type StylesConfig } from 'react-select';

import { trpc } from '../utils/trpc';

interface SelectOption {
  label: string;
  options: Array<{ label: string; value: string }>;
}

const selectStyles: StylesConfig = {
  control: (styles) => ({
    ...styles,
    backgroundColor: '#1A1A1B',
    color: '#fff',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxShadow: 'none',
  }),
  container: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: 'red',
    };
  },
  singleValue: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: '#fff',
      backgroundColor: '#1A1A1B',
    };
  },
  menuList: (defaultStyles) => {
    return {
      ...defaultStyles,
      backgroundColor: '#1A1A1B',
    };
  },
  option: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: '#fff',
      backgroundColor: '#1A1A1B',
      '&:hover': {
        borderColor: 'red',
      },
    };
  },
};

const SubmitPage: NextPage = () => {
  const [communitiesOptions, setCommunitiesOptions] = useState<SelectOption[]>(
    []
  );

  const { data: sessionData } = useSession();

  // const createPost = trpc.post.createPost.useMutation({
  //   onSuccess: (asd) => {},
  // });

  const communities = trpc.community.getSubscribedCommunities.useQuery();

  useEffect(() => {
    if (communities.data) {
      const communitiesOptions = communities.data.map((community) => ({
        label: `/r/${community.name}`,
        value: community.id,
      }));

      setCommunitiesOptions([
        {
          label: 'Your profile',
          options: [
            { value: 'chocolate', label: `u/${sessionData?.user?.name}` },
          ],
        },
        {
          label: 'Your communities',
          options: communitiesOptions,
        },
      ]);
    }
  }, [communities.data]);

  return (
    <div className="h-full min-h-screen bg-black">
      <div className="h-12 w-full bg-gray-700"></div>
      <div className="flex w-full justify-center gap-24">
        <div className="w-full max-w-xl">
          <h1 className="mt-8 mb-4 text-xl font-semibold text-gray-200">
            Create a post
          </h1>
          <hr className="mb-6" />
          <Select
            options={communitiesOptions}
            className="mb-6"
            styles={selectStyles}
            isLoading={communities.isLoading}
            placeholder="Select a community"
            isDisabled={communities.isLoading}
          />
          <div className="flex w-full flex-col gap-3 bg-gray-700 p-4">
            <input
              type="text"
              className="w-full rounded-md border border-white border-opacity-25 bg-transparent p-2"
              placeholder="Title"
            />
            <textarea
              className="min-h-[150px] w-full rounded-md border border-white border-opacity-25 bg-transparent p-2"
              placeholder="Text"
            />
            <hr className="my-2 border-white border-opacity-25" />
            <div className="flex w-full justify-end">
              <button className="rounded-2xl bg-gray-200 px-4 py-2 font-bold text-black">
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitPage;
