import { Skill, Work } from "../../../types";
import body from "./body.md?raw";

const description =
  "Design and implementation of a demo e-commerce platform for GoodGoodsCAN.";

const GoodGoods: Work = {
  id: "goodgoods",
  title: "GoodGoods",
  date: {
    month: 7,
    year: 2020,
  },
  description: description,
  body: body,
  skills: [Skill.vue, Skill.javascript, Skill.firebase],
  coverImage: `/assets/images/works/goodgoods/cover/`,
  images: [],
  demo: "https://nuxt--good-goods.netlify.app/"
};

export default GoodGoods;
