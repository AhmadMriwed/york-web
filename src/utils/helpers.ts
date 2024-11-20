export function formatFileSize(bytes: number) {
  if (bytes < 1024) {
    return bytes + " Bytes";
  } else if (bytes < 1024 * 1024) {
    const kb = (bytes / 1024).toFixed(2);
    return kb + " KB";
  } else {
    const mb = (bytes / (1024 * 1024)).toFixed(2);
    return mb + " MB";
  }
}
