import type { SidebarCourse } from "~/app/(authed)/(core)/types";

export const myCourses: SidebarCourse[] = [
  {
    courseId: "1",
    name: "Fundamental Computing Concept",
    icon: "🖥️",
    lessons: [
      {
        name: "Lesson 1 Basics",
        status: "PASSED",
        subItems: [
          {
            name: "Lesson 1.1 Repetition: while",
            status: "PASSED",
            slug: "repetition-while",
          },
          {
            name: "Lesson 1.2 Repetition: for",
            status: "PASSED",
            slug: "repetition-for",
          },
          {
            name: "Lesson 1.3 Repetition: do-while",
            status: "PASSED",
            slug: "repetition-do-while",
          },
        ],
      },
      {
        name: "Lesson 2 Functions",
        status: "FAILED",
        subItems: [
          {
            name: "Lesson 2.1 Function Basics",
            status: "PASSED",
            slug: "function-basics",
          },
          {
            name: "Lesson 2.2 Function Parameters",
            status: "PASSED",
            slug: "function-parameters",
          },
          {
            name: "Lesson 2.3 Function Return",
            status: "FAILED",
            slug: "function-return",
          },
        ],
      },
      {
        name: "Lesson 3 Arrays",
        status: "NONE",
        subItems: [
          {
            name: "Lesson 3.1 Array Basics",
            status: "NONE",
            slug: "array-basics",
          },
          {
            name: "Lesson 3.2 Array Index",
            status: "NONE",
            slug: "array-index",
          },
          {
            name: "Lesson 3.3 Array Length",
            status: "NONE",
            slug: "array-length",
          },
        ],
      },
    ],
    labs: [
      {
        name: "Lab 1",
        status: "NONE",
        subItems: [
          {
            name: "Lab 1.1",
            status: "FAILED",
            slug: "lab-1.1",
          },
          {
            name: "Lab 1.2",
            status: "NONE",
            slug: "lab-1.2",
          },
          {
            name: "Lab 1.3",
            status: "NONE",
            slug: "lab-1.3",
          },
        ],
      },
    ],
  },
  {
    courseId: "2",
    icon: "📚",
    name: "Test",
    lessons: [],
    labs: [],
  },
];
