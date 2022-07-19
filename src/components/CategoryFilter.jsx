import {
  HomeIcon,
  OfficeBuildingIcon,
  DuplicateIcon,
} from "@heroicons/react/outline";
import { useCallback, useEffect, useState } from "react";

const CATEGORIES = [
  { id: 3, title: "Todos", value: "Todos" },
  { id: 2, title: "Casas", value: "Casa" },
  { id: 1, title: "Departamentos", value: "Departamento" },
];

export default function CategoryFilter({ onChangeCategoryFilter }) {
  const [activeFilter, setActiveFilter] = useState(3);

  // cambiar el estado de activeFilter y enviarlo al componente padre
  const onChangeActiveFilter = useCallback(
    (id) => {
      const categorySelected = CATEGORIES.find(
        (category) => category.id === id
      );
      setActiveFilter(id);
      onChangeCategoryFilter(categorySelected);
    },
    [onChangeCategoryFilter]
  );

  const swithIcon = (categoryId) => {
    switch (categoryId) {
      case 1:
        return <HomeIcon className="w-5 h-5" />;
      case 2:
        return <OfficeBuildingIcon className="w-5 h-5" />;
      default:
        return <DuplicateIcon className="w-5 h-5" />;
    }
  };

  return (
    <div className="flex items-center my-4 space-x-6">
      {CATEGORIES.map((category) => (
        <ButtonItem
          key={category.id}
          {...category}
          activeFilter={activeFilter}
          onChangeActiveFilter={onChangeActiveFilter}
        >
          {swithIcon(category.id)}
        </ButtonItem>
      ))}
    </div>
  );
}

function ButtonItem({
  id,
  title,
  activeFilter,
  onChangeActiveFilter,
  children,
}) {
  const [isActive, setIsActive] = useState(false);

  const active = () => {
    onChangeActiveFilter(id);
  };

  useEffect(() => {
    if (id === activeFilter) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [isActive, activeFilter, id]);

  return (
    <button
      type="button"
      onClick={active}
      className={`flex items-center gap-1 text-sm font-medium py-2 transition-all duration-300 ease-in-out border-b-[3px] ${
        isActive ? "text-rose-600 border-b-rose-600" : "border-b-gray-800"
      }`}
    >
      {children}
      <span>{title}</span>
    </button>
  );
}
