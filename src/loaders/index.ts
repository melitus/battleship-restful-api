import expressLoader from './express';

export const appInitLoader = ({expressApp}) => {
  expressLoader({app: expressApp});
};
