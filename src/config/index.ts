const FIREBASE_CONFIG = process.env.REACT_APP_FIREBASE_CONFIG || "{}";

const config = {
  firebase: {
    config: JSON.parse(FIREBASE_CONFIG),
  },
};

export default config;
