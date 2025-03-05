<template>
  <Toast />
  <div>
    <h2>Recent Posts</h2>

    <div v-if="posts.length === 0">
      No posts available.
    </div>

    <div v-for="(post, index) in posts" :key="post.id">
      <article>
        <header>
          <small>{{ new Date(post.createdAt).toLocaleString() }}</small>
        </header>
        <p>{{ post.content }}</p>
         <div>
            <span>❤️ {{ post.likeCount }}</span>
            <span>💬 {{ post.commentCount }}</span>
          </div>
      </article>

      <!-- Divider between posts -->
      <hr v-if="index !== posts.length - 1">
    </div>
  </div>
</template>

<script>
import { getPosts } from "@/services/api";
import Toast from "primevue/toast";

export default {
  components: {
    Toast,
  },
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    async fetchPosts() {
      try {
        const response = await getPosts();
        if (response.data?.status === "success" && Array.isArray(response.data.data)) {
          this.posts = response.data.data;
        } else {
          console.warn("Unexpected response format:", response.data);
          this.posts = [];
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    },
  },
  mounted() {
    this.fetchPosts();
  },
};
</script>
