import { Skill, Work } from "../../../types";
import description from "./description.md?raw";

const ConnorBell: Work = {
  title: "connorbell.ca",
  date: {
    month: 9,
    year: 2022,
  },
  description: description,
  skills: [Skill.ruby, Skill.javascript, Skill.tailwind],
  image: `/assets/images/works/connor_bell/connor_bell_cover.png`,
};

export default ConnorBell;
