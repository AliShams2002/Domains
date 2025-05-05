
export const TableLoading = () => {
    return (
        <div className="animate-pulse max-w-[1000px] w-full h-full flex items-center flex-col gap-5 py-24 px-12">
            <div className="w-36 h-2 rounded-md bg-slate-400 self-start"></div>
            <div className="w-full flex items-center justify-between">
                <div className="w-44 h-2 rounded-md bg-slate-400 self-start"></div>
                <div className="flex items-center gap-4">
                    <div className="w-44 h-2 rounded-md bg-slate-400 self-start"></div>
                    <div className="w-44 h-2 rounded-md bg-slate-400 self-start"></div>
                </div>
            </div>
            <div className="w-full flex items-center flex-col gap-4">
                <div className="w-96 md:w-[650px] lg:w-[900px] h-2 rounded-md bg-slate-400 self-start"></div>
                <div className="w-96 md:w-[650px] lg:w-[900px] h-2 rounded-md bg-slate-400 self-start"></div>
                <div className="w-96 md:w-[650px] lg:w-[900px] h-2 rounded-md bg-slate-400 self-start"></div>
                <div className="w-96 md:w-[650px] lg:w-[900px] h-2 rounded-md bg-slate-400 self-start"></div>
                <div className="w-96 md:w-[650px] lg:w-[900px] h-2 rounded-md bg-slate-400 self-start"></div>
            </div>
        </div>
    )
}