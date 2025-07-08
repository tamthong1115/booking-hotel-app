import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useQuery } from "react-query";
import SignOutButton from "../Button/SignOutButton.tsx";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./UserMenu.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { fetchCurrentUser } from "../../services/api/api-users.ts";
import { ROLES } from "../../types/types.ts";

const cx = classNames.bind(styles);

export default function UserMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const { data: user } = useQuery("fetchCurrentUser", () => fetchCurrentUser());

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const isAdmin = user?.roles.includes(ROLES.SUPER_ADMIN);

    return (
        <div>
            <div className={cx("user")}>
                <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                >
                    <div className={cx("user-avatar")}>
                        <img
                            className={cx("avatar")}
                            src="https://media.gettyimages.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=gi&k=20&c=tC514mTG014_uspJnEeJeKrQDiBY2N9GFYKPqwmtBuo="
                            alt="Avatar"
                        />
                    </div>
                    <p className={cx("user-name")}>{user?.firstName || "" + " " + user?.lastName || ""}</p>
                </Button>
            </div>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <MenuItem onClick={handleClose}>
                    <FontAwesomeIcon className={cx("icon")} icon={faUser} />
                    <Link to={"/profile"}>View profile</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <FontAwesomeIcon className={cx("icon")} icon={faKey} />
                    <Link to="/my-bookings">My Bookings</Link>
                </MenuItem>

                {isAdmin && (
                    <MenuItem onClick={handleClose}>
                        <FontAwesomeIcon className={cx("icon")} icon={faKey} />
                        <Link to="/my-hotels">Admin Hotels</Link>
                    </MenuItem>
                )}

                <MenuItem>
                    <FontAwesomeIcon className={cx("icon")} icon={faRightFromBracket} />
                    <SignOutButton />
                </MenuItem>
            </Menu>
        </div>
    );
}
