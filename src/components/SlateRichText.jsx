import React , {useMemo, useState, useCallback}from 'react'
import { createEditor} from 'slate';
import {Slate, Editable, withReact} from 'slate-react';
import { withHistory } from 'slate-history'
import isHotkey from 'is-hotkey'

// Util Components
import {MarkButton, BlockButton, toggleMark} from './Buttons.jsx'
import Leaf from './Leaf.jsx';
import Element from './Element.jsx';
import DataRichText from './DataRichText.jsx';


const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
  'mod+d': 'strikethrough'
}

const SlateRichText = () => {
    const editor = useMemo(() => withHistory(withReact(createEditor())), [])
    const renderElement = useCallback(props => <Element {...props} />, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])

    const [value,setValue] = useState(initialValue);
    return(
        <>
        <div className='richtext-content'>
            <Slate
            editor={editor}
            value={value}
            onChange={newValue => setValue(newValue)}
            >
                <div className="toolbar">
                    <MarkButton format="bold" typeIcon='format_bold'/>
                    <MarkButton format="italic" typeIcon='format_italic'/>
                    <MarkButton format="underline" typeIcon='format_underlined'/>
                    <MarkButton format="code" typeIcon='code'/>
                    <BlockButton format="heading-one" typeIcon="looks_one" />
                    <BlockButton format="heading-two" typeIcon="looks_two" />
                    <BlockButton format="block-quote" typeIcon="format_quote" />
                    <BlockButton format="numbered-list" typeIcon="format_list_numbered" />
                    <BlockButton format="bulleted-list" typeIcon="format_list_bulleted" />
                </div>

                <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                placeholder="Enter some rich text…"
                spellCheck
                autoFocus
                onKeyDown={ e => {
                  for (const hotkey in HOTKEYS) {
                    if (isHotkey(hotkey, e)) {
                        e.preventDefault()
                      const mark = HOTKEYS[hotkey]
                      toggleMark(editor, mark)
                    }
                  }
                }}
                />
            </Slate>
        </div>
        <DataRichText data={value}/>
        </>
    )
}
const initialValue = [
  {
    type: 'paragraph',
    children: [
      { text: 'This is editable ' },
      { text: 'rich', bold: true },
      { text: ' text, ' },
      { text: 'much', italic: true },
      { text: ' better than a ' },
      { text: '<textarea>', code: true },
      { text: '!' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text:
          "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: 'bold', bold: true },
      {
        text:
          ', or add a semantically rendered block quote in the middle of the page, like this:',
      },
    ],
  },
  {
    type: 'block-quote',
    children: [{ text: 'A wise quote.' }],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Try it out for yourself!' }],
  },
]

export default SlateRichText;