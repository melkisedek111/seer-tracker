"use client";
import {
    Archive,
    Ban,
    Bolt,
    Cloud,
    CreditCard,
    Ellipsis,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPen,
    UserPlus,
    Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type TUserActionDropdownProps = {
    handleUpdateUserRole: () => void;
}

export function UserActionDropdown({ handleUpdateUserRole }: TUserActionDropdownProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <Ellipsis />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>User Action</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <UserPen className="mr-2 h-4 w-4" />
                        <span>Edit User</span>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Control</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={handleUpdateUserRole}>
                        <Bolt className="mr-2 h-4 w-4" />
                        <span>Update Role</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Ban className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Archive className="mr-2 h-4 w-4" />
                        <span>Archive</span>
                    </DropdownMenuItem>
                    
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
