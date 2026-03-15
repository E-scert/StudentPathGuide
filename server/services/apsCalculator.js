const apsScale = (percentage) => {
  if (percentage >= 80) return 7;
  if (percentage >= 70) return 6;
  if (percentage >= 60) return 5;
  if (percentage >= 50) return 4;
  if (percentage >= 40) return 3;
  if (percentage >= 30) return 2;
  return 1;
};

export const calculateAPS = (subjects) => {
  let total = 0;

  subjects.forEach((subject) => {
    const name = subject.name.toLowerCase().trim();

    //exclude life orientation
    if (name == "life orientation" || name === "lo") {
      return;
    }
    total += apsScale(subject.percentage);
  });

  return total;
};
