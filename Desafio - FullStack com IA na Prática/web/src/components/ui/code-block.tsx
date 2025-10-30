import type { ComponentProps } from "react";
import { useState, useEffect } from "react";
import {codeToHtml } from "shiki";

interface CodeBlockProps extends ComponentProps<'div'> {
    code: string;
    language?: string;
}

export function CodeBlock({ className, code, language = 'json', ...props }: CodeBlockProps) {
    const [parsedCode, setParsedCode] = useState('');

    useEffect(() => {
        if (code) {
            codeToHtml(code, {lang: language, theme: 'vesper'}).then((parsed: string) => setParsedCode(parsed))
        }
    }, [code, language]);

    return (
    <div className="relative rounded-lg border border-zinc-700 overflow-x-auto" {...props}>
            <div className="[&_pre]:text-sm [&_pre]:font-mono [&_pre]:leading-relaxed"
                dangerouslySetInnerHTML={{ __html: parsedCode }}/>
    </div>
    )
}