import { useCallback, useEffect, useState } from "react";
import CategoryFilter from "../components/CategoryFilter";
import OrderFilter from "../components/OrderFilter";
import PropiedadItem from "../components/PropiedadItem";
import axios from "../utils/axios";
import Loading from "../components/Loading";

export default function Home() {
  const [allData, setAllData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [rangePrice, setRangePrice] = useState([20, 37]);
  const [categoryFilter, setCategoryFilter] = useState("Todos");

  // fetch all data
  const fetchData = useCallback(async () => {
    const response = await axios.get("/propiedades/obtener-prop");
    if (response.status === 200) {
      setAllData(response.data);
      setFilterData(response.data);
    }
  }, []);

  // filtro de orden
  const onChangeOrderFilter = (type) => {
    setCategoryFilter(type);
    if (type === "price") {
      if (categoryFilter === "Todos") {
        setAllData(
          allData.filter(
            (item) =>
              item.price >= rangePrice[0] * 10000 &&
              item.price <= rangePrice[1] * 10000
          )
        );
      } else {
        const newData = allData
          .filter((item) => item.category === categoryFilter)
          .filter(
            (item) =>
              item.price >= rangePrice[0] * 10000 &&
              item.price <= rangePrice[1] * 10000
          );
        setAllData(newData);
      }
    }
  };

  // filtro de categoria
  const onChangeCategoryFilter = (categoryFilterSelected) => {
    setCategoryFilter(categoryFilterSelected?.value);
    if (categoryFilterSelected?.value === "Todos") {
      setFilterData(allData);
    } else {
      setFilterData(allData);
      const newData = allData.filter(
        (item) => item.idTipoProp === categoryFilterSelected?.id
      );
      setFilterData(newData);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="min-h-screen pt-[90px] px-6 sm:px-10 md:px-16 lg:px-24">
      {/* filtos */}
      <div className="flex items-center justify-start sm:justify-between">
        <CategoryFilter onChangeCategoryFilter={onChangeCategoryFilter} />
        <OrderFilter
          rangePrice={rangePrice}
          onChangeOrderFilter={onChangeOrderFilter}
          setRangePrice={setRangePrice}
        />
      </div>
      {/* propiedades */}
      {filterData.length === 0 ? (
        <div className="text-center">
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {filterData.map((item) => (
            <PropiedadItem key={item.id} {...item} />
          ))}
        </div>
      )}
    </div>
  );
}
