import imageCompression, { type Options } from 'browser-image-compression';
import type Quill from 'quill';

export async function handleImageUpload(file: File, quill: Quill) {
  if (!quill) return;

  const range = quill.getSelection(true);
  if (!range) return;

  try {
    const options: Options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
      initialQuality: 0.7,
    };

    const compressedFile = await imageCompression(file, options);

    const reader = new FileReader();
    reader.onload = () => {
      if (!quill) return;

      quill.insertEmbed(range.index, 'image', reader.result as string);

      quill.setSelection(range.index + 1, 0);

      quill.format('align', 'center');
    };
    reader.readAsDataURL(compressedFile);
  } catch (error) {
    console.error('Erro ao processar imagem:', error);
    quill.deleteText(range.index, 1);
  }
}
