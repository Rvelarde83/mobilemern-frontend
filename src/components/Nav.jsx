import { Link } from "react-router-dom"

export default function Nav(props) {
    return (
        <div className="wrap-nav">
        <nav className="nav">
            <Link to="/">
                <h3>Baby Stalker Home</h3>
            </Link>
        </nav>
            </div>
    )
}