export type Package = {
  id: number;
  name: string;
  code: string;
  type: 'Question Bank' | 'Practice Test';
};

export type PackagesState = {
  data: Package[];
};
