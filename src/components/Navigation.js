import React from "react";
import {Link} from "react-router-dom";


const Navigation = () => <nav>
        <ul>
            <li>
                {/* Link to는 새로고침없이 화면전환을 만들어주는 컴포넌트 */}
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/profile">My profile</Link>
            </li>
        </ul>
    </nav>
export default Navigation;
