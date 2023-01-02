import { NextPageContext } from 'next'
import Router from 'next/router'
import React from 'react'

const People = ({people}:any) => {
  return (
    <div>
        Hello People {JSON.stringify(people)}
    </div>
  )
}
People.getInitialProps = async (ctx:NextPageContext)=>{ 
    const cookie = ctx.req?.headers.cookie;
    // console.log(headers)
    const resp = await fetch('http://localhost:3000/api/people',{
        headers:{
            cookie:cookie!
        }
    });
    if(resp.status === 401 && !ctx.req){
        Router.replace("/login");
    }
    if(resp.status === 401 && ctx.req){
        ctx.res?.writeHead(302,{
            Location:'http://localhost:3000/login'
        })
        ctx.res?.end()
    }
    const json = await resp.json();
    return {people:json}
}
export default People