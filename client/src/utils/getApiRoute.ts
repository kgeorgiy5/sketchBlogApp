const getApiRoute = (path: string) => {
  const host:string = import.meta.env.VITE_API_HOST || "http://localhost:8000";
  return `${host}/api/${path}`;
}

export default getApiRoute;
