import React, { useState } from "react";

const SignUp = () => {
   const [data, setData] = useState<any>({});
   const [message, setMessage] = useState<any>(null);
   const handleData = (e: any) => {
      setData({ ...data, [e.target.name]: e.target.value });
   };
   const hanldeLogin = async () => {
      const res = await (
         await fetch("http://localhost:3000/api/signup", {
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
      <div style={{display:"flex",flexDirection:"column"}}>
         {message&&JSON.stringify(message)}
         <label>Email</label>
         <input type="text" name="email" value={data?.email} onChange={handleData} />
         <label>Password</label>
         <input type="text" name="password" value={data?.password} onChange={handleData} />
         <button onClick={hanldeLogin}>Sign Up</button>
      </div>
   );
};

export default SignUp;
