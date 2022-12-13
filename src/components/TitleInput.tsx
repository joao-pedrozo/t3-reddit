import { type HTMLAttributes } from 'react';

type TitleInputProps = HTMLAttributes<HTMLInputElement> & {
  value: string;
};

const TitleInput = (props: TitleInputProps) => (
  <input
    type="text"
    className="w-full rounded-md border border-white border-opacity-25 bg-transparent bg-[#1A1A1B] p-2 text-white"
    placeholder="Title"
    {...props}
  />
);

export default TitleInput;
