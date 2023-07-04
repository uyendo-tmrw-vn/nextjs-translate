/**
 * @param  {string} input camelCase string to convert into Capitalized Words
 */
const capitalizeCamelCase = (input: string) => {
  const result = input.replace(/([A-Z])/g, " $1");
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
};

export default capitalizeCamelCase;
