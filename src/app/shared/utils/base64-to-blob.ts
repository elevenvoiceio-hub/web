export function b64toBlob(dataURI: string, mime?: string) {
  const dataArray = dataURI.split(',');
  var byteString = atob(dataArray[1] ?? dataArray[0]);
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);

  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mime ?? 'audio/mpeg' });
}
