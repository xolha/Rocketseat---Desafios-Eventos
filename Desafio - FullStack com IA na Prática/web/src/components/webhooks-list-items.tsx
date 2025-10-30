import { Trash2Icon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import {IconButton} from "./ui/icon-button.tsx";
import {Checkbox} from "./ui/checkbox.tsx";

export function WebhooksListItem() {
    return (
        <div className="group rounded-lg transition-colors duration-150 hover:bg-zinc-700/30">
            <div className="flex items-start gap-3 px-4 py-2.5">
                <Checkbox />

                <Link to="/" className="flex flex-1 min-w-0 items-start gap-3">
                    <span className="text-right font-mono w-12 shrink-0 text-xs font-semibold text-zinc-300">
                        POST
                    </span>
                    <div className="flex-1 min-w-0">
                        <p className="truncate text-xs ">
                            /video/status
                        </p>
                        <p className="text-xs text-zinc-500 font-medium mt-1">
                            1 minute ago
                        </p>
                    </div>
                </Link>
                <IconButton icon={<Trash2Icon className="size-3.5 text-zinc-400" />}
                className="opacity-0 transition-opacity group-hover:opacity-100"/>
            </div>
        </div>
    )
}