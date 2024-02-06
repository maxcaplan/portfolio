import { Skill } from "../../../types";
import Tooltip from "../Tooltip";

interface SkillIconProps {
  skill: Skill;
  className?: string;
}

/** Work card skill icon component */
export default function SkillIcon(props: SkillIconProps) {
  interface Icon {
    name: string;
    href?: string;
    element: JSX.Element;
  }

  interface Icons {
    [key: string]: Icon;
  }

  const icons: Icons = {
    [Skill.javascript]: {
      name: "JavaScript",
      element: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20"
          width="17.5"
          viewBox="0 0 448 512"
          className="fill-brand-yellow"
          role="img"
        >
          <title>Javascript</title>
          {/*<!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->*/}
          <path d="M0 32v448h448V32H0zm243.8 349.4c0 43.6-25.6 63.5-62.9 63.5-33.7 0-53.2-17.4-63.2-38.5l34.3-20.7c6.6 11.7 12.6 21.6 27.1 21.6 13.8 0 22.6-5.4 22.6-26.5V237.7h42.1v143.7zm99.6 63.5c-39.1 0-64.4-18.6-76.7-43l34.3-19.8c9 14.7 20.8 25.6 41.5 25.6 17.4 0 28.6-8.7 28.6-20.8 0-14.4-11.4-19.5-30.7-28l-10.5-4.5c-30.4-12.9-50.5-29.2-50.5-63.5 0-31.6 24.1-55.6 61.6-55.6 26.8 0 46 9.3 59.8 33.7L368 290c-7.2-12.9-15-18-27.1-18-12.3 0-20.1 7.8-20.1 18 0 12.6 7.8 17.7 25.9 25.6l10.5 4.5c35.8 15.3 55.9 31 55.9 66.2 0 37.8-29.8 58.6-69.7 58.6z" />
        </svg>
      ),
    },
    [Skill.react]: {
      name: "ReactJS",
      href: "https://react.dev/",
      element: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20"
          width="20"
          viewBox="0 0 512 512"
          className="fill-brand-blue"
          role="img"
        >
          <title>ReactJS</title>
          {/*<!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
          <path d="M418.2 177.2c-5.4-1.8-10.8-3.5-16.2-5.1 .9-3.7 1.7-7.4 2.5-11.1 12.3-59.6 4.2-107.5-23.1-123.3-26.3-15.1-69.2 .6-112.6 38.4-4.3 3.7-8.5 7.6-12.5 11.5-2.7-2.6-5.5-5.2-8.3-7.7-45.5-40.4-91.1-57.4-118.4-41.5-26.2 15.2-34 60.3-23 116.7 1.1 5.6 2.3 11.1 3.7 16.7-6.4 1.8-12.7 3.8-18.6 5.9C38.3 196.2 0 225.4 0 255.6c0 31.2 40.8 62.5 96.3 81.5 4.5 1.5 9 3 13.6 4.3-1.5 6-2.8 11.9-4 18-10.5 55.5-2.3 99.5 23.9 114.6 27 15.6 72.4-.4 116.6-39.1 3.5-3.1 7-6.3 10.5-9.7 4.4 4.3 9 8.4 13.6 12.4 42.8 36.8 85.1 51.7 111.2 36.6 27-15.6 35.8-62.9 24.4-120.5-.9-4.4-1.9-8.9-3-13.5 3.2-.9 6.3-1.9 9.4-2.9 57.7-19.1 99.5-50 99.5-81.7 0-30.3-39.4-59.7-93.8-78.4zM282.9 92.3c37.2-32.4 71.9-45.1 87.7-36 16.9 9.7 23.4 48.9 12.8 100.4-.7 3.4-1.4 6.7-2.3 10-22.2-5-44.7-8.6-67.3-10.6-13-18.6-27.2-36.4-42.6-53.1 3.9-3.7 7.7-7.2 11.7-10.7zM167.2 307.5c5.1 8.7 10.3 17.4 15.8 25.9-15.6-1.7-31.1-4.2-46.4-7.5 4.4-14.4 9.9-29.3 16.3-44.5 4.6 8.8 9.3 17.5 14.3 26.1zm-30.3-120.3c14.4-3.2 29.7-5.8 45.6-7.8-5.3 8.3-10.5 16.8-15.4 25.4-4.9 8.5-9.7 17.2-14.2 26-6.3-14.9-11.6-29.5-16-43.6zm27.4 68.9c6.6-13.8 13.8-27.3 21.4-40.6s15.8-26.2 24.4-38.9c15-1.1 30.3-1.7 45.9-1.7s31 .6 45.9 1.7c8.5 12.6 16.6 25.5 24.3 38.7s14.9 26.7 21.7 40.4c-6.7 13.8-13.9 27.4-21.6 40.8-7.6 13.3-15.7 26.2-24.2 39-14.9 1.1-30.4 1.6-46.1 1.6s-30.9-.5-45.6-1.4c-8.7-12.7-16.9-25.7-24.6-39s-14.8-26.8-21.5-40.6zm180.6 51.2c5.1-8.8 9.9-17.7 14.6-26.7 6.4 14.5 12 29.2 16.9 44.3-15.5 3.5-31.2 6.2-47 8 5.4-8.4 10.5-17 15.5-25.6zm14.4-76.5c-4.7-8.8-9.5-17.6-14.5-26.2-4.9-8.5-10-16.9-15.3-25.2 16.1 2 31.5 4.7 45.9 8-4.6 14.8-10 29.2-16.1 43.4zM256.2 118.3c10.5 11.4 20.4 23.4 29.6 35.8-19.8-.9-39.7-.9-59.5 0 9.8-12.9 19.9-24.9 29.9-35.8zM140.2 57c16.8-9.8 54.1 4.2 93.4 39 2.5 2.2 5 4.6 7.6 7-15.5 16.7-29.8 34.5-42.9 53.1-22.6 2-45 5.5-67.2 10.4-1.3-5.1-2.4-10.3-3.5-15.5-9.4-48.4-3.2-84.9 12.6-94zm-24.5 263.6c-4.2-1.2-8.3-2.5-12.4-3.9-21.3-6.7-45.5-17.3-63-31.2-10.1-7-16.9-17.8-18.8-29.9 0-18.3 31.6-41.7 77.2-57.6 5.7-2 11.5-3.8 17.3-5.5 6.8 21.7 15 43 24.5 63.6-9.6 20.9-17.9 42.5-24.8 64.5zm116.6 98c-16.5 15.1-35.6 27.1-56.4 35.3-11.1 5.3-23.9 5.8-35.3 1.3-15.9-9.2-22.5-44.5-13.5-92 1.1-5.6 2.3-11.2 3.7-16.7 22.4 4.8 45 8.1 67.9 9.8 13.2 18.7 27.7 36.6 43.2 53.4-3.2 3.1-6.4 6.1-9.6 8.9zm24.5-24.3c-10.2-11-20.4-23.2-30.3-36.3 9.6 .4 19.5 .6 29.5 .6 10.3 0 20.4-.2 30.4-.7-9.2 12.7-19.1 24.8-29.6 36.4zm130.7 30c-.9 12.2-6.9 23.6-16.5 31.3-15.9 9.2-49.8-2.8-86.4-34.2-4.2-3.6-8.4-7.5-12.7-11.5 15.3-16.9 29.4-34.8 42.2-53.6 22.9-1.9 45.7-5.4 68.2-10.5 1 4.1 1.9 8.2 2.7 12.2 4.9 21.6 5.7 44.1 2.5 66.3zm18.2-107.5c-2.8 .9-5.6 1.8-8.5 2.6-7-21.8-15.6-43.1-25.5-63.8 9.6-20.4 17.7-41.4 24.5-62.9 5.2 1.5 10.2 3.1 15 4.7 46.6 16 79.3 39.8 79.3 58 0 19.6-34.9 44.9-84.8 61.4zm-149.7-15c25.3 0 45.8-20.5 45.8-45.8s-20.5-45.8-45.8-45.8c-25.3 0-45.8 20.5-45.8 45.8s20.5 45.8 45.8 45.8z" />
        </svg>
      ),
    },

    [Skill.vue]: {
      name: "VueJS",
      href: "https://vuejs.org/",
      element: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20"
          width="17.5"
          viewBox="0 0 448 512"
          className="fill-brand-green"
          role="img"
        >
          <title>VueJS</title>
          {/*<!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->*/}
          <path d="M356.9 64.3H280l-56 88.6-48-88.6H0L224 448 448 64.3h-91.1zm-301.2 32h53.8L224 294.5 338.4 96.3h53.8L224 384.5 55.7 96.3z" />
        </svg>
      ),
    },

    [Skill.node]: {
      name: "NodeJS",
      href: "https://nodejs.org/en",
      element: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20"
          width="17.5"
          viewBox="0 0 448 512"
          className="fill-brand-green"
          role="img"
        >
          <title>NodeJS</title>
          {/*<!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->*/}
          <path d="M224 508c-6.7 0-13.5-1.8-19.4-5.2l-61.7-36.5c-9.2-5.2-4.7-7-1.7-8 12.3-4.3 14.8-5.2 27.9-12.7 1.4-.8 3.2-.5 4.6 .4l47.4 28.1c1.7 1 4.1 1 5.7 0l184.7-106.6c1.7-1 2.8-3 2.8-5V149.3c0-2.1-1.1-4-2.9-5.1L226.8 37.7c-1.7-1-4-1-5.7 0L36.6 144.3c-1.8 1-2.9 3-2.9 5.1v213.1c0 2 1.1 4 2.9 4.9l50.6 29.2c27.5 13.7 44.3-2.4 44.3-18.7V167.5c0-3 2.4-5.3 5.4-5.3h23.4c2.9 0 5.4 2.3 5.4 5.3V378c0 36.6-20 57.6-54.7 57.6-10.7 0-19.1 0-42.5-11.6l-48.4-27.9C8.1 389.2 .7 376.3 .7 362.4V149.3c0-13.8 7.4-26.8 19.4-33.7L204.6 9c11.7-6.6 27.2-6.6 38.8 0l184.7 106.7c12 6.9 19.4 19.8 19.4 33.7v213.1c0 13.8-7.4 26.7-19.4 33.7L243.4 502.8c-5.9 3.4-12.6 5.2-19.4 5.2zm149.1-210.1c0-39.9-27-50.5-83.7-58-57.4-7.6-63.2-11.5-63.2-24.9 0-11.1 4.9-25.9 47.4-25.9 37.9 0 51.9 8.2 57.7 33.8 .5 2.4 2.7 4.2 5.2 4.2h24c1.5 0 2.9-.6 3.9-1.7s1.5-2.6 1.4-4.1c-3.7-44.1-33-64.6-92.2-64.6-52.7 0-84.1 22.2-84.1 59.5 0 40.4 31.3 51.6 81.8 56.6 60.5 5.9 65.2 14.8 65.2 26.7 0 20.6-16.6 29.4-55.5 29.4-48.9 0-59.6-12.3-63.2-36.6-.4-2.6-2.6-4.5-5.3-4.5h-23.9c-3 0-5.3 2.4-5.3 5.3 0 31.1 16.9 68.2 97.8 68.2 58.4-.1 92-23.2 92-63.4z" />
        </svg>
      ),
    },

    [Skill.firebase]: {
      name: "Firebase",
      href: "https://firebase.google.com/",
      element: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20"
          width="15"
          viewBox="0 0 384 512"
          className="fill-brand-red"
          role="img"
        >
          <title>Firebase</title>
          {/*<!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->*/}
          <path d="M153.6 29.9l16-21.3C173.6 3.2 180 0 186.7 0C198.4 0 208 9.6 208 21.3V43.5c0 13.1 5.4 25.7 14.9 34.7L307.6 159C356.4 205.6 384 270.2 384 337.7C384 434 306 512 209.7 512H192C86 512 0 426 0 320v-3.8c0-48.8 19.4-95.6 53.9-130.1l3.5-3.5c4.2-4.2 10-6.6 16-6.6C85.9 176 96 186.1 96 198.6V288c0 35.3 28.7 64 64 64s64-28.7 64-64v-3.9c0-18-7.2-35.3-19.9-48l-38.6-38.6c-24-24-37.5-56.7-37.5-90.7c0-27.7 9-54.8 25.6-76.9z" />
        </svg>
      ),
    },

    [Skill.ruby]: {
      name: "Ruby",
      href: "https://www.ruby-lang.org/en/",
      element: (
        <svg
          width="20.118538"
          height="20.000004"
          viewBox="0 0 5.3230298 5.2916676"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-brand-red"
          role="img"
        >
          <title>Ruby</title>
          <g transform="translate(-201.6125,-103.1875)">
            <path d="M 204.60353 103.1875 A 0.13230423 0.13230423 0 0 0 204.55289 103.19732 L 203.98807 103.42573 L 203.97256 103.43193 C 203.9693 103.43324 203.96601 103.43421 203.96274 103.43555 C 203.55818 103.60071 203.11892 103.90412 202.73233 104.28717 C 202.69059 104.32852 202.65041 104.3708 202.61089 104.41326 C 202.59762 104.42751 202.58462 104.44181 202.57161 104.45616 C 202.54005 104.491 202.5091 104.52619 202.47911 104.56158 C 202.47308 104.56868 202.46648 104.57564 202.46051 104.58276 C 202.46012 104.58323 202.45987 104.58384 202.45948 104.58431 C 202.45216 104.59307 202.44551 104.60189 202.43829 104.61067 C 202.41384 104.64043 202.38974 104.67007 202.36646 104.70007 C 202.34725 104.72481 202.32852 104.74962 202.31013 104.77448 C 202.29926 104.78919 202.28918 104.80419 202.27861 104.81892 C 202.24227 104.86956 202.20749 104.92002 202.17474 104.97085 C 202.16764 104.98184 202.16048 104.99294 202.15355 105.00393 C 202.1348 105.03377 202.11571 105.06353 202.09826 105.09333 C 202.09737 105.09484 202.09656 105.09647 202.09567 105.09798 C 202.09139 105.10533 202.08696 105.11285 202.08276 105.1202 L 201.67968 105.80698 A 0.13230423 0.13230423 0 0 0 201.66211 105.86951 L 201.61353 107.33608 A 0.13230423 0.13230423 0 0 0 201.61353 107.34435 C 201.62377 107.6665 201.70841 107.90643 201.83212 108.07816 C 201.83226 108.07835 201.8325 108.07848 201.83264 108.07867 C 201.83397 108.08048 201.83544 108.08205 201.83678 108.08384 C 201.85049 108.10256 201.86456 108.1205 201.87915 108.13759 C 201.94282 108.21212 202.0144 108.27168 202.08999 108.3169 C 202.09188 108.31803 202.09378 108.31889 202.09567 108.32 C 202.09652 108.32052 202.09741 108.32104 202.09826 108.32155 C 202.29219 108.43868 202.51719 108.47893 202.72458 108.47503 C 202.74103 108.47557 202.76123 108.47668 202.77574 108.4771 L 202.7747 108.47348 C 202.77538 108.47345 202.77609 108.47352 202.77677 108.47348 A 0.13230423 0.13230423 0 0 0 202.78504 108.47917 L 202.80209 108.47813 A 0.13230423 0.13230423 0 0 0 202.81088 108.4771 L 206.52538 108.21148 A 0.13230423 0.13230423 0 0 0 206.64837 108.08849 L 206.91657 104.53936 C 206.94378 104.33984 206.94396 104.13324 206.8928 103.93733 L 206.89021 103.93991 C 206.79512 103.54622 206.48411 103.27218 206.0174 103.19577 A 0.13230423 0.13230423 0 0 0 205.99621 103.1937 L 204.60353 103.1875 z M 204.98129 103.45312 L 205.41227 103.4557 L 205.10169 103.60039 C 205.0765 103.5564 205.04616 103.51522 205.00971 103.47844 C 205.00068 103.46933 204.99082 103.46144 204.98129 103.45312 z M 206.01275 103.46707 C 206.38105 103.53738 206.56573 103.71105 206.63493 104.00399 A 0.13230423 0.13230423 0 0 0 206.63493 104.00605 C 206.65436 104.0809 206.66524 104.16173 206.66801 104.2448 C 206.66893 104.27249 206.66891 104.30039 206.66801 104.32852 L 206.6556 104.4913 C 206.64563 104.57145 206.63081 104.65148 206.61168 104.72952 L 205.30271 103.79677 L 206.01275 103.46707 z M 204.53894 103.56836 C 204.6693 103.56822 204.75853 103.60192 204.82212 103.66602 C 204.88792 103.73242 204.92302 103.8206 204.92599 103.94559 C 204.92899 104.07058 204.89672 104.22833 204.82832 104.40035 C 204.69169 104.7444 204.41527 105.14655 204.05059 105.50777 C 203.68512 105.86977 203.26591 106.16355 202.90803 106.31651 C 202.7291 106.39301 202.56606 106.43332 202.43726 106.43536 C 202.36251 106.43652 202.30244 106.42616 202.25225 106.40487 A 0.13230423 0.13230423 0 0 0 202.20833 106.38214 C 202.19011 106.37052 202.17341 106.35716 202.1582 106.34183 C 202.0926 106.27573 202.05676 106.18429 202.05278 106.05658 C 202.04878 105.92887 202.07942 105.76906 202.14632 105.59407 C 202.18946 105.4813 202.24892 105.36223 202.31943 105.24112 C 202.32103 105.23838 202.32247 105.2356 202.32408 105.23285 C 202.34223 105.2019 202.36113 105.17056 202.38093 105.13932 C 202.38258 105.13672 202.38444 105.13417 202.3861 105.13157 C 202.41758 105.08219 202.45146 105.0324 202.48687 104.98274 C 202.50032 104.96392 202.51369 104.94522 202.52769 104.92641 C 202.54398 104.90446 202.56081 104.88268 202.57782 104.86078 C 202.58815 104.84747 202.59874 104.83427 202.60934 104.82099 C 202.64208 104.77995 202.67602 104.73905 202.71114 104.69852 C 202.72634 104.68103 202.74151 104.66369 202.75713 104.64633 C 202.77448 104.627 202.79198 104.60758 202.80984 104.58845 C 202.84502 104.55084 202.88074 104.51358 202.91785 104.47683 C 203.28534 104.11271 203.71002 103.82406 204.0723 103.67791 A 0.13230423 0.13230423 0 0 0 204.07798 103.67378 C 204.25214 103.60436 204.41237 103.56849 204.53894 103.56836 z M 205.18799 104.04016 L 206.28922 104.82409 L 204.89499 104.86078 C 204.96665 104.73818 205.02717 104.61671 205.0743 104.49801 C 205.13728 104.33953 205.17708 104.1857 205.18799 104.04016 z M 206.49954 105.08454 C 206.26088 105.71754 205.85268 106.25829 205.3854 106.76816 L 204.83969 105.12692 L 206.49954 105.08454 z M 204.60973 105.27729 L 205.1172 106.80278 L 203.61806 106.21522 C 203.82955 106.06626 204.03937 105.89023 204.23611 105.69536 C 204.37283 105.55994 204.49789 105.4196 204.60973 105.27729 z M 206.57395 105.56927 L 206.39257 107.95517 L 204.03664 108.12363 C 204.09827 108.09356 204.15893 108.06263 204.21854 108.02958 C 204.70831 107.76415 205.0372 107.47672 205.39108 107.14591 A 0.13230423 0.13230423 0 0 0 205.45309 107.08494 C 205.88562 106.627 206.28937 106.13653 206.57395 105.56927 z M 203.42583 106.42348 L 205.08102 107.07202 C 204.78284 107.34451 204.49861 107.57747 204.09349 107.79704 L 204.09194 107.79704 C 203.75377 107.98468 203.38773 108.12116 202.97882 108.18461 L 203.42583 106.42348 z M 201.90706 106.4519 C 201.92606 106.47919 201.94683 106.50545 201.97062 106.52941 C 201.97801 106.53687 201.98614 106.54315 201.99387 106.55009 L 201.89724 106.74387 L 201.90706 106.4519 z M 203.13282 106.50564 L 202.78142 107.88489 L 202.37369 106.69943 C 202.396 106.70085 202.41873 106.70134 202.44139 106.70098 C 202.61989 106.69798 202.81291 106.64614 203.01345 106.56042 C 203.05283 106.54359 203.09285 106.52511 203.13282 106.50564 z M 202.1427 106.84567 L 202.61141 108.2027 C 202.48523 108.18962 202.34463 108.15991 202.22435 108.08798 C 202.20898 108.07878 202.19431 108.06803 202.17939 108.05749 C 202.12965 108.02009 202.08432 107.97573 202.04503 107.92209 L 202.04141 107.92468 C 201.95458 107.80824 201.89316 107.63594 201.87967 107.37329 L 202.1427 106.84567 z " />
          </g>
        </svg>
      ),
    },
    [Skill.tailwind]: {
      name: "TailwindCSS",
      href: "https://tailwindcss.com/",
      element: (
        <svg
          fill="none"
          viewBox="0 0 20 12"
          version="1.1"
          id="svg2"
          width="20"
          height="12"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-brand-blue"
          role="img"
        >
          <title>TailwindCSS</title>
          <path d="M 10,0 C 7.3333333,0 5.6666667,1.3333333 5,4 6,2.6666667 7.1666667,2.1666667 8.5,2.5 9.2607407,2.69 9.8044444,3.2422222 10.406296,3.852963 11.386667,4.8481481 12.521481,6 15,6 17.666667,6 19.333333,4.6666667 20,2 19,3.3333333 17.833333,3.8333333 16.5,3.5 15.739259,3.31 15.195556,2.7577778 14.593704,2.147037 13.613333,1.1518519 12.478519,0 10,0 Z M 5,6 C 2.3333333,6 0.66666667,7.3333333 0,10 1,8.6666667 2.1666667,8.1666667 3.5,8.5 4.2607407,8.6903704 4.8044444,9.2422222 5.4062963,9.852963 6.3866667,10.848148 7.5214815,12 10,12 12.666667,12 14.333333,10.666667 15,8 14,9.3333333 12.833333,9.8333333 11.5,9.5 10.739259,9.31 10.195556,8.7577778 9.5937037,8.147037 8.6133333,7.1518518 7.4785185,6 5,6 Z" />
        </svg>
      ),
    },
  };

  /** Wrapper component for skill icon. Conditionaly renders as an anchor if
   * icon has href
   * @param icon - The icon that the wrapper is for
   */
  const SkillIconWrapper = (props: {
    icon: Icon;
    className?: string;
    children?: React.ReactNode;
  }) => {
    const wrapper_class_name = `group/skill relative flex items-center justify-center aspect-square p-1 bg-brand-gray-700 rounded ${props.className || ""}`;

    return props.icon.href !== undefined ? (
      <a href={props.icon.href} target="_blank" className={wrapper_class_name}>
        {props.children}
      </a>
    ) : (
      <div className={wrapper_class_name}>{props.children}</div>
    );
  };

  return (
    <SkillIconWrapper icon={icons[props.skill]} className={props.className}>
      {icons[props.skill].element}

      <Tooltip
        tooltipText={icons[props.skill].name}
        className="hidden group-hover/skill:inline"
      />
    </SkillIconWrapper>
  );
}
