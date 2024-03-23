'use client';

import React, { useRef } from 'react';
import { cn } from '@udecode/cn';
import { CommentsProvider } from '@udecode/plate-comments';
import { Plate } from '@udecode/plate-common';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { commentsUsers, myUserId } from '@plate-ui/lib/plate/comments';
import { MENTIONABLES } from '@plate-ui/lib/plate/mentionables';
import { plugins } from '@plate-ui/lib/plate/plate-plugins';
import { CommentsPopover } from '@plate-ui/components/plate-ui/comments-popover';
import { CursorOverlay } from '@plate-ui/components/plate-ui/cursor-overlay';
import { Editor } from '@plate-ui/components/plate-ui/editor';
import { FixedToolbar } from '@plate-ui/components/plate-ui/fixed-toolbar';
import { FixedToolbarButtons } from '@plate-ui/components/plate-ui/fixed-toolbar-buttons';
import { FloatingToolbar } from '@plate-ui/components/plate-ui/floating-toolbar';
import { FloatingToolbarButtons } from '@plate-ui/components/plate-ui/floating-toolbar-buttons';
import { MentionCombobox } from '@plate-ui/components/plate-ui/mention-combobox';

export default function PlateEditor() {
  const containerRef = useRef(null);

  const initialValue = [
    {
      id: '1',
      type: ELEMENT_PARAGRAPH,
      children: [{ text: 'Hello, World!' }],
    },
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <CommentsProvider users={commentsUsers} myUserId={myUserId}>
        <Plate plugins={plugins} initialValue={initialValue}>
          <div
            ref={containerRef}
            className={cn(
              'relative',
              // Block selection
              '[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4'
            )}
          >
            <FixedToolbar>
              <FixedToolbarButtons />
            </FixedToolbar>

            <Editor
              className="px-[96px] py-16"
              autoFocus
              focusRing={false}
              variant="ghost"
              size="md"
            />

            <FloatingToolbar>
              <FloatingToolbarButtons />
            </FloatingToolbar>

            <MentionCombobox items={MENTIONABLES} />

            <CommentsPopover />

            <CursorOverlay containerRef={containerRef} />
          </div>
        </Plate>
      </CommentsProvider>
    </DndProvider>
  );
}
