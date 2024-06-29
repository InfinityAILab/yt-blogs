"use client"
import {
  Bird,
  Book,
  Bot,
  Code2,
  CornerDownLeft,
  ExternalLinkIcon,
  LifeBuoy,
  Loader2Icon,
  LoaderIcon,
  Mic,
  MoveUpRightIcon,
  Paperclip,
  Rabbit,
  Settings,
  Settings2,
  Share,
  SquareTerminal,
  SquareUser,
  Triangle,
  Turtle,
} from "lucide-react"

import { FormEvent } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useState } from "react"
import MarkdownEditor from "./Markdown"
import "react-markdown-editor-lite/lib/index.css"

import Modal from "./ui/modal"
import Link from "next/link"

const initialText = `
# Streamlining Your Tailwind CSS with the Prettier Plugin

When it comes to deciding the order of your Tailwind utility classes in a project, you may have had discussions with your team or within yourself. Should we sort them alphabetically? By color? Wait, let's schedule a meeting!

In this blog post, we'll take a look at the new Prettier plugin for Tailwind CSS and how it makes those sometimes difficult decisions for you. One less thing to worry about for you and your team.

## Setting Up Prettier

Assuming you may not be familiar with Prettier, we'll do the setup from scratch together. If you're already using Prettier, you only need to install the plugin to get started.

Prettier is an opinionated code formatter that ensures every file in the project is formatted the same way. It has a few options by design, as the whole idea is to stop debating and let the tool make the decisions for you.

Prettier works with a lot of languages and is supported in many editors and IDEs. Wherever Prettier works, the Tailwind CSS plugin will work as well. In this video, I'm using VS Code, but you'll be able to do a similar setup in many other editors.

Let's start by installing Prettier as a dev dependency:

\`\`\`
npm install --save-dev prettier
\`\`\`

Now, in the root of our project, I'll create a new file called \`.prettierrc.json\`. This file allows you to pass options if needed, and it also indicates that the project is using Prettier. 

Next, I'll show you how to run Prettier from the command line. I'll use the \`--check\` flag to see if there are any formatting issues in the \`index.html\` file. If there are, I can use the \`--write\` flag to automatically fix them.

\`\`\`
npx prettier --check index.html
npx prettier --write index.html
\`\`\`

However, what I prefer to do is to format the files every time I save them. To set this up in VS Code, I'll open the Extensions panel and search for the Prettier extension. Once installed, I'll go to my VS Code settings and make sure the "Format on Save" option is checked.

Now, whenever I save a file, Prettier will automatically format it for me.

## Integrating the Tailwind CSS Plugin

With Prettier set up, it's time to bring in the Tailwind CSS plugin:

\`\`\`
npm install --save-dev prettier-plugin-tailwindcss
\`\`\`

This plugin follows Prettier's auto-loading convention, so as long as you have Prettier set up in your project, it will start working automatically as soon as you install it.

Let's see the plugin in action. I'll paste some Tailwind utility classes into an HTML file and watch what happens when I save it.

The plugin will sort the classes in the same way Tailwind sorts them in the CSS output. Classes in the base layer will be sorted first, followed by the classes in the components layer, and finally the classes in the utilities layer.

The plugin will also group modifiers and place them at the end of the list, and it will handle responsive modifiers as well, grouping them by breakpoint.

If you have a custom class that doesn't come from Tailwind, the plugin will place that class at the start of the list, making it clear what element uses it.

## Wrapping Up

By design, there is no way to customize the sort order. The plugin has strongly held opinions on that, as the biggest benefit of using this plugin is to make these decisions for you, so you can stop debating and arguing with your team.

I hope this blog post has shown you how to add the Prettier plugin to an existing Tailwind CSS project and the real-life benefits it can bring. No more worrying about class sorting - let the tool handle it for you!
  `
export function PlayGround() {
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [title, setTitle] = useState("Tailwind CSS with Prettier Plugin")
  const [slug, setSlug] = useState("tailwind-with-prettier")
  const [videoId, setVideoId] = useState("")
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [mdText, setMdText] = useState(initialText)

  const extractVideoId = (url: string) => {
    try {
      const urlObj = new URL(url)
      const params = new URLSearchParams(urlObj.search)
      return params.get("v")
    } catch (error) {
      console.error("Invalid URL:", error)
      return null
    }
  }

  function extractBlogDataFromApiResponse(text: string) {
    const titleMatch = text.match(/<title>(.*?)<\/title>/)
    const slugMatch = text.match(/<slug>(.*?)<\/slug>/)

    const title = titleMatch ? titleMatch[1] : null
    const slug = slugMatch ? slugMatch[1] : null

    const markdown = text
      .replace(/<title>.*?<\/title>/, "")
      .replace(/<slug>.*?<\/slug>/, "")
      .trim()

    return { title, slug, markdown }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    const id = extractVideoId(youtubeUrl)
    if (id) {
      setVideoId(id)
      try {
        const response = await fetch(
          `/api/fetchTranscript?videoId=${encodeURIComponent(id)}`
        )
        const data = await response.json()

        if (response.ok) {
          const { title, slug, markdown } = extractBlogDataFromApiResponse(
            data?.blogPost
          )
          setTitle(title || "")
          setSlug(slug || "")
          setMdText(markdown)
        } else {
          console.log("data.error", data.error)
        }
      } catch (err) {
        console.log("An unexpected error occurred")
      } finally {
        console.log("done")
      }
    }
    setIsLoading(false)
  }

  const handleShare = () => {
    setIsShareModalOpen(true)
  }
  const closeShareModal = () => {
    setIsShareModalOpen(false)
  }

  const handleSaveText = () => {
    localStorage.setItem("markdownText", mdText)
  }

  return (
    <div className="h-screen w-full ">
      <aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
        <div className="border-b p-2">
          <Button variant="outline" size="icon" aria-label="Home">
            <Triangle className="size-5 fill-foreground transform rotate-45" />
          </Button>
        </div>
        <nav className="grid gap-1 p-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg bg-muted"
                  aria-label="Playground"
                >
                  <SquareTerminal className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Playground
              </TooltipContent>
            </Tooltip>
            {/* <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg"
                  aria-label="Models"
                >
                  <Bot className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Models
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg"
                  aria-label="API"
                >
                  <Code2 className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                API
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg"
                  aria-label="Documentation"
                >
                  <Book className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Documentation
              </TooltipContent>
            </Tooltip> 
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg"
                  aria-label="Settings"
                >
                  <Settings2 className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Settings
              </TooltipContent>
            </Tooltip> */}
          </TooltipProvider>
        </nav>
        {/* <nav className="mt-auto grid gap-1 p-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="mt-auto rounded-lg"
                  aria-label="Help"
                >
                  <LifeBuoy className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Help
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="mt-auto rounded-lg"
                  aria-label="Account"
                >
                  <SquareUser className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Account
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav> */}
      </aside>
      <div className="flex flex-col h-full ">
        <header className="fixed w-full h-[53px] left-[53px] top-0 z-10 flex items-center justify-between gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">yoblog</h1>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Settings className="size-4" />
                <span className="sr-only">Settings</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[80vh]">
              <DrawerHeader>
                <DrawerTitle>Configuration</DrawerTitle>
                <DrawerDescription>
                  Configure the settings for the model and messages.
                </DrawerDescription>
              </DrawerHeader>
              <form className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
                <fieldset className="grid gap-6 rounded-lg border p-4">
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Settings
                  </legend>
                  <div className="grid gap-3">
                    <Label htmlFor="model">Model</Label>
                    <Select>
                      <SelectTrigger
                        id="model"
                        className="items-start [&_[data-description]]:hidden"
                      >
                        <SelectValue placeholder="Select a model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="genesis">
                          <div className="flex items-start gap-3 text-muted-foreground">
                            <Rabbit className="size-5" />
                            <div className="grid gap-0.5">
                              <p>
                                Neural{" "}
                                <span className="font-medium text-foreground">
                                  Genesis
                                </span>
                              </p>
                              <p className="text-xs" data-description>
                                Our fastest model for general use cases.
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="explorer">
                          <div className="flex items-start gap-3 text-muted-foreground">
                            <Bird className="size-5" />
                            <div className="grid gap-0.5">
                              <p>
                                Neural{" "}
                                <span className="font-medium text-foreground">
                                  Explorer
                                </span>
                              </p>
                              <p className="text-xs" data-description>
                                Performance and speed for efficiency.
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="quantum">
                          <div className="flex items-start gap-3 text-muted-foreground">
                            <Turtle className="size-5" />
                            <div className="grid gap-0.5">
                              <p>
                                Neural{" "}
                                <span className="font-medium text-foreground">
                                  Quantum
                                </span>
                              </p>
                              <p className="text-xs" data-description>
                                The most powerful model for complex
                                computations.
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="temperature">Temperature</Label>
                    <Input id="temperature" type="number" placeholder="0.4" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="top-p">Top P</Label>
                    <Input id="top-p" type="number" placeholder="0.7" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="top-k">Top K</Label>
                    <Input id="top-k" type="number" placeholder="0.0" />
                  </div>
                </fieldset>
                <fieldset className="grid gap-6 rounded-lg border p-4">
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Messages
                  </legend>
                  <div className="grid gap-3">
                    <Label htmlFor="role">Role</Label>
                    <Select defaultValue="system">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="system">System</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="assistant">Assistant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="content">Content</Label>
                    <Textarea id="content" placeholder="You are a..." />
                  </div>
                </fieldset>
              </form>
            </DrawerContent>
          </Drawer>
        </header>
        <main className="pl-16 pt-16 grid flex-1 gap-4 h-full overflow-y-auto p-4 md:grid-cols-2 lg:grid-cols-3">
          <fieldset className="grid gap-6 rounded-lg border p-4 h-full">
            <legend className="-ml-1 px-1 text-sm font-medium">
              Blog :: Details
            </legend>
            <div className="flex flex-col gap-3">
              <div>
                <Label htmlFor="title">Youtube Video URL</Label>
                <div className="flex items-center justify-center gap-2">
                  <Input
                    type="text"
                    id="youtubeUrl"
                    placeholder="Paste URL here..."
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                  />
                  <Button
                    disabled={!youtubeUrl}
                    onClick={handleSubmit}
                    type="submit"
                  >
                    {isLoading ? (
                      <Loader2Icon className="animate-spin" />
                    ) : (
                      "Create Blog"
                    )}
                  </Button>
                </div>
              </div>
              {videoId && (
                <div>
                  <Label htmlFor="title">Preview</Label>
                  <div className="h-52 xl:h-72 w-full mx-auto border rounded-lg overflow-hidden">
                    <iframe
                      className="h-52 xl:h-72 w-full mx-auto rounded-lg overflow-hidden"
                      width="100%"
                      height="384"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}
              <div className="w-full">
                <fieldset className="grid gap-6 rounded-lg border p-4">
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Post :: Blog
                  </legend>
                  <div className="grid gap-3 ">
                    <Label htmlFor="model">Title</Label>
                    <Input
                      type="text"
                      placeholder=""
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <Label htmlFor="model">Slug*</Label>

                    <Input
                      type="text"
                      placeholder=""
                      id="slug"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                    />
                    {/* <Label htmlFor="model">Tags (SEO)</Label>

                    <textarea
                      className="border border-gray-300 rounded-md p-2 focus-within:ring-gray-300"
                      placeholder=""
                      // id="youtubeUrl"
                      // value={youtubeUrl}
                      // onChange={(e) => setYoutubeUrl(e.target.value)}
                    /> */}
                    {/* </div> */}
                    {mdText && slug && (
                      <div className="relative ml-auto">
                        <Button
                          size="sm"
                          className="gap-2 text-sm"
                          onClick={handleShare}
                        >
                          <Link
                            href={`/user/john-doe/${slug}`}
                            className="flex items-center gap-2 text-sm"
                          >
                            Post
                            <MoveUpRightIcon className="size-3.5" />
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </fieldset>
              </div>
            </div>
          </fieldset>
          <div className="lg:col-span-2 h-full">
            <fieldset className="grid gap-6 rounded-lg border p-4 h-full">
              <legend className="-ml-1 px-1 text-sm font-medium">
                Blog :: Markdown Editor
              </legend>
              <MarkdownEditor text={mdText} setMdText={setMdText} />
            </fieldset>
          </div>
        </main>
      </div>
      {/* Modal */}
      {/* <Modal
        isOpen={isShareModalOpen}
        onClose={closeShareModal}
        title="Share this content"
      >
        <div className="flex items-center justify-center gap-2">
          <Input type="text" />
          <Button
            className="bg-white hover:bg-gray-100 border rounded-lg text-black"
            onClick={handleSaveText}
          >
            <Link href="/user/username/blog-slug">Post</Link>
          </Button>
        </div>
      </Modal> */}
    </div>
  )
}
