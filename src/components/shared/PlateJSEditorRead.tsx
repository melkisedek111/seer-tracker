'use client';
import { Plate, usePlateEditor } from '@udecode/plate-common/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Editor } from '@/components/plate-ui/editor';
import { TooltipProvider } from '@/components/plate-ui/tooltip';
import { PlateJSOptions } from './PageContainer';

export default function PlateEditorRead({ value }: { value: any }) {
    const editor = usePlateEditor({ ...PlateJSOptions });
    editor.children = value;
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