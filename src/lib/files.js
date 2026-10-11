export function readDemoImage(file) {
  return new Promise((resolve, reject) => {
    if (!file || !['image/jpeg', 'image/png', 'image/webp'].includes(file.type))
      return reject(new Error('Choose a JPEG, PNG or WebP image.'));
    if (file.size > 1024 * 1024)
      return reject(new Error('Choose an image under 1 MB for this browser demo.'));
    const reader = new FileReader();
    reader.onerror = () =>
      reject(new Error('This image could not be read. Please choose it again.'));
    reader.onload = () => resolve({ image_url: reader.result, documentName: file.name });
    reader.readAsDataURL(file);
  });
}
