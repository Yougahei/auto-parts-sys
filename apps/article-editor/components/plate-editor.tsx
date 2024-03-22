"use client";

import React, { useEffect, useMemo } from "react";
import { BlockquoteElement } from "@plate-ui/components/plate-ui/blockquote-element";
import { CodeBlockElement } from "@plate-ui/components/plate-ui/code-block-element";
import { CodeLeaf } from "@plate-ui/components/plate-ui/code-leaf";
import { CodeLineElement } from "@plate-ui/components/plate-ui/code-line-element";
import { CodeSyntaxLeaf } from "@plate-ui/components/plate-ui/code-syntax-leaf";
import { CommentLeaf } from "@plate-ui/components/plate-ui/comment-leaf";
import { CommentsPopover } from "@plate-ui/components/plate-ui/comments-popover";
import { Editor } from "@plate-ui/components/plate-ui/editor";
import { EmojiCombobox } from "@plate-ui/components/plate-ui/emoji-combobox";
import { ExcalidrawElement } from "@plate-ui/components/plate-ui/excalidraw-element";
import { FixedToolbar } from "@plate-ui/components/plate-ui/fixed-toolbar";
import { FixedToolbarButtons } from "@plate-ui/components/plate-ui/fixed-toolbar-buttons";
import { FloatingToolbar } from "@plate-ui/components/plate-ui/floating-toolbar";
import { FloatingToolbarButtons } from "@plate-ui/components/plate-ui/floating-toolbar-buttons";
import { HeadingElement } from "@plate-ui/components/plate-ui/heading-element";
import { HighlightLeaf } from "@plate-ui/components/plate-ui/highlight-leaf";
import { HrElement } from "@plate-ui/components/plate-ui/hr-element";
import { ImageElement } from "@plate-ui/components/plate-ui/image-element";
import { KbdLeaf } from "@plate-ui/components/plate-ui/kbd-leaf";
import { LinkElement } from "@plate-ui/components/plate-ui/link-element";
import { LinkFloatingToolbar } from "@plate-ui/components/plate-ui/link-floating-toolbar";
import { MediaEmbedElement } from "@plate-ui/components/plate-ui/media-embed-element";
import { MentionCombobox } from "@plate-ui/components/plate-ui/mention-combobox";
import { MentionElement } from "@plate-ui/components/plate-ui/mention-element";
import { MentionInputElement } from "@plate-ui/components/plate-ui/mention-input-element";
import { ParagraphElement } from "@plate-ui/components/plate-ui/paragraph-element";
import { withPlaceholders } from "@plate-ui/components/plate-ui/placeholder";
import {
    TableCellElement,
    TableCellHeaderElement,
} from "@plate-ui/components/plate-ui/table-cell-element";
import { TableElement } from "@plate-ui/components/plate-ui/table-element";
import { TableRowElement } from "@plate-ui/components/plate-ui/table-row-element";
import { TodoListElement } from "@plate-ui/components/plate-ui/todo-list-element";
import { ToggleElement } from "@plate-ui/components/plate-ui/toggle-element";
import { TooltipProvider } from "@plate-ui/components/plate-ui/tooltip";
import { withDraggables } from "@plate-ui/components/plate-ui/with-draggables";
import { withProps } from "@udecode/cn";
import { createAlignPlugin } from "@udecode/plate-alignment";
import { createAutoformatPlugin } from "@udecode/plate-autoformat";
import {
    createBoldPlugin,
    createCodePlugin,
    createItalicPlugin,
    createStrikethroughPlugin,
    createSubscriptPlugin,
    createSuperscriptPlugin,
    createUnderlinePlugin,
    MARK_BOLD,
    MARK_CODE,
    MARK_ITALIC,
    MARK_STRIKETHROUGH,
    MARK_SUBSCRIPT,
    MARK_SUPERSCRIPT,
    MARK_UNDERLINE,
} from "@udecode/plate-basic-marks";
import {
    createBlockquotePlugin,
    ELEMENT_BLOCKQUOTE,
} from "@udecode/plate-block-quote";
import {
    createExitBreakPlugin, createSingleLinePlugin,
    createSoftBreakPlugin,
} from "@udecode/plate-break";
import { createCaptionPlugin } from "@udecode/plate-caption";
import {
    createCodeBlockPlugin,
    ELEMENT_CODE_BLOCK,
    ELEMENT_CODE_LINE,
    ELEMENT_CODE_SYNTAX,
    isCodeBlockEmpty,
    isSelectionAtCodeBlockStart,
    unwrapCodeBlock,
} from "@udecode/plate-code-block";
import { createComboboxPlugin } from "@udecode/plate-combobox";
import {
    CommentsProvider,
    createCommentsPlugin,
    MARK_COMMENT,
} from "@udecode/plate-comments";
import {
    createPlugins,
    isBlockAboveEmpty,
    isSelectionAtBlockStart,
    Plate,
    PlateLeaf,
    RenderAfterEditable,
} from "@udecode/plate-common";
import { createDndPlugin } from "@udecode/plate-dnd";
import { createEmojiPlugin } from "@udecode/plate-emoji";
import {
    createExcalidrawPlugin,
    ELEMENT_EXCALIDRAW,
} from "@udecode/plate-excalidraw";
import {
    createFontBackgroundColorPlugin,
    createFontColorPlugin,
    createFontSizePlugin,
} from "@udecode/plate-font";
import {
    createHeadingPlugin,
    ELEMENT_H1,
    ELEMENT_H2,
    ELEMENT_H3,
    ELEMENT_H4,
    ELEMENT_H5,
    ELEMENT_H6,
    KEYS_HEADING,
} from "@udecode/plate-heading";
import {
    createHighlightPlugin,
    MARK_HIGHLIGHT,
} from "@udecode/plate-highlight";
import {
    createHorizontalRulePlugin,
    ELEMENT_HR,
} from "@udecode/plate-horizontal-rule";
import { createIndentPlugin } from "@udecode/plate-indent";
import { createIndentListPlugin } from "@udecode/plate-indent-list";
import { createJuicePlugin } from "@udecode/plate-juice";
import { createKbdPlugin, MARK_KBD } from "@udecode/plate-kbd";
import { createLineHeightPlugin } from "@udecode/plate-line-height";
import { createLinkPlugin, ELEMENT_LINK } from "@udecode/plate-link";
import { createTodoListPlugin, ELEMENT_TODO_LI } from "@udecode/plate-list";
import {
    createImagePlugin,
    createMediaEmbedPlugin,
    ELEMENT_IMAGE,
    ELEMENT_MEDIA_EMBED,
} from "@udecode/plate-media";
import {
    createMentionPlugin,
    ELEMENT_MENTION,
    ELEMENT_MENTION_INPUT,
} from "@udecode/plate-mention";
import { createNodeIdPlugin } from "@udecode/plate-node-id";
import { createNormalizeTypesPlugin, KEY_NORMALIZE_TYPES, withNormalizeTypes } from "@udecode/plate-normalizers";
import {
    createParagraphPlugin,
    ELEMENT_PARAGRAPH,
} from "@udecode/plate-paragraph";
import { createResetNodePlugin } from "@udecode/plate-reset-node";
import { createDeletePlugin, createSelectOnBackspacePlugin } from "@udecode/plate-select";
import { createBlockSelectionPlugin } from "@udecode/plate-selection";
import { createDeserializeCsvPlugin } from "@udecode/plate-serializer-csv";
import { createDeserializeDocxPlugin } from "@udecode/plate-serializer-docx";
import { createDeserializeMdPlugin } from "@udecode/plate-serializer-md";
import { createTabbablePlugin } from "@udecode/plate-tabbable";
import {
    createTablePlugin,
    ELEMENT_TABLE,
    ELEMENT_TD,
    ELEMENT_TH,
    ELEMENT_TR,
} from "@udecode/plate-table";
import { createTogglePlugin, ELEMENT_TOGGLE } from "@udecode/plate-toggle";
import { createTrailingBlockPlugin } from "@udecode/plate-trailing-block";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { autoformatRules } from "./editor-rules/autoformat-rules";

const resetBlockTypesCommonRule = {
    types: [ELEMENT_BLOCKQUOTE, ELEMENT_TODO_LI],
    defaultType: ELEMENT_PARAGRAPH,
};

const resetBlockTypesCodeBlockRule = {
    types: [ELEMENT_CODE_BLOCK],
    defaultType: ELEMENT_PARAGRAPH,
    onReset: unwrapCodeBlock,
};

const plugins = createPlugins(
    [
        // Nodes
        createParagraphPlugin({ enabled: true }),
        createHeadingPlugin({ enabled: true }),
        createBlockquotePlugin({ enabled: true }),
        createCodeBlockPlugin({ enabled: true }),
        createHorizontalRulePlugin({ enabled: true }),
        createLinkPlugin({
            renderAfterEditable: LinkFloatingToolbar as RenderAfterEditable,
        }),
        createImagePlugin({ enabled: true }),
        createMediaEmbedPlugin({ enabled: true }),
        createCaptionPlugin({
            options: {
                pluginKeys: [ELEMENT_IMAGE, ELEMENT_MEDIA_EMBED],
            },
        }),
        createMentionPlugin({
            enabled: true,
            options: {
                triggerPreviousCharPattern: /^$|^[\s"']$/,
            },
        }),
        createTodoListPlugin({ enabled: true }),
        createExcalidrawPlugin({ enabled: true }),
        createTogglePlugin({ enabled: true }),
        createTablePlugin({
            enabled: true,
            options: {
                // enableMerging: true,
            },
        }),

        // Marks
        createBoldPlugin({ enabled: true }),
        createItalicPlugin({ enabled: true }),
        createUnderlinePlugin({ enabled: true }),
        createStrikethroughPlugin({ enabled: true }),
        createCodePlugin({ enabled: true }),
        createSubscriptPlugin({ enabled: true }),
        createSuperscriptPlugin({ enabled: true }),
        createFontColorPlugin({ enabled: true }),
        createFontBackgroundColorPlugin({ enabled: true }),
        createFontSizePlugin({ enabled: true }),
        createHighlightPlugin({ enabled: true }),
        createKbdPlugin({ enabled: true }),

        // Block Style
        createAlignPlugin({
            inject: {
                props: {
                    validTypes: [
                        ELEMENT_PARAGRAPH,
                        ELEMENT_H1,
                        ELEMENT_H2,
                        ELEMENT_H3,
                        ELEMENT_H4,
                        ELEMENT_H5,
                        ELEMENT_H6,
                    ],
                },
            },
            enabled: true,
        }),
        createIndentPlugin({
            inject: {
                props: {
                    validTypes: [
                        ELEMENT_PARAGRAPH,
                        ELEMENT_H1,
                        ELEMENT_H2,
                        ELEMENT_H3,
                        ELEMENT_H4,
                        ELEMENT_H5,
                        ELEMENT_H6,
                        ELEMENT_BLOCKQUOTE,
                        ELEMENT_CODE_BLOCK,
                        ELEMENT_TOGGLE,
                    ],
                },
            },
            enabled: true,
        }),
        createIndentListPlugin({
            inject: {
                props: {
                    validTypes: [
                        ELEMENT_PARAGRAPH,
                        ELEMENT_H1,
                        ELEMENT_H2,
                        ELEMENT_H3,
                        ELEMENT_H4,
                        ELEMENT_H5,
                        ELEMENT_H6,
                        ELEMENT_BLOCKQUOTE,
                        ELEMENT_CODE_BLOCK,
                        ELEMENT_TOGGLE,
                    ],
                },
            },
            enabled: true,
        }),
        createLineHeightPlugin({
            inject: {
                props: {
                    defaultNodeValue: 1.5,
                    validNodeValues: [1, 1.2, 1.5, 2, 3],
                    validTypes: [
                        ELEMENT_PARAGRAPH,
                        ELEMENT_H1,
                        ELEMENT_H2,
                        ELEMENT_H3,
                        ELEMENT_H4,
                        ELEMENT_H5,
                        ELEMENT_H6,
                    ],
                },
            },
            enabled: true,
        }),

        // Functionality
        createAutoformatPlugin({
            options: {
                rules: [...autoformatRules],
                enableUndoOnDelete: true,
            },
            enabled: true,
        }),
        createBlockSelectionPlugin({
            options: {
                sizes: {
                    top: 0,
                    bottom: 0,
                },
            },
            enabled: true,
        }),
        createComboboxPlugin({ enabled: true }),
        createDndPlugin({
            options: { enableScroller: true },
            enabled: true,
        }),
        createEmojiPlugin({
            renderAfterEditable: EmojiCombobox,
            enabled: true,
        }),
        createExitBreakPlugin({
            options: {
                rules: [
                    {
                        hotkey: "mod+enter",
                    },
                    {
                        hotkey: "mod+shift+enter",
                        before: true,
                    },
                    {
                        hotkey: "enter",
                        query: {
                            start: true,
                            end: true,
                            allow: KEYS_HEADING,
                        },
                        relative: true,
                        level: 1,
                    },
                ],
            },
            enabled: true,
        }),
        createNodeIdPlugin({ enabled: true }),
        createNormalizeTypesPlugin({
            key: KEY_NORMALIZE_TYPES,
            withOverrides: withNormalizeTypes,
            options: {
                rules: [],
            },
            enabled: true,
        }),
        createResetNodePlugin({
            options: {
                rules: [
                    {
                        ...resetBlockTypesCommonRule,
                        hotkey: "Enter",
                        predicate: isBlockAboveEmpty,
                    },
                    {
                        ...resetBlockTypesCommonRule,
                        hotkey: "Backspace",
                        predicate: isSelectionAtBlockStart,
                    },
                    {
                        ...resetBlockTypesCodeBlockRule,
                        hotkey: "Enter",
                        predicate: isCodeBlockEmpty,
                    },
                    {
                        ...resetBlockTypesCodeBlockRule,
                        hotkey: "Backspace",
                        predicate: isSelectionAtCodeBlockStart,
                    },
                ],
            },
            enabled: true,
        }),
        createSelectOnBackspacePlugin({
            options: {
                query: {
                    allow: [ELEMENT_IMAGE, ELEMENT_HR],
                },
            },
            enabled: true
        }),
        createDeletePlugin({ enabled: true }),
        createSingleLinePlugin({
            enabled: true,
        }),
        createSoftBreakPlugin({
            options: {
                rules: [
                    { hotkey: "shift+enter" },
                    {
                        hotkey: "enter",
                        query: {
                            allow: [
                                ELEMENT_CODE_BLOCK,
                                ELEMENT_BLOCKQUOTE,
                                ELEMENT_TD,
                            ],
                        },
                    },
                ],
            },
        }),
        createTabbablePlugin({ enabled: true }),
        createTrailingBlockPlugin({
            options: { type: ELEMENT_PARAGRAPH },
        }),
        createCommentsPlugin({ enabled: true }),
        createDeserializeDocxPlugin({ enabled: true }),
        createDeserializeCsvPlugin({ enabled: true }),
        createDeserializeMdPlugin({ enabled: true }),
        createJuicePlugin({ enabled: true }),
    ],
    {
        components: withDraggables(
            withPlaceholders({
                [ELEMENT_BLOCKQUOTE]: BlockquoteElement,
                [ELEMENT_CODE_BLOCK]: CodeBlockElement,
                [ELEMENT_CODE_LINE]: CodeLineElement,
                [ELEMENT_CODE_SYNTAX]: CodeSyntaxLeaf,
                [ELEMENT_EXCALIDRAW]: ExcalidrawElement,
                [ELEMENT_HR]: HrElement,
                [ELEMENT_IMAGE]: ImageElement,
                [ELEMENT_LINK]: LinkElement,
                [ELEMENT_TOGGLE]: ToggleElement,
                [ELEMENT_H1]: withProps(HeadingElement, { variant: "h1" }),
                [ELEMENT_H2]: withProps(HeadingElement, { variant: "h2" }),
                [ELEMENT_H3]: withProps(HeadingElement, { variant: "h3" }),
                [ELEMENT_H4]: withProps(HeadingElement, { variant: "h4" }),
                [ELEMENT_H5]: withProps(HeadingElement, { variant: "h5" }),
                [ELEMENT_H6]: withProps(HeadingElement, { variant: "h6" }),
                [ELEMENT_MEDIA_EMBED]: MediaEmbedElement,
                [ELEMENT_MENTION]: MentionElement,
                [ELEMENT_MENTION_INPUT]: MentionInputElement,
                [ELEMENT_PARAGRAPH]: ParagraphElement,
                [ELEMENT_TABLE]: TableElement,
                [ELEMENT_TR]: TableRowElement,
                [ELEMENT_TD]: TableCellElement,
                [ELEMENT_TH]: TableCellHeaderElement,
                [ELEMENT_TODO_LI]: TodoListElement,
                [MARK_BOLD]: withProps(PlateLeaf, { as: "strong" }),
                [MARK_CODE]: CodeLeaf,
                [MARK_COMMENT]: CommentLeaf,
                [MARK_HIGHLIGHT]: HighlightLeaf,
                [MARK_ITALIC]: withProps(PlateLeaf, { as: "em" }),
                [MARK_KBD]: KbdLeaf,
                [MARK_STRIKETHROUGH]: withProps(PlateLeaf, { as: "s" }),
                [MARK_SUBSCRIPT]: withProps(PlateLeaf, { as: "sub" }),
                [MARK_SUPERSCRIPT]: withProps(PlateLeaf, { as: "sup" }),
                [MARK_UNDERLINE]: withProps(PlateLeaf, { as: "u" }),
            })
        ),
    }
);

interface PlateEditorProps {
    initialValue?: any;
    value?: any;
    onChange?: (value: any) => void;
}

function PlateEditor({ initialValue, value, onChange }: PlateEditorProps) {
    return (
        <div className="mt-10 w-4/5 ml-36">
            <TooltipProvider>
                <DndProvider backend={HTML5Backend}>
                    <CommentsProvider users={{}} myUserId="1">
                        <Plate
                            plugins={plugins}
                            initialValue={initialValue}
                            value={value}
                            onChange={(value) => {
                                onChange?.(value);
                            }}
                        >
                            <FixedToolbar>
                                <FixedToolbarButtons />
                            </FixedToolbar>

                            <Editor />

                            <FloatingToolbar>
                                <FloatingToolbarButtons />
                            </FloatingToolbar>
                            <MentionCombobox items={[]} />
                            <CommentsPopover />
                        </Plate>
                    </CommentsProvider>
                </DndProvider>
            </TooltipProvider>
        </div>
    );
}

export default PlateEditor;
