import Skeleton from "./index";

export default function NotifSkeleton() {
    return (
        <div>
            <div className="border-b-[1px] border-gray-200 dark:border-gray-700 w-full" />
            <div className="flex items-start gap-5 p-3 leading-8 cursor-pointer hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-dark-bg-second w-full">
                <Skeleton
                    height={'40px'}
                    width={'40px'}
                    borderRadius={"100%"}
                />

                <div className='w-[300px]'>
                    <Skeleton width={'200px'} className="font-semibold text-sm dark:text-gray-400 " />
                    <Skeleton className="text-gray-500 dark:text-gray-200 text-sm" />
                </div>
            </div>
        </div>
    );
}
