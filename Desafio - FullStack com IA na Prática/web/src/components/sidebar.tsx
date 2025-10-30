import {IconButton} from "./ui/icon-button.tsx";
import {CopyIcon} from "lucide-react";
import {WebhooksList} from "./webhooks-list.tsx";

export function Sidebar() {
    return (
        <div className="flex h-screen flex-col">
            <div className="flex items-center justify-between border-b border-zinc-700 px-4 py5">
                <div className="flex items-baseline">
                    <span className="font-semibold text-zinc-100 px-3 py-2">
                        webhook
                    </span>
                    <span className="font-normal text-zinc-400">
                        .inspect
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-2 border-b border-zinc-700 bg-zinc-800 px-4 py-2.5">
                <div className="flex-1 items-center min-w-8 gap-1 text-sm font-mono text-zinc-300">
                    <span className="truncate">
                        http://localhost:3333/api/capture
                    </span>
                </div>
                <IconButton icon={<CopyIcon className="size-4" />} />
            </div>

            <WebhooksList />
        </div>
    )
}