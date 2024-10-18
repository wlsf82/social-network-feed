"use client"

import { useState, useEffect, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react"

// Mock data
const user = {
  name: "Jane Doe",
  username: "@janedoe",
  avatar: "/placeholder.svg?height=100&width=100",
  bio: "Digital enthusiast | Coffee lover | Adventure seeker",
  followers: 1234,
  following: 567,
}

const generateMockPost = (id) => ({
  id,
  author: {
    name: `User ${id}`,
    username: `@user${id}`,
    avatar: `/placeholder.svg?height=40&width=40&text=U${id}`,
  },
  content: `This is a mock post ${id}. #SocialNetwork #InfiniteScroll`,
  likes: Math.floor(Math.random() * 100),
  comments: Math.floor(Math.random() * 20),
  shares: Math.floor(Math.random() * 10),
})

export function SocialFeedComponent() {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const loader = useRef(null)

  const loadMorePosts = () => {
    setTimeout(() => {
      const newPosts = Array.from({ length: 5 }, (_, i) => generateMockPost(posts.length + i + 1))
      setPosts((prevPosts) => [...prevPosts, ...newPosts])
      setPage((prevPage) => prevPage + 1)
    }, 1000, false)
  }

  useEffect(() => {
    loadMorePosts()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMorePosts()
      }
    }, { threshold: 1.0 })

    if (loader.current) {
      observer.observe(loader.current)
    }

    return () => observer.disconnect();
  }, [posts])

  return (
    (<div className="max-w-2xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src="https://i.pravatar.cc/150?img=1" alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-500">{user.username}</p>
            <p className="mt-2">{user.bio}</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between text-center">
            <div>
              <p className="font-bold">{user.followers.toLocaleString()}</p>
              <p className="text-gray-500">Followers</p>
            </div>
            <div>
              <p className="font-bold">{user.following.toLocaleString()}</p>
              <p className="text-gray-500">Following</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Edit Profile</Button>
        </CardFooter>
      </Card>
      <div className="space-y-4">
        {posts.map((post, index) => (
          <Card key={post.id}>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar>
                <AvatarImage src={`https://i.pravatar.cc/150?img=${index + 2}`} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-bold">{post.author.name}</p>
                <p className="text-gray-500">{post.author.username}</p>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <p>{post.content}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                {post.likes}
              </Button>
              <Button variant="ghost" size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                {post.comments}
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                {post.shares}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div ref={loader} className="text-center py-4">
        Loading...
      </div>
    </div>)
  );
}