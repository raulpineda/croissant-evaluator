const categories = [
  {
    id: "looks",
    label: "Looks",
    items: [
      {
        id: "shape-finish",
        label: "Shape & Finish",
        helpText:
          "How glossy, symmetrical and crescent moon-shaped the croissant is",
      },
      {
        id: "lamination",
        label: "Lamination",
        helpText: "Are the layers of the croisant clear?",
      },
      {
        id: "proofing",
        label: "Proofing",
        helpText: "Is the croissant fluffy?",
      },
    ],
  },
  {
    id: "texture",
    label: "Texture",
    items: [
      {
        id: "flakiness",
        label: "Flakiness",
        helpText: "Do the layers separate easily when biting?",
      },
      {
        id: "crunch",
        label: "Crunch",
      },
      {
        id: "structure",
        label: "Structure",
        helpText: "Are there enough bubbles in the bread?",
      },
    ],
  },
  {
    id: "flavor",
    label: "Flavor",
    items: [
      {
        id: "butter",
        label: "Butter",
      },
      {
        id: "dough-yeast",
        label: "Dough/Yeast",
      },
      {
        id: "mouthfeel",
        label: "Mouthfeel",
        helpText: "Does it feel light?",
      },
    ],
  },
  {
    id: "other",
    label: "Other",
    items: [
      {
        id: "vfm",
        label: "Value for money",
      },
    ],
  },
];

export default categories;
