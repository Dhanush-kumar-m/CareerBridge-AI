export const formatDate = (
  date
) => {
  return new Date(
    date
  ).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const calculatePercentage =
  (obtained, total) => {
    if (!total) return 0;

    return Math.round(
      (obtained / total) * 100
    );
  };

export const getReadinessColor =
  (score) => {
    if (score >= 80)
      return "#22c55e";

    if (score >= 60)
      return "#f59e0b";

    return "#ef4444";
  };

export const capitalizeFirst =
  (text = "") => {
    return (
      text.charAt(0)
        .toUpperCase() +
      text.slice(1)
    );
  };

export const generateXPLevel =
  (xp) => {
    if (xp >= 5000)
      return "Placement Master";

    if (xp >= 3000)
      return "Interview Ready";

    if (xp >= 2000)
      return "Problem Solver";

    if (xp >= 1000)
      return "Learner";

    return "Beginner";
  };

export const formatNumber = (
  number
) => {
  return number.toLocaleString();
};

export const getGreeting = () => {
  const hour =
    new Date().getHours();

  if (hour < 12)
    return "Good Morning";

  if (hour < 17)
    return "Good Afternoon";

  return "Good Evening";
};

export const calculateLevel =
  (xp) => {
    return (
      Math.floor(
        xp / 1000
      ) + 1
    );
  };

export const calculateProgress =
  (current, total) => {
    if (!total) return 0;

    return Math.min(
      Math.round(
        (current / total) * 100
      ),
      100
    );
  };

export const truncateText = (
  text,
  maxLength = 100
) => {
  if (
    text.length <= maxLength
  ) {
    return text;
  }

  return (
    text.substring(
      0,
      maxLength
    ) + "..."
  );
};