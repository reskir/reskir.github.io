(() => {
    const icon = {
        light: "☀️",
        dark: "🌒",
    };

    const modeSwitcher = () => {
        const currentMode = document.documentElement.getAttribute("data-theme");
        const icon = currentMode === "dark" ? "🌒" : "☀️";
        if (currentMode === "dark") {
            document.documentElement.setAttribute("data-theme", "light");
            window.localStorage.setItem("theme", "light");
            document.getElementById("theme-toggle").innerHTML = icon;
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
            window.localStorage.setItem("theme", "dark");
            document.getElementById("theme-toggle").innerHTML = icon;
        }
    };

    const theme = localStorage.getItem("theme");
    const userPrefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
    const userPrefersLight =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: light)").matches;
    const mediaTheme = userPrefersDark ? "dark" : "light";

    if (theme) {
        document.getElementById("theme-toggle").innerHTML =
            theme === "light" ? icon["dark"] : icon["light"];
    } else {
        document.getElementById("theme-toggle").innerHTML = userPrefersDark
            ? icon["light"]
            : icon["dark"];
    }

    if (theme) {
        document.documentElement.setAttribute("data-theme", theme);
    } else {
        document.documentElement.setAttribute("data-theme", mediaTheme);
    }

    window.modeSwitcher = modeSwitcher;
})();
