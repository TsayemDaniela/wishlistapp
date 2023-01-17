import Link from "next/link";
import UserMenu from "./UserMenu";

export default function AppNavBar({ user }) {
    return (
        <>
            <nav className="navbar navbar-expand-md bg-transparent">
                <div className="container-fluid px-24 pt-4">
                    <a className="navbar-brand" href="#">WishListApp</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {user ? (
                        <UserMenu user={user} />
                    ) : (<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav ms-auto">
                            <Link className="btn btn-dark me-4" href="/admin/login">Are you an admin?</Link>
                            <Link className="btn btn-outline-light" href="/user/login">User login</Link>
                        </div>
                    </div>)}
                </div>
            </nav>
        </>
    )
}

