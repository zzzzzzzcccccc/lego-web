/**
 * 根据给的字符串导出文件
 * @param content
 * @param fileName
 */
export function createFileBlob(content: string='', fileName: string='') {
  if (!content) {
    return
  }
  const blob: Blob = new Blob([content], { type: "text/plain;chart=utf-8" });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
  window.URL.revokeObjectURL(link.href);
}
