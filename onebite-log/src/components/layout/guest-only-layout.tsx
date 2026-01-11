import { useSession } from "@/store/session";
import { Navigate, Outlet } from "react-router";

export default function GuestOnlyLayout() {
  const session = useSession();
  // replace={true}는 뒤로가기를 방지합니다.
  if (session) return <Navigate to={"/"} replace={true} />;

  return <Outlet />;
}
