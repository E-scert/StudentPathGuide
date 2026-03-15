import { calculateAPS } from "./services/apsCalculator.js";

const subjects = [
  { name: "Mathematics", percentage: 75 },
  { name: "English", percentage: 65 },
  { name: "Physical Sciences", percentage: 70 },
  { name: "Life Orientation", percentage: 80 },
  { name: "Accounting", percentage: 55 },
  { name: "Business Studies", percentage: 60 },
  { name: "Geography", percentage: 50 },
];

const aps = calculateAPS(subjects);
console.log("Calculated APS:", aps);
