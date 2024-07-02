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

import { FormEvent, useEffect } from 'react';
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
import { useRouter } from "next/navigation";
import { Blog } from "@/lib/blogService";
import { createNewWaitingUser, isExistingWaitingUser } from "@/lib/waitingUserService";
import { toast } from "sonner";

export function PlayGround() {
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null);
  const [videoId, setVideoId] = useState("")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [showPostBlogModal, setShowPostBlogModal] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isPosting, setIsPosting] = useState(false)
  const [content, setContent] = useState('')
  const router = useRouter();

  useEffect(() => {
    if (slug) {
      const checkSlug = async () => {
        const res = await fetch(`/api/slug-exists?slug=${slug}`);
        const data = await res.json();
        setSlugAvailable(!data.exists);
      };
      checkSlug();
    } else {
      setSlugAvailable(null);
    }
  }, [slug]);

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
  
    const content = text
      .replace(/<title>.*?<\/title>/, '')
      .replace(/<slug>.*?<\/slug>/, '')
      .trim();
  
    return { title, slug, content };
  }


  const createNewBlog = async ({title, slug, content, uuid, author}: Blog) => {
    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, slug, uuid, author }),
      });

      if (res.ok) {
        router.push(`blogs/${slug}`);
        setSlug('')
      } else {
        toast.error(await res.json())
      }
    } catch (error: any) {
      toast.error(error?.message)
    }
  };

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
          const { title, slug, content } = extractBlogDataFromApiResponse(data?.blogPost)
          setTitle(title || '')
          setContent(content)
          setSlug(slug || '')
        }
      } catch (err) {
        toast.error('An unexpected error occurred')
      } finally {
        console.log('done')
      }
    }
    setIsLoading(false)
  }

  const handleClickPost = async () => {
    setIsPosting(true);
    await createNewBlog({title, slug, content})
    setIsPosting(false);
  }

  const handleClickPostAndJoinWaitList = async () => {
    setIsPosting(true);
    const existingWaitingUser = await isExistingWaitingUser(email)
    console.log('existingWaitingUser:', existingWaitingUser);
    if(existingWaitingUser?.email){
      createNewBlog({
        title, 
        slug, 
        content, 
        uuid: Number(existingWaitingUser?.id) || null, 
        author: existingWaitingUser?.name || null, 
      })
      return
    }
    const newWaitingUser = await createNewWaitingUser(name, email)
    console.log('newWaitingUser:', newWaitingUser);
    createNewBlog({
      title, 
      slug, 
      content, 
      uuid: Number(newWaitingUser?.id) || null, 
      author: newWaitingUser?.name || null, 
    })
    setIsPosting(false);
  }

  function isValidEmail(email: string){
    if(!email) return false
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
              <Button variant="ghost" size="icon" className="hidden">
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
                    Generate
                  </Button>
                </div>
              </div>
              {!videoId && (
                <>
                <div>
                  <Label htmlFor="title">Preview</Label>
                  <div className="h-52 w-full mx-auto border rounded-lg overflow-hidden">
                    
                    <iframe
                      className="h-52 w-full mx-auto rounded-lg overflow-hidden"
                      width="100%"
                      height="240"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
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
                      {slug &&<>{!slugAvailable ? 
                        <p className="text-sm text-red-500">Slug is not available</p> 
                        : 
                        <p className="text-sm text-green-500">Slug is available</p>
                      }</>}
                      <div className="relative ml-auto">
                        <Button
                          size="sm"
                          className="gap-2 text-sm"
                          onClick={() => setShowPostBlogModal(true)}
                          disabled={!content ||!slug ||!slugAvailable}
                        >
                          {isLoading ? 
                            <span className="flex">
                              BL<Loader2Icon className="animate-spin size-4 mt-0.5" />GING
                            </span> 
                            : 
                            <> 
                              Post <MoveUpRightIcon className="size-3.5" />
                          </>} 
                        </Button>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </>
            )}
            </div>
          </fieldset>
          <div className="lg:col-span-2 h-full">
            <fieldset className="grid gap-6 rounded-lg border p-4 h-full">
              <legend className="-ml-1 px-1 text-sm font-medium">
                Blog :: Markdown Editor
              </legend>
              <MarkdownEditor content={content} setContent={setContent} />
            </fieldset>
          </div>
        </main>
      </div>
      {/* Modal */}
      <Modal
        isOpen={showPostBlogModal}
        onClose={() => setShowPostBlogModal(false)}
        title="Share this content"
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-col items-center gap-3 w-full">
            <div className="flex flex-col gap-1 w-full">
              <Label>Your Blog URL</Label>
              <Input type="text" className="border-gray-400" disabled value={`/blogs/${slug}`} />
            </div>
            <div className="grid lg:grid-cols-3 gap-3">
              <div className="lg:col-span-2 flex flex-col gap-1 w-full">
                <Label>Your Email*</Label>
                <Input 
                  type="email" 
                  value={email}
                  placeholder="john@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="text-xs text-gray-600">It will NOT be shared publicly.</p>
              </div>
              <div className="flex flex-col gap-1 w-full">
                <Label>Name (Optional)</Label>
                <Input 
                  type="text" 
                  value={name}
                  placeholder="YoBlogs User"
                  onChange={(e) => setName(e.target.value)}
                />
                <p className="text-xs text-gray-600">It will be public</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <Button disabled={!isValidEmail(email)} variant='outline' onClick={handleClickPost} className="flex gap-2">
              Post {isPosting && <Loader2Icon className="animate-spin size-5" />}
            </Button>
            <Button disabled={!isValidEmail(email)} variant='highlight' onClick={handleClickPostAndJoinWaitList} className="flex gap-2">
              Post & Join Waitlist {isPosting && <Loader2Icon className="animate-spin size-5" />}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
