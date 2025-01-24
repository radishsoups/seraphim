import React, { useState, useEffect } from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { axiosInstance } from "../axios";
import toast from "react-hot-toast";

const BlogPost = ({ post, isReply = false }) => {
  const [user, setUser] = useState({
    signedIn: false,
  });

  const [blogPost, setBlogPost] = useState(post);
  const [liked, setLiked] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [newReply, setNewReply] = useState("");
  const [replies, setReplies] = useState(post.replies || []);

  useEffect(() => {
    setBlogPost(post);
  }, [post]);

  useEffect(() => {
    axiosInstance
      .get("/profile")
      .then(response => {
        const newUser = response.data;
        setUser((prevUser) => ({
            ...prevUser,
            ...newUser
        }));
      })
      .catch(error => {
        console.error('Error in getting blogpost data.')
        toast.error(error.response.data.message)
      })
  }, []);

  const handleReplySubmit = () => {
    if (newReply.trim()) {
      const newReplyPost = {
        id: Date.now(),
        user,
        content: newReply,
        liked_by: [],
        likes: 0,
        replies: []
      };
      setReplies([...replies, newReplyPost]);
      setNewReply("");
    }
  };

  const handleReplyCancel = () => {
    setShowReplies(false);
  };

  const toggleLike = () => {
    const updatedLikes = liked ? blogPost.likes - 1 : blogPost.likes + 1;
    const updatedLikedBy = liked
      ? blogPost.liked_by.filter(id => id !== user.id)
      : [...blogPost.liked_by, user.id];

    setLiked(!liked);
    setBlogPost((prev) => ({
      ...prev,
      likes: updatedLikes,
      liked_by: updatedLikedBy
    }));
  };

  const formatLikes = (likes) => {
    return likes >= 1000 ? `${(likes / 1000).toFixed(1)}K` : likes;
  };

  return (
    <div
      className={`w-[100%] md:w-[95%] px-4 py-2 bg-lavender_blush-900 rounded-lg ${
        isReply ? "rounded-none border-[1px] border-b-0 border-ebony-900" : "shadow-md shadow-ebony-900"
      } ${isReply ? "m-0" : "m-auto"} `}
    >
      <div className="flex flex-row items-center">
        <img src={blogPost.user.profilePic} alt="Profile" className="w-20 h-20 object-cover rounded-lg my-4 mx-2" />
        <p className="flex flex-col justify-start items-start text-md my-4 ml-2">
          <span className="font-bold text-ebony text-left">{blogPost.user.display_name}</span>
          <span className="text-rose opacity-[75%]">@{blogPost.user.username}</span>
        </p>
      </div>

      <div className="w-[95%] m-auto text-lg text-ebony">{blogPost.content}</div>
      {blogPost.images && blogPost.images.length === 1 ? (
        <img
          src={blogPost.images[0]}
          alt="Blog Post"
          className="w-[95%] h-auto rounded-md m-auto mt-3 bg-ebony-800"
          style={{ maxHeight: "400px", objectFit: "cover" }}
        />
      ) : (
        <div className="grid grid-cols-2 gap-4 w-[95%] m-auto mt-3">
          {blogPost.images && blogPost.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Blog Post ${index + 1}`}
              className="w-full h-48 rounded-md object-cover bg-ebony-800"
            />
          ))}
        </div>
      )}

      <div className="w-[95%] flex flex-row justify-end items-center gap-8">
        <button onClick={toggleLike} className="mt-4 flex flex-row items-center gap-2 text-rose">
          {liked ? (
            <FcLike size="32" style={{ filter: "brightness(0) saturate(100%) invert(99%) sepia(60%) saturate(6174%) hue-rotate(284deg) brightness(101%) contrast(102%)" }} />
          ) : (
            <FcLikePlaceholder size="32" style={{ filter: "brightness(0) saturate(100%) invert(96%) sepia(51%) saturate(944%) hue-rotate(284deg) brightness(105%) contrast(104%)" }} />
          )}
          <div>
            <span className="font-bold text-lg">{formatLikes(blogPost.likes)}</span> Hearts
          </div>
        </button>
        <button
          onClick={() => setShowReplies(!showReplies)}
          className="mt-4 text-ebony"
        >
          <span className="font-bold text-lg">{replies.length}</span> Replies
        </button>
      </div>

      {showReplies && (
        <div className="mt-4">
          <input
            type="text"
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
            placeholder="Write a reply..."
            className="border-[1px] border-rose p-2 w-full rounded-md bg-transparent placeholder-ebony-700 text-ebony"
          />
          <div className="flex flex-row gap-2">
            <button
              onClick={handleReplySubmit}
              className="mt-2 bg-rose text-lavender_blush-900 py-1 px-4 rounded-md hover:bg-ebony"
            >
              Post Reply
            </button>
            <button
              onClick={handleReplyCancel}
              className="mt-2 bg-transparent text-ebony border-[1px] border-ebony py-1 px-4 rounded-md hover:text-rose hover:border-rose"
            >
              Cancel
            </button>
          </div>
          {replies.length > 0 && (
            <div className="mt-4">
              <h3 className="font-bold text-ebony mb-2">Replies</h3>
              {replies.map((reply, index) => (
                <div key={index} className="flex justify-center">
                  <BlogPost post={reply} isReply={true} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogPost;


