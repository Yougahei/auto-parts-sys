'use client';
import './editor.css';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';

type Props = {
    className?: string;
};

function EditorComponent({ className }: Props) {
    const ref = useRef<EditorJS>();
    const [isMounted, setIsMounted] = useState(false);

    const initializeEditor = useCallback(async () => {
        const { default: EditorJS } = await import('@editorjs/editorjs');
        // @ts-ignore
        const Header = (await import('@editorjs/header')).default;
        // @ts-ignore
        const Quote = (await import('@editorjs/quote')).default;
        // @ts-ignore
        const Embed = (await import('@editorjs/embed')).default;
        // @ts-ignore
        const List = (await import('@editorjs/list')).default;
        // @ts-ignore
        const Delimeter = (await import('@editorjs/delimiter')).default;
        // @ts-ignore
        const Marker = (await import('@editorjs/marker')).default;
        // @ts-ignore
        const Paragraph = (await import('@editorjs/paragraph')).default;
        // @ts-ignore
        const Table = (await import('@editorjs/table')).default;
        // @ts-ignore
        const Button = (await import('editorjs-button')).default;
        // @ts-ignore
        const Code = (await import('@bomdi/codebox')).default;
        // @ts-ignore
        const Undo = (await import('editorjs-undo')).default;

        if (!ref.current) {
            const editor = new EditorJS({
                inlineToolbar: true,
                placeholder: 'Write here..',
                onReady: () => {
                    ref.current = editor;
                    new Undo({ editor });
                },
                tools: {
                    code: Code,
                    button: Button,
                    table: Table,
                    paragraph: {
                        class: Paragraph,
                        inlineToolbar: true,
                    },
                    list: List,
                    marker: Marker,
                    embed: Embed,
                    delimeter: Delimeter,
                    header: {
                        class: Header,
                        inlineToolbar: true,
                    },
                    quote: {
                        class: Quote,
                        inlineToolbar: true,
                        config: {
                            quotePlaceholder: 'Enter a quote',
                            captionPlaceholder: "Quote's author",
                        },
                    },
                },
                holder: 'editor',
            });
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsMounted(true);
        }
    }, []);

    useEffect(() => {
        const init = async () => {
            await initializeEditor();
        };

        if (isMounted) {
            init();

            return () => {
                ref.current?.destroy();
                ref.current = undefined;
            };
        }
    }, [isMounted, initializeEditor]);

    const submit = async () => {
        let data = await ref.current?.save();
    };

    return (
        <div className={`${className}`}>
            <div id="editor"/>
        </div>
    );
}

export default EditorComponent;
