'use client';

import { withProps } from '@udecode/cn';
import { createPlateEditor, Plate, ParagraphPlugin, PlateElement, PlateLeaf } from '@udecode/plate-common/react';
import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import { CodeBlockPlugin, CodeLinePlugin, CodeSyntaxPlugin } from '@udecode/plate-code-block/react';
import { HeadingPlugin } from '@udecode/plate-heading/react';
import { HorizontalRulePlugin } from '@udecode/plate-horizontal-rule/react';
import { LinkPlugin } from '@udecode/plate-link/react';
import { ImagePlugin, MediaEmbedPlugin } from '@udecode/plate-media/react';
import { TogglePlugin } from '@udecode/plate-toggle/react';
import { ColumnPlugin, ColumnItemPlugin } from '@udecode/plate-layout/react';
import { ListPlugin, BulletedListPlugin, NumberedListPlugin, ListItemPlugin, TodoListPlugin } from '@udecode/plate-list/react';
import { TablePlugin, TableRowPlugin, TableCellPlugin, TableCellHeaderPlugin } from '@udecode/plate-table/react';
import { DatePlugin } from '@udecode/plate-date/react';
import { CaptionPlugin } from '@udecode/plate-caption/react';
import { BoldPlugin, ItalicPlugin, UnderlinePlugin, StrikethroughPlugin, CodePlugin, SubscriptPlugin, SuperscriptPlugin } from '@udecode/plate-basic-marks/react';
import { BaseFontColorPlugin, BaseFontBackgroundColorPlugin, BaseFontSizePlugin } from '@udecode/plate-font';
import { HighlightPlugin } from '@udecode/plate-highlight/react';
import { KbdPlugin } from '@udecode/plate-kbd/react';
import { BaseAlignPlugin } from '@udecode/plate-alignment';
import { IndentPlugin } from '@udecode/plate-indent/react';
import { IndentListPlugin } from '@udecode/plate-indent-list/react';
import { BaseLineHeightPlugin } from '@udecode/plate-line-height';
import { AutoformatPlugin } from '@udecode/plate-autoformat/react';
import { BlockSelectionPlugin } from '@udecode/plate-selection/react';
import { DndPlugin } from '@udecode/plate-dnd';
import { EmojiPlugin } from '@udecode/plate-emoji/react';
import { ExitBreakPlugin, SoftBreakPlugin } from '@udecode/plate-break/react';
import { NodeIdPlugin } from '@udecode/plate-node-id';
import { ResetNodePlugin } from '@udecode/plate-reset-node/react';
import { DeletePlugin } from '@udecode/plate-select';
import { TabbablePlugin } from '@udecode/plate-tabbable/react';
import { TrailingBlockPlugin } from '@udecode/plate-trailing-block';
import { CommentsPlugin } from '@udecode/plate-comments/react';
import { DocxPlugin } from '@udecode/plate-docx';
import { CsvPlugin } from '@udecode/plate-csv';
import { MarkdownPlugin } from '@udecode/plate-markdown';
import { JuicePlugin } from '@udecode/plate-juice';
import { HEADING_KEYS } from '@udecode/plate-heading';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { BlockquoteElement } from '@/components/plate-ui/blockquote-element';
import { CodeBlockElement } from '@/components/plate-ui/code-block-element';
import { CodeLineElement } from '@/components/plate-ui/code-line-element';
import { CodeSyntaxLeaf } from '@/components/plate-ui/code-syntax-leaf';
import { HrElement } from '@/components/plate-ui/hr-element';
import { ImageElement } from '@/components/plate-ui/image-element';
import { LinkElement } from '@/components/plate-ui/link-element';
import { LinkFloatingToolbar } from '@/components/plate-ui/link-floating-toolbar';
import { ToggleElement } from '@/components/plate-ui/toggle-element';
import { ColumnGroupElement } from '@/components/plate-ui/column-group-element';
import { ColumnElement } from '@/components/plate-ui/column-element';
import { HeadingElement } from '@/components/plate-ui/heading-element';
import { ListElement } from '@/components/plate-ui/list-element';
import { MediaEmbedElement } from '@/components/plate-ui/media-embed-element';
import { ParagraphElement } from '@/components/plate-ui/paragraph-element';
import { TableElement } from '@/components/plate-ui/table-element';
import { TableRowElement } from '@/components/plate-ui/table-row-element';
import { TableCellElement, TableCellHeaderElement } from '@/components/plate-ui/table-cell-element';
import { TodoListElement } from '@/components/plate-ui/todo-list-element';
import { DateElement } from '@/components/plate-ui/date-element';
import { CodeLeaf } from '@/components/plate-ui/code-leaf';
import { CommentLeaf } from '@/components/plate-ui/comment-leaf';
import { CommentsPopover } from '@/components/plate-ui/comments-popover';
import { HighlightLeaf } from '@/components/plate-ui/highlight-leaf';
import { KbdLeaf } from '@/components/plate-ui/kbd-leaf';
import { Editor } from '@/components/plate-ui/editor';
import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar';
import { FixedToolbarButtons } from '@/components/plate-ui/fixed-toolbar-buttons';
import { FloatingToolbar } from '@/components/plate-ui/floating-toolbar';
import { FloatingToolbarButtons } from '@/components/plate-ui/floating-toolbar-buttons';
import { withPlaceholders } from '@/components/plate-ui/placeholder';
import { withDraggables } from '@/components/plate-ui/with-draggables';
import { EmojiInputElement } from '@/components/plate-ui/emoji-input-element';
import { TooltipProvider } from '@/components/plate-ui/tooltip';
import { IndentListToolbarButton } from '@/components/plate-ui/indent-list-toolbar-button';
import { ToolbarGroup } from '@/components/plate-ui/toolbar';
import { InsertDropdownMenu } from '@/components/plate-ui/insert-dropdown-menu';
import { TurnIntoDropdownMenu } from '@/components/plate-ui/turn-into-dropdown-menu';
import { MarkToolbarButton } from '@/components/plate-ui/mark-toolbar-button';
import { Icons, iconVariants } from '@/components/icons';
import { ColorDropdownMenu } from '@/components/plate-ui/color-dropdown-menu';
import { FontBackgroundColorPlugin, FontColorPlugin } from '@udecode/plate-font/react';
import { AlignDropdownMenu } from '@/components/plate-ui/align-dropdown-menu';
import { IndentToolbarButton } from '@/components/plate-ui/indent-toolbar-button';
import { LineHeightDropdownMenu } from '@/components/plate-ui/line-height-dropdown-menu';
import { ListStyleType } from '@udecode/plate-indent-list';
import { OutdentToolbarButton } from '@/components/plate-ui/outdent-toolbar-button';
import { MediaToolbarButton } from '@/components/plate-ui/media-toolbar-button';
import { TableDropdownMenu } from '@/components/plate-ui/table-dropdown-menu';
import { EmojiDropdownMenu } from '@/components/plate-ui/emoji-dropdown-menu';
import { MoreDropdownMenu } from '@/components/plate-ui/more-dropdown-menu';
import { serializeHtml } from '@udecode/plate-serializer-html';
import { HtmlReactPlugin } from '@udecode/plate-html/react';


const editor = createPlateEditor({
    plugins: [
        HtmlReactPlugin,
        BlockquotePlugin,
        CodeBlockPlugin,
        ParagraphPlugin,
        HeadingPlugin,
        HorizontalRulePlugin,
        LinkPlugin.configure({
            render: { afterEditable: () => <LinkFloatingToolbar /> },
        }),
        ImagePlugin,
        TogglePlugin,
        ColumnPlugin,
        ListPlugin,
        MediaEmbedPlugin,
        TablePlugin,
        TodoListPlugin,
        DatePlugin,
        CaptionPlugin.configure({
            options: { plugins: [ImagePlugin, MediaEmbedPlugin] },
        }),
        BoldPlugin,
        ItalicPlugin,
        UnderlinePlugin,
        StrikethroughPlugin,
        CodePlugin,
        SubscriptPlugin,
        SuperscriptPlugin,
        BaseFontColorPlugin,
        BaseFontBackgroundColorPlugin,
        BaseFontSizePlugin,
        HighlightPlugin,
        KbdPlugin,
        BaseAlignPlugin.configure({
            inject: { targetPlugins: ['p', 'h1', 'h2', 'h3', 'h4'] },
        }),
        IndentPlugin.configure({
            inject: { targetPlugins: ['p', 'h1', 'h2', 'h3', 'h4'] },
        }),
        IndentListPlugin.configure({
            inject: { targetPlugins: ['p', 'h1', 'h2', 'h3', 'h4'] },
        }),
        BaseLineHeightPlugin.configure({
            inject: {
                nodeProps: {
                    defaultNodeValue: 1.5,
                    validNodeValues: [1, 1.2, 1.5, 2, 3],
                },
                targetPlugins: ['p', 'h1', 'h2', 'h3'],
            },
        }),
        AutoformatPlugin.configure({
            options: {
                enableUndoOnDelete: true,
                rules: [
                    // Usage: https://platejs.org/docs/autoformat
                ],
            },
        }),
        BlockSelectionPlugin,
        DndPlugin.configure({
            options: { enableScroller: true },
        }),
        EmojiPlugin,
        ExitBreakPlugin.configure({
            options: {
                rules: [
                    {
                        hotkey: 'mod+enter',
                    },
                    {
                        before: true,
                        hotkey: 'mod+shift+enter',
                    },
                    {
                        hotkey: 'enter',
                        level: 1,
                        query: {
                            allow: ['h1', 'h2', 'h3'],
                            end: true,
                            start: true,
                        },
                        relative: true,
                    },
                ],
            },
        }),
        NodeIdPlugin,
        ResetNodePlugin.configure({
            options: {
                rules: [
                    // Usage: https://platejs.org/docs/reset-node
                ],
            },
        }),
        DeletePlugin,
        SoftBreakPlugin.configure({
            options: {
                rules: [
                    { hotkey: 'shift+enter' },
                    {
                        hotkey: 'enter',
                        query: {
                            allow: ['code_block', 'blockquote', 'td', 'th'],
                        },
                    },
                ],
            },
        }),
        TabbablePlugin,
        TrailingBlockPlugin.configure({
            options: { type: 'p' },
        }),
        CommentsPlugin,
        DocxPlugin,
        CsvPlugin,
        MarkdownPlugin,
        JuicePlugin,
    ],
    override: {
        components: withDraggables(withPlaceholders(({
            [BlockquotePlugin.key]: BlockquoteElement,
            [CodeBlockPlugin.key]: CodeBlockElement,
            [CodeLinePlugin.key]: CodeLineElement,
            [CodeSyntaxPlugin.key]: CodeSyntaxLeaf,
            [HorizontalRulePlugin.key]: HrElement,
            [ImagePlugin.key]: ImageElement,
            [LinkPlugin.key]: LinkElement,
            [TogglePlugin.key]: ToggleElement,
            [ColumnPlugin.key]: ColumnGroupElement,
            [ColumnItemPlugin.key]: ColumnElement,
            [HEADING_KEYS.h1]: withProps(HeadingElement, { variant: 'h1' }),
            [HEADING_KEYS.h2]: withProps(HeadingElement, { variant: 'h2' }),
            [HEADING_KEYS.h3]: withProps(HeadingElement, { variant: 'h3' }),
            [HEADING_KEYS.h4]: withProps(HeadingElement, { variant: 'h4' }),
            [HEADING_KEYS.h5]: withProps(HeadingElement, { variant: 'h5' }),
            [HEADING_KEYS.h6]: withProps(HeadingElement, { variant: 'h6' }),
            [BulletedListPlugin.key]: withProps(ListElement, { variant: 'ul' }),
            [NumberedListPlugin.key]: withProps(ListElement, { variant: 'ol' }),
            [ListItemPlugin.key]: withProps(PlateElement, { as: 'li' }),
            [MediaEmbedPlugin.key]: MediaEmbedElement,
            [ParagraphPlugin.key]: ParagraphElement,
            [TablePlugin.key]: TableElement,
            [TableRowPlugin.key]: TableRowElement,
            [TableCellPlugin.key]: TableCellElement,
            [TableCellHeaderPlugin.key]: TableCellHeaderElement,
            [TodoListPlugin.key]: TodoListElement,
            [DatePlugin.key]: DateElement,
            [BoldPlugin.key]: withProps(PlateLeaf, { as: 'strong' }),
            [CodePlugin.key]: CodeLeaf,
            [CommentsPlugin.key]: CommentLeaf,
            [HighlightPlugin.key]: HighlightLeaf,
            [ItalicPlugin.key]: withProps(PlateLeaf, { as: 'em' }),
            [KbdPlugin.key]: KbdLeaf,
            [StrikethroughPlugin.key]: withProps(PlateLeaf, { as: 's' }),
            [SubscriptPlugin.key]: withProps(PlateLeaf, { as: 'sub' }),
            [SuperscriptPlugin.key]: withProps(PlateLeaf, { as: 'sup' }),
            [UnderlinePlugin.key]: withProps(PlateLeaf, { as: 'u' }),
        }))),
    },
    value: [],
});

type TPlateEditorProps = {
    value: any[];
    setValue: (params: any) => void;
}


export default function PlateEditorRead() {
    editor.children = [
        { type: 'h2', children: [{ text: 'Indent List' }], id: '1' },
        {
            type: 'p',
            children: [
                {
                    text:
                        'Create indented lists with multiple levels of indentation and customize the list style type for each level.'
                }
            ],
            id: '2'
        },
        {
            type: 'p',
            id: '9t6kv',
            children: [
                {
                    text: '🔥 ',
                    fontSize: '16px',
                    backgroundColor: 'rgb(255, 255, 255)',
                    color: 'rgb(9, 9, 11)'
                },
                { text: 'Todo 1' }
            ]
        },
        {
            type: 'p',
            id: 'jtg4w',
            children: [
                {
                    text: '🚀',
                    fontSize: '16px',
                    backgroundColor: 'rgb(255, 255, 255)',
                    color: 'rgb(9, 9, 11)'
                },
                { text: 'Icon 1' }
            ]
        },
        { type: 'p', children: [{ text: '' }], id: '5' },
        { type: 'h1', children: [{ text: '🌱 Marks' }], id: '12' },
        {
            type: 'p',
            children: [
                {
                    text:
                        'Add style and emphasis to your text using the mark plugins, which offers a variety of formatting options.'
                }
            ],
            id: '13'
        },
        {
            type: 'p',
            children: [
                { text: 'Make text ' },
                { text: 'bold', bold: true },
                { text: ', ' },
                { text: 'italic', italic: true },
                { text: ', ' },
                { text: 'underlined', underline: true },
                { text: ', or apply a ' },
                {
                    text: 'combination',
                    bold: true,
                    italic: true,
                    underline: true
                },
                { text: ' of these styles for a visually striking effect.' }
            ],
            id: '14'
        },
        {
            type: 'p',
            children: [
                { text: 'Add ' },
                { text: 'strikethrough', strikethrough: true },
                { text: ' to indicate deleted or outdated content.' }
            ],
            id: '15'
        },
        {
            type: 'p',
            children: [
                { text: 'Write code snippets with inline ' },
                { text: 'code', code: true },
                { text: ' formatting for easy readability.' }
            ],
            id: '16'
        },
        {
            type: 'p',
            children: [
                { text: 'Add ' },
                { text: 'm', color: 'white', backgroundColor: '#df4538' },
                { text: 'u', color: 'white', backgroundColor: '#e2533a' },
                { text: 'l', color: 'white', backgroundColor: '#e6603d' },
                { text: 't', color: 'white', backgroundColor: '#e96f40' },
                { text: 'i', color: 'white', backgroundColor: '#ec7d43' },
                { text: 'p', color: 'white', backgroundColor: '#ef8a45' },
                { text: 'l', color: 'white', backgroundColor: '#f29948' },
                { text: 'e', color: 'white', backgroundColor: '#f5a74b' },
                { text: ' ' },
                { text: 'font', color: 'rgb(252, 109, 38)' },
                { text: ' and ' },
                {
                    text: 'background',
                    color: 'white',
                    backgroundColor: 'rgb(252, 109, 38)'
                },
                { text: ' colors to create vibrant and eye-catching text.' }
            ],
            id: '17'
        },
        {
            type: 'p',
            children: [
                { text: 'Highlight', highlight: true },
                { text: ' important information for better clarity.' }
            ],
            id: '18'
        },
        {
            type: 'p',
            children: [
                { text: 'Press ' },
                { text: '⌘ + B', kbd: true },
                { text: ' to apply bold mark or ' },
                { text: '⌘ + I', kbd: true },
                { text: ' for italic mark.' }
            ],
            id: '19'
        },
        { type: 'h2', children: [{ text: '＠ Mention' }], id: '20' },
        {
            type: 'p',
            children: [
                {
                    text:
                        'Mention and reference other users or entities within your text using @-mentions.'
                }
            ],
            id: '21'
        },
        { type: 'p', children: [{ text: 'Try mentioning  or .' }], id: '22' },
        { type: 'h2', children: [{ text: '🙂 Emoji\'s' }], id: '23' },
        {
            type: 'p',
            children: [
                { text: 'Express yourself with a touch of fun 🎉 and emotion 😃.' }
            ],
            id: '24'
        },
        {
            type: 'p',
            children: [
                {
                    text: 'Pick from the toolbar or type a colon to open the combobox.'
                }
            ],
            id: '25'
        }
    ] as any;
    return (
        <DndProvider backend={HTML5Backend}>
            <TooltipProvider>
                <Plate editor={editor} readOnly>
                    <Editor className="h-full w-full border-none" />
                </Plate>
            </TooltipProvider>
        </DndProvider>
    );
}