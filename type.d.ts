// STORY
type Link = {
  name: string;
  pid: string;
};

type Passage = {
  text: string[];
  links?: Link[];
  name: string;
  pid: string;
};

type Story = {
  passages: Passage[];
  startnode: string;
  name: string;
  creator: string;
};
