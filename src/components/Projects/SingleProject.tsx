import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types/project";

const SingleProject = ({ project }: { project: Project }) => {
  const { title, image, paragraph, liveUrl, tags } = project;
  return (
    <div className="group relative overflow-hidden rounded-md bg-white shadow-one dark:bg-dark">
      <Link href={liveUrl} target="_blank" className="relative block h-[300px] w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
            <span className="text-white font-semibold text-lg bg-primary px-6 py-2 rounded-full transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0 shadow-lg">
                View Live Project
            </span>
        </div>
      </Link>
      <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
        <div className="mb-4 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
                <span key={index} className="inline-block rounded bg-primary/10 px-3 py-1 text-xs font-semibold text-primary dark:bg-primary/20">
                    {tag}
                </span>
            ))}
        </div>
        <h3>
          <Link
            href={liveUrl}
            target="_blank"
            className="mb-4 block text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl"
          >
            {title}
          </Link>
        </h3>
        <p className="border-b border-body-color border-opacity-10 pb-6 text-base font-medium text-body-color dark:border-white dark:border-opacity-10 line-clamp-3">
          {paragraph}
        </p>
      </div>
    </div>
  );
};

export default SingleProject;
