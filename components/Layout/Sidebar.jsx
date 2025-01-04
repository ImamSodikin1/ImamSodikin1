import { useState, createContext, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  ChevronFirst,
  ChevronLast,
} from "lucide-react";
import * as lucideIcons from "lucide-react";
import { useRouter } from "next/router";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import api from "@/utils/api";
import Image from "next/image";
const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [menus, setMenus] = useState([]);
  const [expanded, setExpanded] = useState(true);
  const [openSubmenus, setOpenSubmenus] = useState({}); // State untuk mengatur submenu yang terbuka
  const router = useRouter(); // Hook untuk navigasi

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    await api
      .get("v1/menu")
      .then((res) => {
        setMenus(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Fungsi untuk toggle submenu
  const toggleSubmenu = (index) => {
    setOpenSubmenus((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  // Fungsi untuk mengarahkan ke path ketika menu diklik
  const handleClick = (path, submenu, index) => {
    if (path) {
      router.push(path); // Arahkan ke path yang diberikan
    }
    if (submenu) {
      toggleSubmenu(index); // Toggle submenu jika ada
    }
  };

  return (
    <SidebarContext.Provider value={{ expanded }}>
      <aside>
        <nav className={`h-full flex flex-col  shadow-sm `}>
          <div className="p-4 pb-2 flex justify-between items-center">
           <span className="text-blue-400 font-semibold uppercase sm:text-xl md:text-2xl ">desaku</span>
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 rounded-md ">
              {expanded ? (
                <ChevronFirst color="#3b82f6" />
              ) : (
                <ChevronLast color="#3b82f6" />
              )}
            </button>
          </div>

          <ul className="flex-1 px-3">
            {menus.map((item, index) => {
              const IconComponent = lucideIcons[item.icon];
              return (
                <li key={index} className="relative">
                  <div
                    className={`relative flex items-center py-2 px-3 my-1  gap-5  rounded-md cursor-pointer transition-colors group  ${expanded ? " hover:bg-gray-200 " : "bg-transparent "
                      }
                     `}>
                    {IconComponent && <IconComponent size={16} />}
                    <span
                      onClick={() =>
                        handleClick(item.path, item.submenu, index)
                      }
                      className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"
                        } `}>
                      {item.title}
                    </span>
                    {item.submenu && item.submenu.length > 0 && expanded && (
                      <div
                        className="ml-auto"
                        onClick={() => toggleSubmenu(index)}>
                        {openSubmenus[index] ? (
                          <ChevronUp size={23} />
                        ) : (
                          <ChevronDown size={23} />
                        )}
                      </div>
                    )}
                  </div>

                  {item.submenu &&
                    item.submenu.length > 0 &&
                    openSubmenus[index] &&
                    expanded && (
                      <ul className="pl-5 mt-2 space-y-1">
                        {item.submenu.map((subItem, subIndex) => {
                          const SubIconComponent = lucideIcons[subItem.icon];
                          return (
                            <li key={subIndex} className="relative">
                              <div
                                className={`relative flex gap-5 items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group  ${expanded
                                  ? "hover:bg-gray-200 "
                                  : "bg-transparent"
                                  }`}>
                                {SubIconComponent && (
                                  <SubIconComponent size={16} />
                                )}
                                <span
                                  onClick={() => handleClick(subItem.path)}
                                  className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"
                                    }`}>
                                  {subItem.title}
                                </span>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    )}

                  {/* Tooltip ketika submenu collapsed */}
                  {!expanded && (
                    <div
                      className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
                      {item.title}
                    </div>
                  )}
                </li>
              );
            })}

            {children}
          </ul>

          <div className={` flex p-3 justify-center items-center border-t dark:border-gray-700 border-gray-200 `}>
            <ThemeSwitcher expanded={expanded} />
          </div>
        </nav>
      </aside>
    </SidebarContext.Provider>
  );
}
