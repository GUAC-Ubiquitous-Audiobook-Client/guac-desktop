export namespace Colors {
    export const background: string = "#2D2D2D";
    export const backgroundContrast: string = "#252525"
    export const backgroundContrastSecondary: string = "#202020"
    export const backgroundContent: string = "#363636"
    export const backgroundContentBorder: string = "#454545"
    export const textPrimaryColor: string = "#ffffff"
    export const textSecondaryColor: string = "#bababa"
    export const borderColour: string = "#dcdcdc"

    // components
    export const textButtonColor: string = "#ffffff"
    export const textTitleColor: string = textPrimaryColor
    export const buttonBackgroundSelected: string = "rgb(255,255,255, 0.08)"
    export const buttonBackgroundHover: string = "rgb(255,255,255, 0.04)"
}

export namespace Dimens {
    export const sideMargin: string = "24px"
    export const sideMarginHalf: string = "12px"
    export const cornerRadius: string = "12px"
    export const textButtonSize: string = "14px"
    export const textTitleSize: string = "42px"
    export const textBodySize: string = "16px"
    export const textSubtitleSize: string = "32px"
    export const iconSize: string = "24px"
}

export namespace Styles {
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
        cursor: "pointer",
        backgroundColor: "#555555",
        border: `1px solid ${Colors.borderColour}`
    }
    export const buttonSecondary = {
        ...baseButton,
        paddingLeft: "16px",
        paddingRight: "16px",
        paddingTop: "8px",
        paddingBottom: "8px",
        borderRadius: `${Dimens.cornerRadius}`,
        cursor: "pointer",
        backgroundColor: "transparent",
        border: `1px solid ${Colors.borderColour}`
    }
    export const bodyText = {
        color: Colors.textPrimaryColor,
        fontSize: Dimens.textBodySize
    }
    export const titleText = {
        fontSize: Dimens.textTitleSize,
        color: Colors.textTitleColor,
        fontWeight: "bold"
    }
    export const subtitleText = {
        ...titleText,
        fontSize: "24px",
    }
    export const divider = {
        backgroundColor: Colors.backgroundContentBorder,
        height: "1px",
        width: "100%"
    }
}
