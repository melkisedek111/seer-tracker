import React, { ReactNode } from 'react'
import { TableCell, TableRow } from '../ui/table'
import { Loader2 } from 'lucide-react'

const TableRowLoader = ({ colSpan, isLoading, isEmpty, children }: { colSpan?: number, isLoading?: boolean, children: ReactNode, isEmpty?: boolean }) => {
    if (isLoading) {
        return (
            <TableRow>
                <TableCell colSpan={colSpan}>
                    <div className="flex items-center justify-center gap-2">
                        <Loader2 size={14} className="animate-spin"/>
                        Loading
                    </div>
                </TableCell>
            </TableRow>
        )
    }
    if (isEmpty) {
        return (
            <TableRow>
                <TableCell colSpan={colSpan}>
                    <div className="flex items-center justify-center gap-2">
                        No data found.
                    </div>
                </TableCell>
            </TableRow>
        )
    }

    return children;
}

export default TableRowLoader