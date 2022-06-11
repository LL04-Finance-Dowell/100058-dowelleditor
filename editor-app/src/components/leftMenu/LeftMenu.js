import "./LeftMenu.css";
import { editSecOptions } from "../../data/data";
const LeftMenu = ({ showSidebar }) => {
  return (
    <div className="leftMenu">
      {editSecOptions.map((item, index) => {
        return (
          <button onClick={showSidebar}>
            <img src={item.icon} alt="options" key={index} />
          </button>
        );
      })}
    </div>
  );
};

export default LeftMenu;
