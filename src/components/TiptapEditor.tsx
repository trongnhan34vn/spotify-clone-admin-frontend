import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import {
  FiBold,
  FiCornerUpLeft,
  FiCornerUpRight,
  FiItalic,
  FiType,
  FiUnderline,
} from 'react-icons/fi';

import { useEffect, useState } from 'react';
import { AiOutlineOrderedList } from 'react-icons/ai';
import { MdFormatListNumbered, MdStrikethroughS } from 'react-icons/md';

interface IProps {
  id: string;
  onChange: (value: string) => void;
  value: string;
  className?: string;
  disabled?: boolean;
  inputClassName?: string;
}
const TiptapEditor = ({
  id,
  value,
  onChange,
  className,
  disabled,
  inputClassName,
}: IProps) => {
  const [rerender, setRerender] = useState(0);
  const cleanHTML = (html: string) => {
    const trimmed = html.trim();

    // Cases considered “empty”
    if (
      trimmed === '<p></p>' ||
      trimmed === '<p><br></p>' ||
      trimmed === '' ||
      trimmed === '<p></p>\n'
    ) {
      return '';
    }

    return html;
  };
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Enter description...',
      }),
    ],
    content: value && '',
    onUpdate({ editor }) {
      onChange(cleanHTML(editor.getHTML()));
    },
    editable: !disabled,
  });
  useEffect(() => {
    if (!editor) return;

    const update = () => setRerender(Math.random());

    editor.on('selectionUpdate', update);
    editor.on('transaction', update);

    return () => {
      editor.off('selectionUpdate', update);
      editor.off('transaction', update);
    };
  }, [editor]);

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '');
    }
  }, [value, editor]);

  useEffect(() => {
    if (editor) {
      editor.setEditable(!disabled);
    }
  }, [editor, disabled]);

  const IconButton = ({ active, onClick, children }: any) => (
    <button
      disabled={disabled}
      onClick={onClick}
      onMouseDown={e => e.preventDefault()}
      type="button"
      className={`${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${
        active
          ? 'bg-[var(--color-primary)] border-white text-white'
          : 'bg-transparent border-[var(--color-border)] text-[var(--color-border)]'
      } p-2 border rounded flex items-center justify-center`}
    >
      {children}
    </button>
  );

  return (
    <div
      className={`${className} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} hover:border-white focus:border-white focus-within:border-white transition-all duration-200 ease-in border rounded border-[var(--color-border)] p-4`}
    >
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-3">
        <IconButton
          active={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <FiBold size={18} />
        </IconButton>

        <IconButton
          active={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <FiItalic size={18} />
        </IconButton>

        <IconButton
          active={editor.isActive('underline')}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <FiUnderline size={18} />
        </IconButton>

        <IconButton
          active={editor.isActive('strike')}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <MdStrikethroughS size={18} />
        </IconButton>

        <IconButton
          active={editor.isActive('heading', { level: 1 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          <FiType size={18} />
        </IconButton>

        <IconButton
          active={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <MdFormatListNumbered size={18} />
        </IconButton>

        <IconButton
          active={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <AiOutlineOrderedList size={18} />
        </IconButton>

        <IconButton onClick={() => editor.chain().focus().undo().run()}>
          <FiCornerUpLeft size={18} />
        </IconButton>

        <IconButton onClick={() => editor.chain().focus().redo().run()}>
          <FiCornerUpRight size={18} />
        </IconButton>
      </div>

      {/* Editor */}
      <EditorContent
        id={id}
        editor={editor}
        disabled={disabled}
        className={`${inputClassName} ${disabled ? 'pointer-events-none cursor-not-allowed' : ''} border-[1px] border-[var(--color-border)] rounded h-54 editor-content`}
      />
    </div>
  );
};

export default TiptapEditor;
