
export default function Home() {
    return (
        <main className="w-screen h-screen flex items-center justify-center flex-col">
            <section className="flex flex-row items-center justify-around w-[80%] gap-8">
                <div className="flex flex-col items-center space-y-2">
                    <h3 className="text-3xl text-background">
                        Files to download
                    </h3>
                </div>
                <div className="flex flex-col items-center space-y-2">
                    <h3 className="text-3xl text-background">
                        Your uploaded files
                    </h3>
                </div>
            </section>
        </main>
    )
}
