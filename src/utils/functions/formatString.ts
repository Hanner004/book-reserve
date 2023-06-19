export function capitalizeFirstLetter(str: string) {
  const string = str.trim();
  const words = string.split(' ');
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
  );
  const formattedString = capitalizedWords.join(' ');
  return formattedString;
}
