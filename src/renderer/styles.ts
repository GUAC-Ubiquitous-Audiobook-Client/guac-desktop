export module Colors {
    export const background: String = "#2D2D2D";
    export const backgroundContrast: String = "#252525"
    export const textButtonColor: String = "#fff"
    export const buttonBackgroundHover: String = "rgb(255,255,255, 0.04)"
    export const buttonBackgroundSelected: String = "rgb(255,255,255, 0.08)"
}

export module Dimens {
    export const sideMargin: String = "24px"
    export const sideMarginHalf: String = "12px"
    export const textButtonSize: String = "18px"
    export const cornerRadius: String = "12px"
}

export module Styles {
    export const buttonText = {
        fontSize: Dimens.textButtonSize,
        color: Colors.textButtonColor,
        fontWeight: "bold",
    }
}