import { formatDistanceToNow } from 'date-fns';

const formatTime = unixTime => {
  const date = new Date(unixTime * 1000);
  return formatDistanceToNow(date, { addSuffix: true, includeSeconds: true });
};

export default formatTime;
