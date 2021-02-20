import React from 'react'
import {Editor, Transforms,Element as SlateElement} from 'slate';
import {useSlate} from 'slate-react';
const LIST_TYPES = ['numbered-list', 'bulleted-list']

export const MarkButton = ({typeIcon,format}) => {
    const editor = useSlate();
    const active = isMarkActive(editor, format);
    const style = {
      cursor: 'pointer',
      color: active ? 'black' : 'grey'
    }
    return (
      <div 
        style={style}
        onMouseDown={event => {
          event.preventDefault()
          toggleMark(editor, format)
        }}
      >
        <span className="material-icons">{typeIcon}</span>
      </div>
      
    )
  }
  
export const BlockButton = ({ format, typeIcon }) => {
    const editor = useSlate();
    const active = isBlockActive(editor, format);
    const style = {
        cursor: 'pointer',
        color: active ? 'black' : 'grey'
    }
    return (
        <div 
        style={style}
        onMouseDown={event => {
            event.preventDefault()
            toggleBlock(editor, format)
        }}
        >
        <span className="material-icons">{typeIcon}</span>
        </div>
        
    )
}

export const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format)

    if (isActive) {
        Editor.removeMark(editor, format)
    } else {
        Editor.addMark(editor, format, true)
    }
}

export const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(editor, format)
    const isList = LIST_TYPES.includes(format)

    Transforms.unwrapNodes(editor, {
        match: n =>
        LIST_TYPES.includes(
            !Editor.isEditor(n) && SlateElement.isElement(n) && n.type
        ),
        split: true,
    })
    const newProperties = {
        type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    }
    Transforms.setNodes(editor, newProperties)

    if (!isActive && isList) {
        const block = { type: format, children: [] }
        Transforms.wrapNodes(editor, block)
    }
}

export const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
    }

    const isBlockActive = (editor, format) => {
    const [match] = Editor.nodes(editor, {
        match: n =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    })

    return !!match
}