import { Skill, Work } from "../../../types";
import body from "./body.md?raw";

const description = "Site wide performance optimization, improving page speed, user experience, and SEO";

const OnlyOneTreats: Work = {
  id: "onlyonetreats",
  title: "Only One Treats",
  date: {
    month: 11,
    year: 2024,
  },
  description: description,
  body: body,
  skills: [Skill.shopify, Skill.javascript],
  coverImage: `/assets/images/works/only_one_treats/cover/`,
  images: [],
  demo: "https://onlyonetreats.com/"
};

export default OnlyOneTreats;
