export interface Work {
  /** Title of the work */
  title: string;
  /** Date work was done */
  date: { month: number; year: number };
  /** Description of work */
  description: string;
  /** Image of work */
  image: string;
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
