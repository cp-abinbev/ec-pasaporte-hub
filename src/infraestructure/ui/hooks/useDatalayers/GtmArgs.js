export const getGtmArgs = (event, category, action, label = '', info = {}) => {
  return {
    dataLayer: {
      event: event,
      eventCategory: category,
      eventAction: action,
      eventLabel: label,
      ...info,
    },
  };
};
