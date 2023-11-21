import React, { useEffect, useState } from "react";
import OrganizationSelector from "./OrganizationSelector";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function Header() {
  const [logged, setLogged] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("access")) setLogged(true);
    else setLogged(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("value");
    navigate("/login");
    window.location.reload(false);
  };

  return (
    <nav className="border-b bg-[#0F163A] border-[#0F163A] sm:py-2 w-full">
      <div className="flex items-center justify-between w-full py-2">
        <a className="flex ml-4 items-center justify-center"></a>

        {logged && (
          <div className="flex">
            <a className="flex mr-4 items-center justify-center">
              <div className="mr-10">
                <OrganizationSelector />
              </div>
            </a>
            <a className="flex mr-4 items-center justify-center">
              <div className="mr-10">
                <button className="h-full w-full" onClick={logout}>
                  <Button text="Logout" primary={false} />
                </button>
              </div>
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
