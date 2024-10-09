import Icon from "@mdi/react";
import {
  mdiViewDashboardOutline,
  mdiFormatListBulleted,
  mdiBugOutline,
  mdiConnection,
  mdiCogOutline,
  mdiLogout,
} from "@mdi/js";

export default function Menu() {
  return (
    <aside className="w-[12.5%] flex flex-col justify-between">
      <div className="flex items-center gap-4 p-10 cursor-pointer">
        <img src="./devzery.png" alt="Devzery" className="h-10" />
        <h1 className="text-xl font-medium">Devzery</h1>
      </div>
      <div className="pb-52">
        <ul>
          <li className="flex gap-3 px-8 py-4 border-l-4 cursor-pointer bg-altBg border-devzery text-devzery ">
            <Icon path={mdiViewDashboardOutline} size={1} />
            <p>Test Suite</p>
          </li>
          <li className="flex gap-3 px-8 py-4 transition-all duration-200 cursor-pointer hover:border-l-4 border-devzery hover:bg-altBg hover:text-devzery">
            <Icon path={mdiFormatListBulleted} size={1} />
            <p>API Overview</p>
          </li>
          <li className="flex gap-3 px-8 py-4 transition-all duration-200 cursor-pointer hover:border-l-4 border-devzery hover:bg-altBg hover:text-devzery">
            <Icon path={mdiBugOutline} size={1} />
            <p>Bug Tracker</p>
          </li>
          <li className="flex gap-3 px-8 py-4 transition-all duration-200 cursor-pointer hover:border-l-4 border-devzery hover:bg-altBg hover:text-devzery">
            <Icon path={mdiConnection} size={1} />
            <p>Integrations</p>
          </li>
          <li className="flex gap-3 px-8 py-4 transition-all duration-200 cursor-pointer hover:border-l-4 border-devzery hover:bg-altBg hover:text-devzery">
            <Icon path={mdiCogOutline} size={1} />
            <p>Settings</p>
          </li>
        </ul>
      </div>
      <div className="flex gap-3 m-10 cursor-pointer hover:text-devzery">
        <Icon path={mdiLogout} size={1} />
        <p>Logout</p>
      </div>
    </aside>
  );
}