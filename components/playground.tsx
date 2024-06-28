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

import { FormEvent } from 'react';
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

export function PlayGround() {
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [videoId, setVideoId] = useState("")
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [mdText, setMdText] = useState('')

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
    const titleMatch = text.match(/<title>(.*?)<\/title>/);
    const slugMatch = text.match(/<slug>(.*?)<\/slug>/);
  
    const title = titleMatch ? titleMatch[1] : null;
    const slug = slugMatch ? slugMatch[1] : null;
  
    const markdown = text
      .replace(/<title>.*?<\/title>/, '')
      .replace(/<slug>.*?<\/slug>/, '')
      .trim();
  
    return { title, slug, markdown };
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    const id = extractVideoId(youtubeUrl)
    if (id) {
      setVideoId(id)
      try {
        const response = await fetch(`/api/fetchTranscript?videoId=${encodeURIComponent(id)}`);
        const data = await response.json();
  
        if (response.ok) {
          const { title, slug, markdown } = extractBlogDataFromApiResponse(data?.blogPost)
          setTitle(title || '')
          setSlug(slug || '')
          setMdText(markdown)
        } else {
          console.log('data.error', data.error)
        }
      } catch (err) {
        console.log('An unexpected error occurred');
      } finally {
        console.log('done')
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
                  <Button disabled={!youtubeUrl} onClick={handleSubmit} type="submit" >
                    {isLoading ? <Loader2Icon className="animate-spin" /> : 'Create Blog'}
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
                    {(mdText && slug) && <div className="relative ml-auto">
                      <Button
                        size="sm"
                        className="gap-2 text-sm"
                        onClick={handleShare}
                      >
                        <Link href={`/user/john-doe/${slug}`} className="flex items-center gap-2 text-sm">
                          Post
                          <MoveUpRightIcon className="size-3.5" />
                        </Link>
                      </Button>
                    </div>}
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
