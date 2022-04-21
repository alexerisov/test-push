export default function parseSearchParams(params) {
  const result = {};
  Object.entries(params).map(([key, value]: any) => {
    if (value) {
      result[key] = value.toString();
    }
  });
  return result;
}
