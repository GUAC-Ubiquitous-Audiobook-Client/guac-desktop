export module Colors {
    export const background: String = "#2D2D2D";
    export const backgroundContrast: String = "#252525"
    export const textButtonColor: String = "#fff"
    export const textTitleColor: String = "#fff"
    export const buttonBackgroundHover: String = "rgb(255,255,255, 0.04)"
    export const buttonBackgroundSelected: String = "rgb(255,255,255, 0.08)"
}

export module Dimens {
    export const sideMargin: String = "24px"
    export const sideMarginHalf: String = "12px"
    export const cornerRadius: String = "12px"
    export const textButtonSize: String = "14px"
    export const textTitleSize: String = "42px"
}

export module Styles {
    export const buttonText = {
        fontSize: Dimens.textButtonSize,
        color: Colors.textButtonColor,
        fontWeight: "bold",
    }
    export const baseButton = {
        display: "flex",
        border: "none",
        outline: "none",
        alignItems: "center",
    }
    export const buttonPrimary = {
        ...baseButton,
        paddingLeft: "16px",
        paddingRight: "16px",
        paddingTop: "8px",
        paddingBottom: "8px",
        borderRadius: `${Dimens.cornerRadius}`,
        borderColor: "#dcdcdc",
        cursor: "pointer",
        backgroundColor: "#555",
        border: "1px solid"
    }
    export const buttonSecondary = {
        ...baseButton,
        paddingLeft: "16px",
        paddingRight: "16px",
        paddingTop: "8px",
        paddingBottom: "8px",
        borderRadius: `${Dimens.cornerRadius}`,
        borderColor: "#dcdcdc",
        cursor: "pointer",
        backgroundColor: "transparent",
        border: "1px solid"
    }
    export const titleText = {
        fontSize: Dimens.textTitleSize,
        color: Colors.textTitleColor,
        fontWeight: "bold"
    }
}