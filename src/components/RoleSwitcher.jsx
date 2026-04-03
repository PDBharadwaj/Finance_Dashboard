import { useDispatch, useSelector } from "react-redux";
import { setRole } from "../redux/uiSlice";

export default function RoleSwitcher() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.ui.role);

  return (
    <div>
           <select className="role-select" value={role} onChange={(e) => dispatch(setRole(e.target.value))}>
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>
    </div>
  );
}