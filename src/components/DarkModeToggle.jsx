import { useEffect, useState } from "react";

export default function DarkModeToggle(){
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem("dark_mode") === "1";
    } catch { return false; }
  });

  useEffect(()=> {
    document.documentElement.classList.toggle("dark-mode", dark);
    localStorage.setItem("dark_mode", dark ? "1" : "0");
  }, [dark]);

  return (
    <button className="btn btn-sm btn-outline-secondary" onClick={()=>setDark(d=>!d)} title="Toggle dark mode">
      {dark ? "Light" : "Dark"}
    </button>
  );
}
