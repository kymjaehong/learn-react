import { useSession } from "@/store/session";
import { Navigate, Outlet } from "react-router";

export default function MemberOnlyLayout() {
  const session = useSession();
  // replace={true}는 뒤로가기를 방지합니다.
  if (!session) return <Navigate to={"/sign-in"} replace={true} />;

  return <Outlet />;
}
