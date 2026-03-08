
export default function ModuleNotFound({ moduleId }: { moduleId: string }) {
    return <>
        <section className="py-24 px-4 text-center">
            <h1 className="text-4xl font-bold text-white">MODULE NOT FOUND</h1>
            <p className="mt-4 text-gray-400">
                The module <span className="font-mono">{moduleId}</span> does not
                exist. Please check the URL or return to the{' '}
                <a href="/modules" className="text-blue-400 underline">
                    modules list
                </a>
                .
            </p>
        </section>
    </>
}