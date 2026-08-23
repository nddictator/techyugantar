import SectionTitle from "../Common/SectionTitle";
import SingleBlog from "./SingleBlog";
import { getAllBlogs } from "@/lib/blog";

const Blog = () => {
  const posts = getAllBlogs().slice(0, 3);

  return (
    <section
      id="blog"
      className="bg-gray-light dark:bg-bg-color-dark py-16 md:py-20 lg:py-28"
    >
      <div className="container">
        <SectionTitle
          title="Our Latest Blogs"
          paragraph="Practical, code-level write-ups from the projects we actually ship — Django, Next.js, and Flutter, with the trade-offs the docs leave out."
          center
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
          {posts.map((blog) => (
            <div key={blog.slug} className="w-full">
              <SingleBlog blog={blog} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
