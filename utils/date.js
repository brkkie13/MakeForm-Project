export function formatDate(date) {
  const newDate = new Date(date);
  const elapsedTime = new Date() - newDate;

  const minutesAgo = Math.floor(elapsedTime / (1000 * 60));
  const hoursAgo = Math.floor(elapsedTime / (1000 * 60 * 60));
  const daysAgo = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));

  // 글 작성한지 1분 미만일 때,
  if (minutesAgo < 1) {
    return '방금 전';
  }

  // 1분 이상 60분 미만
  if (minutesAgo >= 1 && minutesAgo < 60) {
    return minutesAgo + '분 전';
  }

  // 1시간 이상 24시간 미만
  if (hoursAgo >= 1 && hoursAgo < 24) {
    return hoursAgo + '시간 전';
  }

  // 1일 이상 2일 미만
  if (daysAgo >= 1 && daysAgo < 2) {
    return '어제';
  }

  // 2일 전부터 7일 전까지
  if (daysAgo >= 2 && daysAgo < 8) {
    return daysAgo + '일 전';
  }

  const year = newDate.getFullYear();
  const month = String(newDate.getMonth() + 1).padStart(2, '0');
  const day = String(newDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDateToLocaleString(date) {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = String(newDate.getMonth() + 1).padStart(2, '0');
  const day = String(newDate.getDate()).padStart(2, '0');
  const hours = newDate.getHours();
  const minutes = String(newDate.getMinutes()).padStart(2, '0');
  const amOrPm = hours >= 12 ? '오후' : '오전';

  const hours12 = String(hours % 12 || 12).padStart(2, '0');

  return `${year}-${month}-${day} ${amOrPm} ${hours12}:${minutes}`;
}
