/** Base type for content objects */
export interface Content {
  id: string;
  title?: string;
}

/** Content for work section and pages */
export interface Work extends Content {
  /** Title of the work */
  title: string;
  /** Date work was done */
  date: { month: number; year: number };
  /** Description of work */
  description: string;
  /** Body text of work. Markdown or plain text */
  body: string;
  /** Root path for cover image for the work */
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
  rust,
}

/** Content for projects section and pages */
export interface Project extends Content {
  /** Title of the project */
  title: string;
  /** Date project was created */
  date: { month: number, year: number };
  /** Description of project */
  description: string;
  /** Body text of project. Markdown or plain text */
  body: string;
  /** Root path for cover images for the project */
  coverImage: string;
  /** Array of paths to images of work */
  images: string[];
  /** Skills used in project */
  skills: Skill[];
}
