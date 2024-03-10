import { NextResponse, NextRequest } from "next/server";

export const middleware=(request: NextRequest)=>{
    const response = NextResponse.next();
    response.headers.set("Access-Control-Allow-Origin", "*")
    response.headers.set('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Accept');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    response.headers.set('Access-Control-Allow-Credentials', "true");
    let accessToken:string|undefined;
    let roleToken:string|undefined;
    if(request.cookies.has("access-token")){
        accessToken = request.cookies.get("access-token")?.value;
        roleToken = request.cookies.get("role-token")?.value;
    }
    // console.log(roleToken)
    // if(request.nextUrl.pathname.startsWith("/admin") && (roleToken?.includes("ADMIN"))){
    //     return NextResponse.redirect(new URL("/admin",request.url))
    // }
    if(request.nextUrl.pathname.startsWith("/admin") && (roleToken===undefined) && (accessToken===undefined)){
        return NextResponse.redirect(new URL("/account/login",request.url))
    }
    if(request.nextUrl.pathname.startsWith("/admin") && (!roleToken?.includes("ADMIN"))){
        return NextResponse.redirect(new URL("/errors",request.url))
    }
    if(request.nextUrl.pathname.startsWith("/account")){
        request.cookies?.clear()
        return 
    }
}