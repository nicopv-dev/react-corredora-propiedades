import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LINKS = [
  { id: 1, title: "Inicio", link: "/admin" },
  { id: 2, title: "Propiedades", link: "/admin/propiedades" },
  { id: 3, title: "Agenda", link: "/admin/agenda" },
];

export default function AdminSidebar() {
  const [isActiveLink, setIsActiveLink] = useState(1);

  const onChangeIsActiveLink = (activeLink) => {
    setIsActiveLink(activeLink);
  };

  return (
    <div className="hidden sm:block sm:flex-[0.1_1_0%] md:flex-[0.2_1_0%] sticky top-0 left-0">
      <div className="flex flex-col my-2">
        {LINKS.map((item) => (
          <ItemLink
            key={item?.id}
            {...item}
            isActiveLink={isActiveLink}
            onChangeIsActiveLink={onChangeIsActiveLink}
          />
        ))}
      </div>
    </div>
  );
}

function ItemLink({ id, title, link, isActiveLink, onChangeIsActiveLink }) {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const activeLink = () => {
    navigate(link);
    onChangeIsActiveLink(id);
  };

  useEffect(() => {
    if (id === isActiveLink) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [isActive, id, isActiveLink]);

  return (
    <button
      type="button"
      onClick={activeLink}
      className={`py-4 px-10 flex items-start rounded-lg ${
        isActive ? "text-white bg-rose-500" : "text-black"
      }`}
    >
      {title}
    </button>
  );
}
