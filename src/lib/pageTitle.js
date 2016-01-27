export default function(title) {
    if (typeof document === "undefined") {
        return () => title;
    }
    return () => {
        document.title = title;
    }
}
