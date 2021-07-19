export const validator = {
  isCommentTextareaValid: (value) => {
    const match = /.{5,3000}/;
    return match.test(value);
  }
};
