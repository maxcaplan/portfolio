import { Skill, Work } from "../../../types";
import description from "./description.md?raw";

const TestWork: Work = {
  title: "Test",
  date: {
    month: 6,
    year: 2023,
  },
  description: description,
  skills: [Skill.javascript, Skill.react],
  image: `https://picsum.photos/seed/1/1920/1080`,
};

export default TestWork;
