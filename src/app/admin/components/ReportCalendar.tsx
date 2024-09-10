"use client"

import * as React from "react"

import { Calendar } from "@/components/ui/calendar"

export function ReportCalendar() {
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    return (
        <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border w-full"
            x-chunk="dashboard-01-chunk-7"
           
        />
    )
}
