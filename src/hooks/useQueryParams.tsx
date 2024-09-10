import { useSearchParams } from "next/navigation";

const useQueryParams = () => {
    const searchParams = useSearchParams();
    const queryObject: Record<string, string> = {};

    searchParams.forEach((value, key) => {
        queryObject[key] = value;
    });

    return queryObject;
};

export default useQueryParams;