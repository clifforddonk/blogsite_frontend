// pages/index.js
"use client";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  const [activeTab, setActiveTab] = useState("all");

  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "A full-stack e-commerce solution with payment integration",
      image: "/byteblogg1.png",
      category: "fullstack",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      link: "https://byteblogg.vercel.app/",
      code: "https://github.com/clifforddonk/blogsite_frontend",
    },
    {
      id: 2,
      title: "Weather Dashboard",
      description: "Real-time weather application with interactive maps",
      image: "/byteblogg1.png",
      category: "frontend",
      technologies: ["React", "OpenWeather API", "Mapbox", "CSS"],
      link: "",
      code: "",
    },
    {
      id: 3,
      title: "Task Management API",
      description: "RESTful API for task management with authentication",
      image: "/byteblogg1.png",
      category: "backend",
      technologies: ["Express", "MongoDB", "JWT", "Docker"],
      link: "",
      code: "",
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: "Personal portfolio site built with Next.js",
      image: "/byteblogg1.png",
      category: "frontend",
      technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
      link: "",
      code: "",
    },
  ];

  const skills = [
    { name: "JavaScript", level: 90 },
    { name: "React", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "Next.js", level: 75 },
    { name: "Java", level: 70 },
    { name: "MongoDB", level: 75 },
    { name: "CSS/SCSS", level: 85 },
    { name: "HTML", level: 95 },
  ];

  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter((project) => project.category === activeTab);

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Clifford Donkor - Portfolio</title>
        <meta
          name="description"
          content="Personal portfolio showcasing my work"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header/Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">
            Clifford Donkor
          </h1>
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <a href="#home" className="text-gray-800 hover:text-indigo-600">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-800 hover:text-indigo-600"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="text-gray-800 hover:text-indigo-600"
                >
                  Skills
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="text-gray-800 hover:text-indigo-600"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-800 hover:text-indigo-600"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
          <button className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="py-20 bg-gradient-to-r from-indigo-600 to-blue-500 text-white"
      >
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Hi, I'm Clifford Donkor
            </h2>
            <h3 className="text-2xl md:text-3xl mb-6">Full Stack Developer</h3>
            <p className="text-lg mb-8">
              I build exceptional digital experiences with modern technologies.
            </p>
            <div className="flex space-x-4">
              <a
                href="#contact"
                className="bg-white text-indigo-600 px-6 py-3 rounded-md font-semibold hover:bg-opacity-90 transition"
              >
                Contact Me
              </a>
              <a
                href="#projects"
                className="border border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:bg-opacity-10 transition"
              >
                View Work
              </a>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="w-64 h-72 rounded-full bg-white p-2">
              <div className="w-full h-full rounded-full overflow-hidden bg-gray-200 relative">
                {/* Replace with your image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <img src="/passport pic.jpg" alt="About Image" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">About Me</h2>
          <div className="flex flex-col md:flex-row items-center md:space-x-12">
            <div className="md:w-1/3 mb-8 md:mb-0">
              <div className="rounded-lg overflow-hidden shadow-lg bg-gray-100 h-80 flex items-center justify-center">
                <img src="/profile.jpg" alt="About Image" />
              </div>
            </div>
            <div className="md:w-2/3">
              <p className="text-lg text-gray-700 mb-6">
                I'm a passionate Full Stack Developer with expertise in building
                modern web applications. With over X years of experience in the
                industry, I've worked on various projects ranging from small
                business websites to complex enterprise applications.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                My approach to development focuses on creating clean, efficient,
                and maintainable code while delivering exceptional user
                experiences. I enjoy solving complex problems and continuously
                learning new technologies.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#"
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300 transition"
                >
                  Download Resume
                </a>
                <a
                  href="https://github.com/clifforddonk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">My Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {skills.map((skill, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-gray-700">
                    {skill.name}
                  </span>
                  <span className="text-sm text-gray-500">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-indigo-600 h-2.5 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">My Projects</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Here are some of my recent projects. Each one was carefully crafted
            to solve specific problems and demonstrate my skills.
          </p>

          {/* Project Filter */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                  activeTab === "all"
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab("frontend")}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === "frontend"
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Frontend
              </button>
              <button
                onClick={() => setActiveTab("backend")}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === "backend"
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Backend
              </button>
              <button
                onClick={() => setActiveTab("fullstack")}
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                  activeTab === "fullstack"
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Full Stack
              </button>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:-translate-y-2"
              >
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  {/* Replace with project image */}
                  <div className="text-gray-400">
                    <img src={`${project.image}`} />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.de40scription}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 text-xs px-3 py-1 rounded-full text-gray-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-3">
                    <a
                      href={`${project.link}`}
                      className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
                      target="_blank"
                    >
                      View Project
                    </a>
                    <a
                      href={`${project.code}`}
                      className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
                      target="_blank"
                    >
                      Source Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Get In Touch</h2>
          <div className="flex flex-col md:flex-row gap-12 max-w-5xl mx-auto">
            <div className="md:w-1/2">
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition w-full"
                >
                  Send Message
                </button>
              </form>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white p-6 rounded-lg shadow-md h-full">
                <h3 className="text-xl font-semibold mb-4">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-2 rounded-md mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-indigo-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p className="text-gray-600">clifforddonk@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-2 rounded-md mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-indigo-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Phone</h4>
                      <p className="text-gray-600">+233 535 563 779</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-2 rounded-md mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-indigo-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Location</h4>
                      <p className="text-gray-600">Accra, Ghana</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">Follow Me</h3>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="bg-gray-200 p-3 rounded-full hover:bg-gray-300 transition"
                    >
                      <svg
                        className="h-5 w-5 text-gray-700"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="bg-gray-200 p-3 rounded-full hover:bg-gray-300 transition"
                    >
                      <svg
                        className="h-5 w-5 text-gray-700"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="bg-gray-200 p-3 rounded-full hover:bg-gray-300 transition"
                    >
                      <svg
                        className="h-5 w-5 text-gray-700"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="bg-gray-200 p-3 rounded-full hover:bg-gray-300 transition"
                    >
                      <svg
                        className="h-5 w-5 text-gray-700"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold">Clifford Donkor</h2>
              <p className="text-gray-400">Full Stack Developer</p>
            </div>
            <div className="text-center md:text-right">
              <p>
                &copy; {new Date().getFullYear()} Clifford Donkor. All rights
                reserved.
              </p>
              <p className="text-gray-400">Made with Next.js</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
