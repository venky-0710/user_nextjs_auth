import React, { useState } from "react";

const Login = () => {
   const [data, setData] = useState<any>({});
   const [message, setMessage] = useState<any>(null);
   const handleData = (e: any) => {
      setData({ ...data, [e.target.name]: e.target.value });
   };
   const hanldeLogin = async () => {
      const res = await (
         await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               ...data,
            }),
         })
      ).json();
      setMessage(res);
   };
   return (
      <div>
         {message&&JSON.stringify(message)}
         <label>Email</label>
         <input type="text" name="email" value={data?.email} onChange={handleData} />
         <label>Password</label>
         <input type="text" name="password" value={data?.password} onChange={handleData} />
         <button onClick={hanldeLogin}>Login</button>
      </div>
   );
};

export default Login;
