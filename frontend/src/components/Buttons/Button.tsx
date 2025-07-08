import styles from "./Button.module.scss";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Button({
    text = false,
    primary = false,
    search = false,
    outline = false,
    small = false,
    large = false,
    disabled = false,
    rounded = false,
    ...passProps
}) {
    const Component = "button";

    const props = {
        ...passProps,
    };

    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith("on") && typeof props[key] === "function") {
                delete props[key];
            }
        });
    }

    const classes = cx("wrapper", {
        text,
        primary,
        search,
        outline,
        large,
        small,
        disabled,
        rounded,
    });

    return <Component className={classes} {...props}></Component>;
}

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    onClick: PropTypes.func,
    text: PropTypes.bool,
    primary: PropTypes.bool,
    search: PropTypes.bool,
    outline: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    disabled: PropTypes.bool,
    rounded: PropTypes.bool,
};

export default Button;
