import * as process from "node:process";

const getApiRoute = (path: string) => {
  let host:string;
  if(process.env.API_HOST){
    host = process.env.API_HOST as string;
  } else {
    host = "http://localhost:8000";
  }
  return `${host}/api/${path}`;
}

export default getApiRoute;
