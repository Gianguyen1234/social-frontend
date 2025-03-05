<template>
  <div>
    <h2>Posts</h2>
    <button @click="fetchPosts">Load Posts</button>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <h3>{{ post.content }}</h3>
        <p>Likes: {{ post.likeCount }} | Comments: {{ post.commentCount }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { getPosts } from "@/services/api";

export default {
  data() {
    return {
      posts: []
    };
  },
  methods: {
    async fetchPosts() {
  try {
    const response = await getPosts(1, 20);
    console.log("API Response:", response); // Debugging
    this.posts = response.data?.data || []; // Handle nested `data`
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

  }
};
</script>
