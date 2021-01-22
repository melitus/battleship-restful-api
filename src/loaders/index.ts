/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import expressLoader from './express';

export const appInitLoader = ({ expressApp }) => {
  expressLoader({ app: expressApp });
};
