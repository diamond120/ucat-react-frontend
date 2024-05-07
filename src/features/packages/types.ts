export type Package = {
  id: number;
  name: string;
  type: 'Question Bank' | 'Practice Test';
};

export type PackagesState = {
  data: Package[];
};
