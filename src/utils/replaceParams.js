export default (template, params = {}) => {
  return template.replace(/:[a-z|A-Z]+/g, match => {
    const matchedParam = match.substr(1);
    const value = params[matchedParam];

    if (typeof value === "undefined") {
      throw new Error(
        `Matched param "${matchedParam}" is not presented at given object`
      );
    }

    return value.toString();
  });
};
