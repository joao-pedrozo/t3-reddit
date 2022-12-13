import { type NextPage } from 'next';

import { useSession } from 'next-auth/react';
import { type ChangeEvent, useEffect, useState } from 'react';

import Select, { type StylesConfig } from 'react-select';
import TitleInput from '../components/TitleInput';

import { trpc } from '../utils/trpc';

interface SelectOptionType {
  label: string;
  options: Array<OptionType>;
}

interface OptionType {
  value: string;
  label: string;
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
        backgroundColor: 'gray',
      },
      cursor: 'pointer',
    };
  },
};

const SubmitPage: NextPage = () => {
  const [communitiesOptions, setCommunitiesOptions] = useState<
    SelectOptionType[]
  >([]);

  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

  const [title, setTitle] = useState('');

  const [text, setText] = useState('');

  const { data: sessionData } = useSession();

  const communities = trpc.community.getSubscribedCommunities.useQuery();

  const createPost = trpc.post.createPost.useMutation();

  useEffect(() => {
    if (communities.data && sessionData?.user?.name) {
      const communitiesOptions = communities.data.map((community) => ({
        label: `r/${community.name}`,
        value: community.id,
      }));

      setCommunitiesOptions([
        {
          label: 'Your profile',
          options: [
            {
              value: sessionData?.user?.name,
              label: `u/${sessionData?.user?.name}`,
            },
          ],
        },
        {
          label: 'Your communities',
          options: communitiesOptions,
        },
      ]);
    }
  }, [communities.data]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const onSelectChange = (option: unknown) => {
    setSelectedOption(option as OptionType);
  };

  const isButtonDisabled = !title || !text || !selectedOption;

  const onPostButtonClick = () => {
    if (isButtonDisabled) {
      return;
    }

    const isPostForCommunity = selectedOption.label.startsWith('r/');

    createPost.mutate({
      title,
      content: text,
      communityId: isPostForCommunity ? selectedOption.value : undefined,
    });
  };

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
            isDisabled={communities.isLoading || !sessionData?.user}
            onChange={onSelectChange}
          />
          <div className="flex w-full flex-col gap-3 bg-[#1A1A1B] p-4">
            <TitleInput onChange={handleInputChange} value={title} />
            <textarea
              className="min-h-[150px] w-full rounded-md border border-white border-opacity-25 bg-transparent p-2 text-white"
              placeholder="Text"
              onChange={handleTextAreaChange}
              value={text}
            />
            <hr className="my-2 border-white border-opacity-25" />
            <div className="flex w-full justify-end">
              <button
                disabled={isButtonDisabled}
                className="rounded-2xl bg-gray-200 px-4 py-2 font-bold text-black transition-opacity disabled:cursor-not-allowed disabled:opacity-20"
                onClick={onPostButtonClick}
              >
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
