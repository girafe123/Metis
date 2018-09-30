function getCookie(key) {
  const cookies = document.cookie.split(';');
  let result;
  cookies.forEach((item) => {
    const str = item.trim();
    const itemPair = str.split('=');
    if (itemPair[0] === key) {
      result = itemPair[1];
    }
  });

  return result;
}

export {
  getCookie,
}