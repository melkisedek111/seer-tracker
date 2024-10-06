'use client';

import { withProps } from '@udecode/cn';
import { createPlateEditor, Plate, ParagraphPlugin, PlateElement, PlateLeaf, PlateContent } from '@udecode/plate-common/react';
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
import { plateJsInitialValue } from '@/app/requests/create/components/MISRequestForm';
import { PlateJSOptions } from './PageContainer';

const editor = createPlateEditor({
    id: 'rte',
    shouldNormalizeEditor: true,
   ...PlateJSOptions
});

type TPlateJSEditorProps = {
    value: any;
    setValue: (params: any) => void;
    className?: string;
    disabled?: boolean;
}

export default function PlateJSEditor({ value, setValue, className, disabled }: TPlateJSEditorProps) {
    if(JSON.stringify(value) === JSON.stringify(plateJsInitialValue)) {
        editor.transforms.reset();
    } else {
        editor.children = value;
    }
    
    return (
        <DndProvider backend={HTML5Backend}>
            <TooltipProvider >
                <Plate editor={editor} onValueChange={(e) => setValue(e.value)}>
                    <FixedToolbar className="flex flex-wrap justify-start">
                        <ToolbarGroup noSeparator>
                            {/* <TurnIntoDropdownMenu /> */}
                        </ToolbarGroup>
                        <ToolbarGroup>
                            <MarkToolbarButton nodeType={BoldPlugin.key} tooltip="Bold (⌘+B)">
                                <Icons.bold />
                            </MarkToolbarButton>
                            <MarkToolbarButton
                                nodeType={ItalicPlugin.key}
                                tooltip="Italic (⌘+I)"
                            >
                                <Icons.italic />
                            </MarkToolbarButton>
                            <MarkToolbarButton
                                nodeType={UnderlinePlugin.key}
                                tooltip="Underline (⌘+U)"
                            >
                                <Icons.underline />
                            </MarkToolbarButton>

                            <MarkToolbarButton
                                nodeType={StrikethroughPlugin.key}
                                tooltip="Strikethrough (⌘+⇧+M)"
                            >
                                <Icons.strikethrough />
                            </MarkToolbarButton>
                            <MarkToolbarButton nodeType={CodePlugin.key} tooltip="Code (⌘+E)">
                                <Icons.code />
                            </MarkToolbarButton>
                        </ToolbarGroup>

                        <ToolbarGroup>
                            <ColorDropdownMenu
                                nodeType={FontColorPlugin.key}
                                tooltip="Text Color"
                            >
                                <Icons.color className={iconVariants({ variant: 'toolbar' })} />
                            </ColorDropdownMenu>
                            <ColorDropdownMenu
                                nodeType={FontBackgroundColorPlugin.key}
                                tooltip="Highlight Color"
                            >
                                <Icons.bg className={iconVariants({ variant: 'toolbar' })} />
                            </ColorDropdownMenu>
                        </ToolbarGroup>

                        <ToolbarGroup>
                            <AlignDropdownMenu />

                            <LineHeightDropdownMenu />

                            <IndentListToolbarButton nodeType={ListStyleType.Disc} />
                            <IndentListToolbarButton nodeType={ListStyleType.Decimal} />

                            <OutdentToolbarButton />
                            <IndentToolbarButton />
                        </ToolbarGroup>

                        <ToolbarGroup>

                            <TableDropdownMenu />

                            <EmojiDropdownMenu />

                        </ToolbarGroup>
                    </FixedToolbar>
                    <Editor className={className} disabled={disabled} />
                    <FloatingToolbar>
                        <FloatingToolbarButtons />
                    </FloatingToolbar>
                    <CommentsPopover />
                </Plate>
            </TooltipProvider>
        </DndProvider>
    );
}