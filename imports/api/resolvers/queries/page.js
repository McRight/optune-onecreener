import { Pages } from '/imports/db';

export const page = function(root, args, { userId }) {
  if (!userId) return null;

  return Pages.findOne({ userId });
};
