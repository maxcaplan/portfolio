import { Skill, Work } from "../../../types";
import description from "./description.md?raw";

const GoodGoods: Work = {
  title: "GoodGoods",
  date: {
    month: 7,
    year: 2020,
  },
  description: description,
  skills: [Skill.vue, Skill.javascript, Skill.firebase],
  image: `/assets/images/works/goodgoods/goodgoods_cover.webp`,
};

export default GoodGoods;
