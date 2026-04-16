"use client";

import { useMemo, useState } from "react";
import type { BlogPost, PortfolioContent, Project, ExperienceItem, Service } from "@/lib/types";

type AdminDashboardProps = {
  initialContent: PortfolioContent;
  initialPosts: BlogPost[];
  storageMode: string;
  blobEnabled: boolean;
  defaultPublishedAt: string;
};

function emptyPost(defaultPublishedAt: string): BlogPost {
  return {
    slug: "",
    title: "",
    excerpt: "",
    content: "",
    coverImage: "",
    tags: [],
    publishedAt: defaultPublishedAt,
    readTime: "4 min read",
    status: "draft"
  };
}

function updateArrayItem<T>(items: T[], index: number, nextValue: T) {
  return items.map((item, currentIndex) => (currentIndex === index ? nextValue : item));
}

export function AdminDashboard({
  initialContent,
  initialPosts,
  storageMode,
  blobEnabled,
  defaultPublishedAt
}: AdminDashboardProps) {
  const [content, setContent] = useState<PortfolioContent>(initialContent);
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [selectedSlug, setSelectedSlug] = useState<string>(initialPosts[0]?.slug || "__new__");
  const [editor, setEditor] = useState<BlogPost>(initialPosts[0] || emptyPost(defaultPublishedAt));
  const [status, setStatus] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");

  const selectedPost = useMemo(() => {
    if (selectedSlug === "__new__") {
      return null;
    }
    return posts.find((post) => post.slug === selectedSlug) || null;
  }, [posts, selectedSlug]);

  function resetEditor(post?: BlogPost | null) {
    setEditor(
      post
        ? {
            ...post
          }
        : emptyPost(defaultPublishedAt)
    );
  }

  async function saveContent() {
    setStatus("Saving site content...");
    const response = await fetch("/api/admin/content", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(content)
    });

    const data = (await response.json()) as { message?: string; error?: string };
    setStatus(data.message || data.error || "Finished.");
  }

  async function savePost() {
    setStatus("Saving post...");
    const payload = {
      ...editor,
      slug: editor.slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-|-$/g, ""),
      tags: editor.tags
    };

    const method = selectedPost ? "PUT" : "POST";
    const endpoint = selectedPost ? `/api/admin/posts/${selectedPost.slug}` : "/api/admin/posts";

    const response = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = (await response.json()) as { post?: BlogPost; posts?: BlogPost[]; message?: string; error?: string };
    if (data.posts) {
      setPosts(data.posts);
    } else if (data.post) {
      const nextPosts = posts.filter((post) => post.slug !== selectedPost?.slug && post.slug !== data.post?.slug).concat(data.post);
      setPosts(nextPosts);
      setSelectedSlug(data.post.slug);
      resetEditor(data.post);
    }
    setStatus(data.message || data.error || "Finished.");
  }

  async function removePost() {
    if (!selectedPost) {
      return;
    }

    setStatus("Deleting post...");
    const response = await fetch(`/api/admin/posts/${selectedPost.slug}`, {
      method: "DELETE"
    });

    const data = (await response.json()) as { posts?: BlogPost[]; message?: string; error?: string };
    if (data.posts) {
      setPosts(data.posts);
    }
    setSelectedSlug("__new__");
    resetEditor(null);
    setStatus(data.message || data.error || "Finished.");
  }

  async function uploadAsset(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    setUploadStatus("Uploading asset...");
    const response = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData
    });

    const data = (await response.json()) as { url?: string; error?: string; message?: string };
    if (data.url) {
      setEditor((current) => ({ ...current, coverImage: data.url || current.coverImage }));
      setUploadStatus(`Uploaded: ${data.url}`);
      return;
    }

    setUploadStatus(data.error || data.message || "Upload failed.");
  }

  function updateProject(index: number, nextProject: Project) {
    setContent((current) => ({
      ...current,
      projects: updateArrayItem(current.projects, index, nextProject)
    }));
  }

  function updateExperience(index: number, nextExperience: ExperienceItem) {
    setContent((current) => ({
      ...current,
      experience: updateArrayItem(current.experience, index, nextExperience)
    }));
  }

  function updateService(index: number, nextService: Service) {
    setContent((current) => ({
      ...current,
      services: updateArrayItem(current.services, index, nextService)
    }));
  }

  return (
    <div className="admin-shell">
      <div className="admin-topbar">
        <div>
          <p className="eyebrow">Admin dashboard</p>
          <h1>Manage portfolio content and blog posts</h1>
        </div>
        <form action="/api/auth/logout" method="post">
          <button className="button button-secondary" type="submit">
            Sign out
          </button>
        </form>
      </div>

      <div className="notice-grid">
        <div className="notice-card">
          <strong>Storage mode</strong>
          <span>{storageMode}</span>
        </div>
        <div className="notice-card">
          <strong>Uploads</strong>
          <span>{blobEnabled ? "Vercel Blob enabled" : "Configure Blob token to upload files"}</span>
        </div>
      </div>

      {status ? <p className="form-status">{status}</p> : null}

      <section className="admin-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Site content</p>
            <h2>Homepage and section editing</h2>
          </div>
          <button className="button button-primary" type="button" onClick={saveContent}>
            Save site content
          </button>
        </div>

        <div className="admin-grid">
          <label className="field">
            <span>Name</span>
            <input
              value={content.hero.name}
              onChange={(event) =>
                setContent((current) => ({
                  ...current,
                  hero: { ...current.hero, name: event.target.value }
                }))
              }
            />
          </label>
          <label className="field">
            <span>Hero title</span>
            <input
              value={content.hero.title}
              onChange={(event) =>
                setContent((current) => ({
                  ...current,
                  hero: { ...current.hero, title: event.target.value }
                }))
              }
            />
          </label>
          <label className="field field-full">
            <span>Hero subtitle</span>
            <textarea
              value={content.hero.subtitle}
              onChange={(event) =>
                setContent((current) => ({
                  ...current,
                  hero: { ...current.hero, subtitle: event.target.value }
                }))
              }
            />
          </label>
          <label className="field field-full">
            <span>Hero summary</span>
            <textarea
              rows={4}
              value={content.hero.summary}
              onChange={(event) =>
                setContent((current) => ({
                  ...current,
                  hero: { ...current.hero, summary: event.target.value }
                }))
              }
            />
          </label>
          <label className="field">
            <span>Email</span>
            <input
              value={content.contact.email}
              onChange={(event) =>
                setContent((current) => ({
                  ...current,
                  contact: { ...current.contact, email: event.target.value }
                }))
              }
            />
          </label>
          <label className="field">
            <span>Phone</span>
            <input
              value={content.contact.phone}
              onChange={(event) =>
                setContent((current) => ({
                  ...current,
                  contact: { ...current.contact, phone: event.target.value }
                }))
              }
            />
          </label>
          <label className="field field-full">
            <span>About headline</span>
            <input
              value={content.about.headline}
              onChange={(event) =>
                setContent((current) => ({
                  ...current,
                  about: { ...current.about, headline: event.target.value }
                }))
              }
            />
          </label>
          <label className="field field-full">
            <span>About summary</span>
            <textarea
              rows={5}
              value={content.about.summary}
              onChange={(event) =>
                setContent((current) => ({
                  ...current,
                  about: { ...current.about, summary: event.target.value }
                }))
              }
            />
          </label>
        </div>

        <div className="repeaters">
          <div className="repeater-card">
            <h3>Services</h3>
            {content.services.map((service, index) => (
              <div className="repeater-item" key={`${service.title}-${index}`}>
                <input
                  value={service.title}
                  onChange={(event) =>
                    updateService(index, {
                      ...service,
                      title: event.target.value
                    })
                  }
                  placeholder="Service title"
                />
                <textarea
                  rows={3}
                  value={service.description}
                  onChange={(event) =>
                    updateService(index, {
                      ...service,
                      description: event.target.value
                    })
                  }
                  placeholder="Service description"
                />
                <textarea
                  rows={3}
                  value={service.outcomes.join("\n")}
                  onChange={(event) =>
                    updateService(index, {
                      ...service,
                      outcomes: event.target.value.split("\n").filter(Boolean)
                    })
                  }
                  placeholder="One outcome per line"
                />
              </div>
            ))}
          </div>

          <div className="repeater-card">
            <h3>Projects</h3>
            {content.projects.map((project, index) => (
              <div className="repeater-item" key={`${project.slug}-${index}`}>
                <input
                  value={project.name}
                  onChange={(event) =>
                    updateProject(index, {
                      ...project,
                      name: event.target.value
                    })
                  }
                  placeholder="Project name"
                />
                <input
                  value={project.category}
                  onChange={(event) =>
                    updateProject(index, {
                      ...project,
                      category: event.target.value
                    })
                  }
                  placeholder="Category"
                />
                <textarea
                  rows={3}
                  value={project.description}
                  onChange={(event) =>
                    updateProject(index, {
                      ...project,
                      description: event.target.value
                    })
                  }
                  placeholder="Description"
                />
                <input
                  value={project.image}
                  onChange={(event) =>
                    updateProject(index, {
                      ...project,
                      image: event.target.value
                    })
                  }
                  placeholder="Image URL"
                />
              </div>
            ))}
          </div>

          <div className="repeater-card">
            <h3>Experience</h3>
            {content.experience.map((item, index) => (
              <div className="repeater-item" key={`${item.role}-${index}`}>
                <input
                  value={item.role}
                  onChange={(event) =>
                    updateExperience(index, {
                      ...item,
                      role: event.target.value
                    })
                  }
                  placeholder="Role"
                />
                <input
                  value={item.organization}
                  onChange={(event) =>
                    updateExperience(index, {
                      ...item,
                      organization: event.target.value
                    })
                  }
                  placeholder="Organization"
                />
                <input
                  value={item.period}
                  onChange={(event) =>
                    updateExperience(index, {
                      ...item,
                      period: event.target.value
                    })
                  }
                  placeholder="Period"
                />
                <textarea
                  rows={3}
                  value={item.description}
                  onChange={(event) =>
                    updateExperience(index, {
                      ...item,
                      description: event.target.value
                    })
                  }
                  placeholder="Description"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="admin-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Writing</p>
            <h2>Blog publishing</h2>
          </div>
          <button
            className="button button-secondary"
            type="button"
            onClick={() => {
              setSelectedSlug("__new__");
              resetEditor(null);
            }}
          >
            New post
          </button>
        </div>

        <div className="blog-admin-grid">
          <aside className="post-list">
            {posts.map((post) => (
              <button
                key={post.slug}
                type="button"
                className={`post-list-item ${selectedSlug === post.slug ? "active" : ""}`}
                onClick={() => {
                  setSelectedSlug(post.slug);
                  resetEditor(post);
                }}
              >
                <strong>{post.title}</strong>
                <span>{post.status}</span>
              </button>
            ))}
          </aside>

          <div className="post-editor">
            <div className="admin-grid">
              <label className="field field-full">
                <span>Title</span>
                <input value={editor.title} onChange={(event) => setEditor((current) => ({ ...current, title: event.target.value }))} />
              </label>
              <label className="field">
                <span>Slug</span>
                <input value={editor.slug} onChange={(event) => setEditor((current) => ({ ...current, slug: event.target.value }))} />
              </label>
              <label className="field">
                <span>Published date</span>
                <input
                  type="date"
                  value={editor.publishedAt}
                  onChange={(event) => setEditor((current) => ({ ...current, publishedAt: event.target.value }))}
                />
              </label>
              <label className="field field-full">
                <span>Excerpt</span>
                <textarea rows={3} value={editor.excerpt} onChange={(event) => setEditor((current) => ({ ...current, excerpt: event.target.value }))} />
              </label>
              <label className="field">
                <span>Cover image</span>
                <input
                  value={editor.coverImage}
                  onChange={(event) => setEditor((current) => ({ ...current, coverImage: event.target.value }))}
                  placeholder="https://... or /images/..."
                />
              </label>
              <label className="field">
                <span>Status</span>
                <select value={editor.status} onChange={(event) => setEditor((current) => ({ ...current, status: event.target.value as BlogPost["status"] }))}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </label>
              <label className="field field-full">
                <span>Tags</span>
                <input
                  value={editor.tags.join(", ")}
                  onChange={(event) =>
                    setEditor((current) => ({
                      ...current,
                      tags: event.target.value
                        .split(",")
                        .map((tag) => tag.trim())
                        .filter(Boolean)
                    }))
                  }
                  placeholder="AI, RAG, Product Strategy"
                />
              </label>
              <label className="field field-full">
                <span>Markdown content</span>
                <textarea rows={16} value={editor.content} onChange={(event) => setEditor((current) => ({ ...current, content: event.target.value }))} />
              </label>
            </div>

            <div className="upload-panel">
              <div>
                <strong>Asset upload</strong>
                <p>Upload a blog cover image to Vercel Blob, then it will populate the cover image field.</p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) {
                    void uploadAsset(file);
                  }
                }}
              />
            </div>
            {uploadStatus ? <p className="form-status">{uploadStatus}</p> : null}

            <div className="editor-actions">
              <button className="button button-primary" type="button" onClick={savePost}>
                Save post
              </button>
              {selectedPost ? (
                <button className="button button-danger" type="button" onClick={removePost}>
                  Delete post
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
