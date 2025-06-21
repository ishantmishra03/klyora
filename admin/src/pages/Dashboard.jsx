import { useAppContext } from "../context/AppContext"

const Dashboard = () => {
  const { logout } = useAppContext();
  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <button onClick={logout} className="px-6 py-3 rounded-full bg-slate-700 text-white cursor-pointer">Logout</button>
    </div>
  )
}

export default Dashboard
