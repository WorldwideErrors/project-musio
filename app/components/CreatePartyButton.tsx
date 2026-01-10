import Link from "next/link";


export default function HeaderSection() {
    return(
         <section className="relative py-14 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-800 bg-musio">
            <div className="max-w-7xl mx-auto p-4 ">
                <Link href="/create-party">Create Party</Link>
            </div>
         </section>
    )
}