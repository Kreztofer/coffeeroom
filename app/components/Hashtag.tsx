import { Dispatch, SetStateAction } from 'react';

interface HashTagProps {
  setHashTag: Dispatch<SetStateAction<string>>;
}

const Hashtag: React.FC<HashTagProps> = ({ setHashTag }) => {
  return (
    <div className="w-full h-[40px] px-3 mt-2 bg-[#F3F4F6]">
      <input
        className="hash h-full"
        placeholder="Add a Hashtag"
        type="text"
        onChange={(e) => setHashTag(e.target.value)}
      />
    </div>
  );
};

export default Hashtag;
