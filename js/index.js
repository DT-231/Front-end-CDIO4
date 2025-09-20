// ./js/index.js
import request from "./axios.js";
const getTest = async () => {
  const res = await request.post("/api/v1/auth/login",{
    username:"admin",
    password:"123456"
  });

  if(res.success){
    const token = res.data.token.access_token
    localStorage.setItem("access_token",token)
  }

  console.log(res);
};

const getListUser = async () =>{
    const res = await request.get(`/api/v1/users/list`)
  console.log(res);

}

console.log("run");
// getTest()
getListUser()