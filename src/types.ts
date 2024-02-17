export interface Content {
  id: string;
  title?: string;
}

export interface Work extends Content {
  /** Title of the work */
  title: string;
  /** Date work was done */
  date: { month: number; year: number };
  /** Description of work */
  description: string;
  /** Body text of work. Markdown or plain text */
  body: string;
  /** Cover image for the work */
  coverImage: string;
  /** Array of paths to images of work */
  images: string[];
  /** Skills used in work */
  skills: Skill[];
}

export enum Skill {
  javascript,
  react,
  vue,
  node,
  firebase,
  ruby,
  tailwind,
}
