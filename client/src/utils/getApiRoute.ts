const getApiRoute = (path: string) => {
  return `http://localhost:8000/api/${path}`;
}

export default getApiRoute;
