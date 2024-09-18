import {React} from "react";
import SideBarButton from "./SideBarButton";
import { Link } from "react-router-dom";

const SideBar = () => {
    return (
        <>
            <div className="bg-blue-100 min-h-screen p-3 flex flex-col justify-around space-x-4">
                
                <div className="m-10">
                    Price range
                    <div className="flex space-x-1">
                    <br />
                    <div>
                    From 
                    <br /><input className="w-12" type="number" />
                    </div>
                    <div>
                    To  
                    <br /><input className="w-12" type="number" />
                    </div>
                    <button>Set</button>

                </div>


                </div>

                <div flex>
                    {/* <SideBarButton category="Men's"></SideBarButton>
                    <SideBarButton category="Women's"></SideBarButton>
                    <SideBarButton category="Children's"></SideBarButton>
                    <SideBarButton category="Student's"></SideBarButton> */}
                </div>


                <div className="mb-0">
                Made by <Link to="">Vignesh</Link>
                </div>

            </div>

        </>
    )
}

export default SideBar;