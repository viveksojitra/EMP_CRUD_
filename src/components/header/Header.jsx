import { faHouse, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";

// Header
function Header() {

    const nevigateTo = useNavigate();

    const handleHome = () => {
        nevigateTo("/");
    }
    const handleAdd = () => {
        nevigateTo("/addProduct");
    }


    return (
        <header>
            <div className="wrapper d-flex flex-wrap justify-content-between w-100 p-3 item-center">
                <div>
                    <div className='logo w-2 d-flex'>
                        <a href="#">
                            <FontAwesomeIcon icon={faHouse} onClick={handleHome} />
                        </a>
                        <div className="vline"></div>
                        <a href="#">
                            <FontAwesomeIcon icon={faPlus} onClick={handleAdd} />
                        </a>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;