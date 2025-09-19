import { useEffect, useRef } from 'react';
import useQuill from './useQuill';

interface EditorProps {
  readOnly?: boolean;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  theme?: 'snow' | 'bubble';
}

const QuillEditor = ({ onChange, defaultValue, readOnly = false, theme = 'snow' }: EditorProps) => {
  const { quill, quillRef } = useQuill({ readOnly, theme });
  const initializedRef = useRef(false);

  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        onChange?.(quill.root.innerHTML);
      });

      // quill.setText('Digite seu texto aqui...');
      if (!initializedRef.current && defaultValue) {
        const isHTML = /<\/?[a-z][\s\S]*>/i.test(defaultValue);
        if (isHTML) {
          quill.clipboard.dangerouslyPasteHTML(defaultValue);
        } else {
          quill.setText(defaultValue);
        }
        initializedRef.current = true;
      }
    }
  }, [quill, defaultValue, onChange]);

  return (
    <div
      aria-multiline="true"
      className="quill-editor-container"
      role="textbox"
      ref={quillRef}
      style={{ height: '300px' }}
      // {...other}
    />
  );
};
export default QuillEditor;
