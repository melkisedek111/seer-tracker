"use client";
import { Button } from "../ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function CustomPagination({
    totalDocs,
    limit,
    totalPages,
    page,
    pagingCounter,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage
}: {
    totalDocs?: number,
    limit?: number,
    totalPages?: number,
    page?: number,
    pagingCounter?: number,
    hasPrevPage?: boolean,
    hasNextPage?: boolean,
    prevPage?: number | null,
    nextPage?: number | null
}) {
    const urlParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const getPaginationPages = () => {
        totalPages = totalPages || 1;
        page = page || 1;
        const pages: (number | '...')[] = [];
        const maxPagesToShow = 4;
        const halfMax = Math.floor(maxPagesToShow / 3);

        let startPage = Math.max(1, page - halfMax);
        let endPage = Math.min(totalPages, page + halfMax);

        if (startPage > 1) {
            pages.push(1);
            if (startPage > 2) pages.push('...');
        }

        for (let page = startPage; page <= endPage; page++) {
            pages.push(page);
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 3) pages.push('...');
            pages.push(totalPages);
        }

        return pages;
    };

    const handleNextOrPrevPage = (isNextOrPrev?: boolean, nextOrPrev?: number | null) => {
        if (!isNextOrPrev) return;

        const newUrlParams = new URLSearchParams(urlParams);
        newUrlParams.set("page", (nextOrPrev || 1).toString());
        router.replace(`${pathname}?${newUrlParams.toString()}`);
    }

    const handleSelectedPage = (selectedPage: number) => {
        const newUrlParams = new URLSearchParams(urlParams);
        newUrlParams.set("page", selectedPage.toString());
        router.replace(`${pathname}?${newUrlParams.toString()}`);
    }

    return (
        <div className="flex items-center gap-2 justify-end">
            <Button type="button" size={"sm"} variant={"outline"} className="text-sm flex items-center gap-2" onClick={() => handleNextOrPrevPage(hasPrevPage, prevPage)} disabled={!hasPrevPage}>
                <ChevronLeft size={16} className="mt-[2.5px]" />
                Previous
            </Button>
            {
                getPaginationPages().map(onPage => (
                    onPage !== "..." ?
                        <Button type="button" size={"sm"} variant={"outline"} className={cn(
                            "text-sm flex items-center gap-2 hover:bg-primary hover:text-white",
                            Number(onPage) === page && "bg-primary text-white"
                        )}
                            onClick={() => handleSelectedPage(onPage)}
                        >
                            {onPage}
                        </Button> : onPage
                ))
            }
            <Button type="button" size={"sm"} variant={"outline"} className="text-sm flex items-center gap-2" disabled={!hasNextPage} onClick={() => handleNextOrPrevPage(hasNextPage, nextPage)}>
                Next
                <ChevronRight size={16} className="mt-[2.5px]" />
            </Button>
        </div>
    )
}
