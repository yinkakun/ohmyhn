const getUrlDomain = url => {
  const urlString = url.toString();
  return new URL(urlString).hostname;
};

export default getUrlDomain;
