import ReactGA from 'react-ga';

const TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID;
let enabled = false;

export const initGA = (trackingID = TRACKING_ID) => {
  if (!trackingID || trackingID.startsWith('UA-XXXX')) return;
  ReactGA.initialize(trackingID);
  enabled = true;
};

export const logPageView = () => {
  if (!enabled) return;
  const path = window.location.pathname + window.location.search;
  ReactGA.set({ page: path });
  ReactGA.pageview(path);
};

export const logEvent = (category = '', action = '') => {
  if (!enabled || !category || !action) return;
  ReactGA.event({ category, action });
};

export const logException = (description = '', fatal = false) => {
  if (!enabled || !description) return;
  ReactGA.exception({ description, fatal });
};
