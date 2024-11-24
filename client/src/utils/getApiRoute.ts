const getApiRoute = (path: string) => {
  let host:string;
  if(import.meta.env.API_HOST){
    host = process.env.API_HOST as string;
  } else {
    host = "http://localhost:8000";
  }
  return `${host}/api/${path}`;
}

export default getApiRoute;
