const getApiRoute = (path: string) => {
  let host:string;
  console.log(import.meta.env.VITE_API_HOST);
  if(import.meta.env.PROD){
    host = import.meta.env.VITE_API_HOST
  } else {
    host = "http://localhost:8000";
  }
  return `${host}/api/${path}`;
}

export default getApiRoute;
