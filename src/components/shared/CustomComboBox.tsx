"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

type TListValue = {
    value: string;
    label: string;
}

export type TCustomComboBoxProps = {
    list: TListValue[],
    value: string;
    setValue: (value: string) => void;
    buttonClassName?: string;
    contentClassName?: string;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyPlaceholder?: string;
}

export function CustomComboBox({ list = [], value, setValue, buttonClassName, placeholder, searchPlaceholder, emptyPlaceholder, contentClassName }: TCustomComboBoxProps) {
    const [open, setOpen] = React.useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        "w-auto justify-between",
                        buttonClassName
                    )}
                >
                    {value
                        ? list.find((framework) => framework.value === value)?.label
                        : placeholder || "Select item from the list."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className={cn(
                "w-auto p-0",
                contentClassName
            )}>
                <Command>
                    <CommandList>
                        <CommandInput placeholder={searchPlaceholder || "Search item from the list."} />
                        <CommandEmpty>{emptyPlaceholder || "No item found."}</CommandEmpty>
                        <CommandGroup>
                            {list.map((framework) => (
                                <CommandItem
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === framework.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {framework.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
