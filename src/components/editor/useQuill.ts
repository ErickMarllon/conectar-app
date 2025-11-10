import Quill, { type QuillOptions } from 'quill';
import ImageResize from 'quill-image-resize-module-react';
import { useRef, useState, useEffect } from 'react';
import { handleImageUpload } from './handleImageUpload';

if (!Quill.imports['modules/imageResize']) {
  Quill.register('modules/imageResize', ImageResize);
}

const defaultOptions: QuillOptions = {
  theme: 'snow',
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      ['link', 'image', 'video'],
      [{ header: 1 }, { header: 2 }, { header: 3 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ['clean'],
    ],
    imageResize: {
      parchment: Quill.import('parchment'),
      modules: ['Resize', 'DisplaySize'],
    },
    clipboard: {
      matchVisual: false,
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true,
    },
    syntax: true,
  },
  formats: [
    'bold',
    'italic',
    'underline',
    'strike',
    'align',
    'list',
    'indent',
    'size',
    'header',
    'link',
    'image',
    'video',
    'color',
    'background',
    'blockquote',
    'code-block',
    'script',
    'font',
  ],
};

type IAddHandler = {
  addHandler: (format: string, handler: () => void) => void;
};
const useQuill = (options?: QuillOptions) => {
  const quillRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [quill, setQuill] = useState<Quill | undefined>(undefined);
  useEffect(() => {
    if (!quill && quillRef.current && isLoaded) {
      const quillInstance = new Quill(quillRef.current, { ...options, ...defaultOptions });
      setQuill(quillInstance);

      if (quillInstance) {
        const toolbar = quillInstance.getModule('toolbar') as IAddHandler;
        toolbar?.addHandler('image', () => {
          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');
          input.onchange = async () => {
            if (input.files && input.files[0] && quillInstance) {
              await handleImageUpload(input.files[0], quillInstance);
            }
          };
          input.click();
        });
      }
    }
    setIsLoaded(true);
  }, [isLoaded, quill, options]);

  return { quill, quillRef };
};

export default useQuill;
