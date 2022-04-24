"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Styles = exports.Dimens = exports.Colors = void 0;
var Colors;
(function (Colors) {
    Colors.accent = "#ffffff";
    Colors.accentLight = "#8a8a8a";
    Colors.background = "#2D2D2D";
    Colors.backgroundContrast = "#252525";
    Colors.backgroundContrastSecondary = "#202020";
    Colors.backgroundContent = "#363636";
    Colors.backgroundContentBorder = "#454545";
    Colors.textPrimaryColor = "#ffffff";
    Colors.textSecondaryColor = "#bababa";
    Colors.borderColour = "#dcdcdc";
    Colors.dangerRed = "#FF5757";
    // components
    Colors.textButtonColor = "#ffffff";
    Colors.textTitleColor = Colors.textPrimaryColor;
    Colors.buttonBackgroundSelected = "rgb(255,255,255, 0.08)";
    Colors.buttonBackgroundHover = "rgb(255,255,255, 0.04)";
})(Colors = exports.Colors || (exports.Colors = {}));
var Dimens;
(function (Dimens) {
    Dimens.sideMargin = "24px";
    Dimens.sideMarginHalf = "12px";
    Dimens.sideMarginDouble = "48px";
    Dimens.cornerRadius = "12px";
    Dimens.textButtonSize = "14px";
    Dimens.textTitleSize = "42px";
    Dimens.textBodySize = "16px";
    Dimens.textSubtitleSize = "32px";
    Dimens.iconSize = "24px";
})(Dimens = exports.Dimens || (exports.Dimens = {}));
var Styles;
(function (Styles) {
    Styles.buttonText = {
        fontSize: Dimens.textButtonSize,
        color: Colors.textButtonColor,
        fontWeight: "bold",
    };
    Styles.buttonPrimaryText = {
        fontSize: Dimens.textButtonSize,
        color: Colors.background,
        fontWeight: "bold",
    };
    Styles.baseButton = {
        display: "flex",
        border: "none",
        outline: "none",
        alignItems: "center",
    };
    Styles.buttonPrimary = __assign(__assign({}, Styles.baseButton), { paddingLeft: "16px", paddingRight: "16px", paddingTop: "8px", paddingBottom: "8px", borderRadius: "" + Dimens.cornerRadius, cursor: "pointer", backgroundColor: Colors.accent, border: "1px solid " + Colors.borderColour });
    Styles.buttonSecondary = __assign(__assign({}, Styles.baseButton), { paddingLeft: "16px", paddingRight: "16px", paddingTop: "8px", paddingBottom: "8px", borderRadius: "" + Dimens.cornerRadius, cursor: "pointer", backgroundColor: "transparent", border: "1px solid " + Colors.borderColour });
    Styles.bodyText = {
        color: Colors.textPrimaryColor,
        fontSize: Dimens.textBodySize
    };
    Styles.titleText = {
        fontSize: Dimens.textTitleSize,
        color: Colors.textTitleColor,
        fontWeight: "bold"
    };
    Styles.subtitleText = __assign(__assign({}, Styles.titleText), { fontSize: "24px" });
    Styles.divider = {
        backgroundColor: Colors.backgroundContentBorder,
        height: "1px",
        width: "100%"
    };
})(Styles = exports.Styles || (exports.Styles = {}));
