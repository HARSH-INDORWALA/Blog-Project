import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import Container from "../container/Container";
import Logo from "../Logo";
import LogoutBtn from "./LogoutBtn";

export default function Header() {
  const authstatus =useSelector((state)=>state.auth.status);
  const navigate=useNavigate();
  const navItems=[
    {
      name :'Home',
      slug :"/",
      active :true,
    },
    {
      name : 'Login',
      slug: "/login",
      active : !authstatus
    },
    {
      name :'Signup',
      slug :"/signup",
      active :!authstatus
    },
    {
      name :'All posts',
      slug : "/all-posts",
      active :  authstatus
    },
    {
      name :'Add post',
      slug :"/add-post",
      active :authstatus 
    }
  ]
  return (
    <header className="py-3 shadow bg-gray-500">
      <Container/>
        <nav className="flex ">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px"/>
            </Link>
          </div>
        <ul className="flex ml-auto">
          {navItems.map((item)=>item.active? (
            <li key={item.name} >
              <button 
              onClick={()=>navigate(item.slug)}
              className="inline-block px-6 py-2 duration-200 hover:bg-blue-600 rounded-full">
                {item.name}
              </button>
            </li>
          ):null)}
          {authstatus && 
          <li>
            <LogoutBtn/>  
          </li>}
        </ul>
        </nav>
    </header>

  );
}   