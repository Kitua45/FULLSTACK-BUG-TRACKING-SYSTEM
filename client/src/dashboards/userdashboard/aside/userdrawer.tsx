import { Link } from "react-router-dom";
import { userDrawerData } from "./drawerdata";

export const UserDrawer = () => {
    return (
        <div className="bg-[#054003] h-full">
            <h2 className="text-xl font-bold text-white p-4 border-b border-[#2ABF24]">
                Dashboard Menu
            </h2>

            <ul>
                {userDrawerData.map((item) => (
                    <li key={item.id}>
                        <Link
                            to={item.link}
                            className="
                                flex items-center space-x-3 
                                text-white 
                                p-4 
                                border-b border-transparent 
                                hover:border-[#2ABF24] 
                                hover:bg-[#0A5C04] 
                                transition-all duration-200
                            "
                        >
                            

                            {/* Name */}
                            <span className="text-lg font-medium">
                                {item.name}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};