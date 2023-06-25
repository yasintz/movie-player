let focused;
export const getFocus = () => {
  return focused;
};

export const setFocus = (el) => {
  focused = el;
};

export default { getFocus, setFocus };
