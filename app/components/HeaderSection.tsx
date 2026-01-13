type headerProps = {
    title: string;
    subtitle: string;
};

export default function HeaderSection({ title, subtitle }: headerProps) {
    return (
        <section className="relative items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 
                bg-white dark:bg-gray-800 p-6 shadow-sm dark:shadow-black/40 ">
          <div className="max-w-7xl mx-auto p-4 bg-musio">
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold text-orange-700 dark:text-orange-500 mb-6 tracking-wider ">
                {title}
              </h1>
              <p className="text-xl md:text-2xl text-orange-500 dark:text-orange-300 max-w-3xl mx-auto font-bold">
                {subtitle}
              </p>
            </div>
          </div>
        </section>
    );
}