import { EditorView } from '@codemirror/view'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { tags as t } from '@lezer/highlight'

// Uses global CSS variables as defined in colours.scss and theme.scss

export const codeEditorView = EditorView.theme(
  {
    '&': {
      color: 'var(--code-text-primary)',
      backgroundColor: 'var(--code-bg-primary)',
    },

    '.cm-content': {
      caretColor: 'var(--high-contrast)',
      fontFamily: 'var(--font-family-mono)',
      fontSize: '0.8rem',
      zIndex: 201,
    },

    '.cm-cursor, .cm-dropCursor': { borderLeftColor: 'var(--high-contrast)' },

    '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, &.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
      { backgroundColor: 'var(--code-selection-bg)' },

    '.cm-searchMatch': {
      backgroundColor: 'var(--code-searchmatch-bg)',
      outline: '1px solid var(--code-searchmatch-outline)',
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: 'var(--code-searchmatch-selected)',
    },

    '.cm-activeLine': { backgroundColor: 'var(--code-activeline-bg)' },
    '.cm-selectionMatch': {
      backgroundColor: 'var(--code-searchmatch-bg)',
      outline: '1px solid var(--code-searchmatch-outline)',
    },

    '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
      fontWeight: 'bold',
      filter: 'drop-shadow(0 0 5px var(--code-matching-bracket-glow))',
      backgroundColor: 'transparent',
    },

    '.cm-gutters': {
      zIndex: '2000',
      backgroundColor: 'var(--code-bg-primary)',
      color: 'var(--muted)',
      border: 'none',
      fontFamily: 'var(--font-family-mono)',
      fontSize: '0.8rem',
    },

    '.cm-lineNumbers': {
      color: 'var(--code-comment)',
      '& .cm-gutterElement': {
        paddingLeft: '15px',
        lineHeight: '1.6rem',
      },
    },

    '.cm-activeLineGutter': {
      backgroundColor: 'var(--code-activeline-bg)',
    },

    '.cm-foldPlaceholder': {
      backgroundColor: 'transparent',
      border: 'none',
      color: 'var(--code-fold-placeholder)',
    },

    '.cm-tooltip': {
      border: 'none',
      backgroundColor: 'var(--code-tooltip)',
      fontSize: '0.8rem',
    },
    '.cm-tooltip.cm-tooltip-autocomplete': {
      marginTop: '2px',
      borderRadius: '4px',
      overflow: 'hidden',
      boxShadow: '0 0 50px rgba(125, 125, 125, 0.1)',
      '& > ul > li': {
        fontFamily: 'var(--font-family-mono)',
        padding: '6px',
      },
      '& > ul > li[aria-selected]': {
        backgroundColor: 'rgba(125, 125, 125, 0.1)',
        color: 'var(--code-text-primary)',
      },
      '& .cm-completionIcon': {
        width: '2.5em',
      },
    },
  },
  // { dark: false }
)

export const codeHighlightStyle = HighlightStyle.define([
  {
    tag: t.keyword,
    color: 'var(--code-keyword)',
    fontStyle: 'italic',
    filter:
      'drop-shadow(0 0 10px var(--code-keyword-glow)) drop-shadow(0 0 20px var(--code-keyword-glow))',
  },
  {
    tag: [t.name, t.deleted, t.character, t.macroName],
    color: 'var(--code-name)',
  },
  {
    tag: [t.propertyName],
    color: 'var(--code-text-primary)',
  },
  {
    tag: [t.function(t.variableName), t.labelName],
    color: 'var(--code-function-name)',
    filter:
      'drop-shadow(0 0 10px var(--code-function-name-glow)) drop-shadow(0 0 20px var(--code-function-name-glow))',
  },
  {
    tag: [t.color, t.constant(t.name), t.standard(t.name)],
    color: 'var(--code-constant)',
    fontStyle: 'italic',
  },
  {
    tag: [t.definition(t.name), t.separator],
    color: 'var(--code-text-primary)',
  },
  {
    tag: [
      t.typeName,
      t.className,
      t.number,
      t.changed,
      t.annotation,
      t.modifier,
      t.self,
      t.namespace,
    ],
    color: 'var(--code-type-class)',
  },
  {
    tag: [t.meta, t.comment],
    color: 'var(--code-comment)',
    fontStyle: 'italic',
  },
  { tag: t.link, color: 'var(--code-link)', textDecoration: 'underline' },
  {
    tag: [t.atom, t.bool, t.special(t.variableName)],
    color: 'var(--code-boolean)',
    fontStyle: 'italic',
  },
  {
    tag: [t.processingInstruction, t.string, t.inserted],
    color: 'var(--code-string)',
  },
  { tag: t.invalid, color: 'var(--code-invalid)' },
])

export const codeThemes = [
  codeEditorView,
  syntaxHighlighting(codeHighlightStyle),
]
