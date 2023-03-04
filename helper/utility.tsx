export const fileSize = (size: number) => {
  const KB = 1024;
  const MB = KB * 1024;
  const GB = MB * 1024;

  if (size < KB) {
    return `${size} B`;
  } else if (size < MB) {
    return `${(size / KB).toFixed(2)} KB`;
  } else if (size < GB) {
    return `${(size / MB).toFixed(2)} MB`;
  } else {
    return `${(size / GB).toFixed(2)} GB`;
  }
};

export function uiConsole(...args: any[]): void {
  const el = document.querySelector("#console>p");
  if (el) {
    el.innerHTML = JSON.stringify(args || {}, null, 2);
  }
}
