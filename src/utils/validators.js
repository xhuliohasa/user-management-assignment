export const validateEmail = (email) => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(String(email).toLowerCase());
};

export const validatePhone = (phone) => {
  const phoneRegex =
    /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/;
  return phoneRegex.test(String(phone));
};

export const validateWebsite = (website) => {
  let url = website;
  if (!/^https?:\/\//i.test(url)) {
    url = "http://" + url;
  }

  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};
