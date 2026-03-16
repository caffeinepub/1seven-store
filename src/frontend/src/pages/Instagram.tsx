import { Button } from "@/components/ui/button";
import {
  BadgeCheck,
  Grid3X3,
  Heart,
  MessageCircle,
  Play,
  Tag,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const highlights = [
  { label: "New In", img: "/assets/generated/insta-post-1.dim_600x600.jpg" },
  { label: "Lookbook", img: "/assets/generated/insta-post-3.dim_600x600.jpg" },
  {
    label: "Essentials",
    img: "/assets/generated/insta-post-5.dim_600x600.jpg",
  },
  { label: "Sale", img: "/assets/generated/insta-post-7.dim_600x600.jpg" },
  { label: "BTS", img: "/assets/generated/insta-post-9.dim_600x600.jpg" },
];

const posts = [
  {
    img: "/assets/generated/insta-post-1.dim_600x600.jpg",
    likes: "2.1K",
    comments: 47,
  },
  {
    img: "/assets/generated/insta-post-2.dim_600x600.jpg",
    likes: "1.8K",
    comments: 31,
  },
  {
    img: "/assets/generated/insta-post-3.dim_600x600.jpg",
    likes: "3.4K",
    comments: 88,
  },
  {
    img: "/assets/generated/insta-post-4.dim_600x600.jpg",
    likes: "1.2K",
    comments: 24,
  },
  {
    img: "/assets/generated/insta-post-5.dim_600x600.jpg",
    likes: "2.7K",
    comments: 56,
  },
  {
    img: "/assets/generated/insta-post-6.dim_600x600.jpg",
    likes: "980",
    comments: 19,
  },
  {
    img: "/assets/generated/insta-post-7.dim_600x600.jpg",
    likes: "1.5K",
    comments: 42,
  },
  {
    img: "/assets/generated/insta-post-8.dim_600x600.jpg",
    likes: "2.3K",
    comments: 63,
  },
  {
    img: "/assets/generated/insta-post-9.dim_600x600.jpg",
    likes: "4.1K",
    comments: 102,
  },
];

const tabs = [
  { id: "posts", label: "Posts", icon: Grid3X3 },
  { id: "reels", label: "Reels", icon: Play },
  { id: "tagged", label: "Tagged", icon: Tag },
];

export function Instagram() {
  const [activeTab, setActiveTab] = useState("posts");
  const [following, setFollowing] = useState(false);

  return (
    <main className="min-h-screen bg-background pt-20 pb-16">
      <div className="max-w-2xl mx-auto px-4">
        {/* Profile Header */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pt-8 pb-6"
        >
          <div className="flex items-start gap-6 sm:gap-10">
            {/* Avatar with gradient ring */}
            <div className="relative flex-shrink-0">
              <div
                className="w-20 h-20 sm:w-28 sm:h-28 rounded-full p-[3px]"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.78 0.18 65), oklch(0.65 0.22 50), oklch(0.5 0.15 35))",
                }}
              >
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-background">
                  <img
                    src="/assets/generated/1seven-lion-logo-transparent.dim_400x400.png"
                    alt="1seven profile"
                    className="w-full h-full object-cover bg-card"
                  />
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h1 className="font-body text-xl font-semibold text-foreground">
                  @1seven
                </h1>
                <div className="flex items-center gap-2">
                  <Button
                    data-ocid="instagram.follow_button"
                    onClick={() => setFollowing(!following)}
                    size="sm"
                    className={`text-xs font-semibold h-8 px-4 transition-all duration-300 ${
                      following
                        ? "bg-muted text-foreground hover:bg-muted/80"
                        : "bg-gold text-primary-foreground hover:bg-gold/90"
                    }`}
                    style={
                      following
                        ? {}
                        : {
                            backgroundColor: "oklch(0.78 0.18 65)",
                            color: "#000",
                          }
                    }
                  >
                    {following ? "Following" : "Follow"}
                  </Button>
                  <Button
                    data-ocid="instagram.message_button"
                    size="sm"
                    variant="outline"
                    className="text-xs font-semibold h-8 px-4 border-border hover:border-gold hover:text-gold transition-colors"
                  >
                    Message
                  </Button>
                </div>
              </div>

              {/* Stats — desktop */}
              <div className="hidden sm:flex items-center gap-6 mb-3">
                <span className="font-body text-sm">
                  <strong className="text-foreground font-semibold">247</strong>{" "}
                  <span className="text-muted-foreground">posts</span>
                </span>
                <span className="font-body text-sm">
                  <strong className="text-foreground font-semibold">
                    48.2K
                  </strong>{" "}
                  <span className="text-muted-foreground">followers</span>
                </span>
                <span className="font-body text-sm">
                  <strong className="text-foreground font-semibold">312</strong>{" "}
                  <span className="text-muted-foreground">following</span>
                </span>
              </div>

              {/* Name + verified */}
              <div className="flex items-center gap-1.5 mb-2">
                <span className="font-display font-bold text-base tracking-widest text-foreground">
                  1SEVEN
                </span>
                <BadgeCheck className="w-4 h-4 text-blue-400 fill-blue-400" />
              </div>

              {/* Bio */}
              <div className="font-body text-sm text-foreground leading-relaxed">
                <p>Premium Men's Clothing &amp; Essentials</p>
                <p>👑 Wear the crown.</p>
                <p
                  className="text-gold"
                  style={{ color: "oklch(0.78 0.18 65)" }}
                >
                  🛒 Shop our latest collection ↓
                </p>
              </div>
            </div>
          </div>

          {/* Stats — mobile */}
          <div className="flex sm:hidden items-center justify-around border-t border-border mt-4 pt-4">
            <div className="text-center">
              <p className="font-body font-semibold text-foreground text-sm">
                247
              </p>
              <p className="font-body text-xs text-muted-foreground">posts</p>
            </div>
            <div className="text-center">
              <p className="font-body font-semibold text-foreground text-sm">
                48.2K
              </p>
              <p className="font-body text-xs text-muted-foreground">
                followers
              </p>
            </div>
            <div className="text-center">
              <p className="font-body font-semibold text-foreground text-sm">
                312
              </p>
              <p className="font-body text-xs text-muted-foreground">
                following
              </p>
            </div>
          </div>
        </motion.section>

        {/* Story Highlights */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="pb-6 border-b border-border"
        >
          <div className="flex items-center gap-5 overflow-x-auto pb-2 scrollbar-hide">
            {highlights.map((h, i) => (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * i + 0.3, duration: 0.35 }}
                className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer group"
              >
                <div
                  className="w-16 h-16 rounded-full p-[2.5px] transition-transform duration-200 group-hover:scale-105"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.78 0.18 65), oklch(0.65 0.22 50), oklch(0.5 0.15 35))",
                  }}
                >
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-background">
                    <img
                      src={h.img}
                      alt={h.label}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <span className="font-body text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                  {h.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Tab Bar */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="border-b border-border mb-1"
        >
          <div className="flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  data-ocid="instagram.tab"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-semibold tracking-widest uppercase transition-all duration-200 border-t-2 ${
                    isActive
                      ? "border-foreground text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </motion.section>

        {/* Posts Grid */}
        <AnimatePresence mode="wait">
          {activeTab === "posts" ? (
            <motion.div
              key="posts"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-3 gap-0.5"
            >
              {posts.map((post, i) => (
                <motion.div
                  key={post.img}
                  data-ocid={`instagram.post.item.${i + 1}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  className="relative aspect-square overflow-hidden cursor-pointer group"
                >
                  <img
                    src={post.img}
                    alt={`Post ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center gap-5 opacity-0 group-hover:opacity-100">
                    <div className="flex items-center gap-1.5 text-white">
                      <Heart className="w-5 h-5 fill-white" />
                      <span className="font-body font-semibold text-sm">
                        {post.likes}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-white">
                      <MessageCircle className="w-5 h-5 fill-white" />
                      <span className="font-body font-semibold text-sm">
                        {post.comments}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 text-muted-foreground"
            >
              <div className="w-16 h-16 rounded-full border-2 border-border flex items-center justify-center mb-4">
                {activeTab === "reels" ? (
                  <Play className="w-7 h-7" />
                ) : (
                  <Tag className="w-7 h-7" />
                )}
              </div>
              <p className="font-body text-sm">No {activeTab} yet</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
