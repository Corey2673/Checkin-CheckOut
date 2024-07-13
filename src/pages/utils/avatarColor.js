const colors = [
  "blue",
  "green",
  "yellow",

  "orange",

  "teal",
  "indigo",
  "lime",
  "gray",

  "emerald",
  "fuchsia",
  "rose",
  "sky",

  "zinc",
];

const numbers = ["500", "600", "700", "800"];

export default function avatarColor() {
  const randomColor = Math.floor(Math.random() * colors.length);
  const randomNumber = Math.floor(Math.random() * numbers.length);

  console.log(randomColor);

  return `bg-${colors[randomColor]}-${numbers[randomNumber]}`.toString();
}
