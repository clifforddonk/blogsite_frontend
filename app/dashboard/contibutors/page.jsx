import axiosInstance from "@/lib/axios/axiosInstance";

export default async function Home() {
  const response = await axiosInstance.get("/posts");
  const posts = response.data;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="border p-4 mt-2">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p>{post.content.substring(0, 100)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
