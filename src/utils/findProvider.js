// utils -> findProvider


const providerList = require('./providers.json');

const getHostname = (url) => {
  const match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
  if (match && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
    return match[2];
  }
  return null;
};

const providers = providerList.map((item) => {
  const {
    provider_name, // eslint-disable-line camelcase
    provider_url, // eslint-disable-line camelcase
    endpoints,
  } = item;

  const endpoint = endpoints[0];
  const {
    schemes = [],
    url,
  } = endpoint;

  const hostname = getHostname(url);
  const domain = hostname ? hostname.replace('www.', '') : '';

  return {
    provider_name, // eslint-disable-line camelcase
    provider_url, // eslint-disable-line camelcase
    schemes,
    domain,
    url,
  };
}).filter((item) => {
  return item.domain !== '';
});

const findProvider = (url) => {
  const candidates = providers.filter((provider) => {
    const {
      schemes,
      domain,
    } = provider;
    if (!schemes.length) {
      return url.includes(domain);
    }
    return schemes.some((scheme) => {
      const reg = new RegExp(scheme.replace(/\*/g, '(.*)'), 'i');
      return url.match(reg);
    });
  });

  return candidates.length > 0 ? candidates[0] : null;
};

module.exports = findProvider;
