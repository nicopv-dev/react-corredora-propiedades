import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminSidebar from "../components/Admin/AdminSidebar";
// Admin Components
import AdminHeader from "../components/Admin/AdminHeader";
import { selectSession } from "../features/sessionSlice";

export default function AdminLayout() {
  const session = useSelector(selectSession);

  if (!session?.user?.isAdmin) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <AdminHeader />

      {/* content */}
      <div className="flex h-[89vh]">
        {/* sidebar */}
        <AdminSidebar />
        {/* content */}
        <div className="flex-1 sm:flex-[0.9_1_0%] md:flex-[0.8_1_0%] overflow-y-auto bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
