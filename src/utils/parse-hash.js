/**
 * Parse hash parameters from window.location.hash as key value object.
 *
 * https://exampple.com/#story&id=344 -> { name:story, id:344 }
 *
 * @return Object of key -> value mappings.
 */
const parseHash = () => {
  const { hash } = window.location;
  const parsedHash = {};
  const hashName = hash.split('&')[0].substring(1);

  parsedHash.type = hashName;

  const splitHash = hash.split('&');

  if (splitHash.length <= 1) return parsedHash;

  for (let i = 1; i < splitHash.length; i += 1) {
    const hashParam = splitHash[i].split('=');
    parsedHash[hashParam[0]] = hashParam[1] || null;
  }

  return parsedHash;
};

export default parseHash;
