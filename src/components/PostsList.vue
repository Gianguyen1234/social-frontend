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

        <div v-if="editingPostId === post.id">
          <textarea v-model="editedContent"></textarea>
          <button @click="handleUpdatePost(post.id)">Save</button>
          <button @click="cancelEdit">Cancel</button>
        </div>
        <div v-else>
          <p>{{ post.content }}</p>
          <div>
            <span>❤️ {{ post.likeCount }}</span>
            <span>💬 {{ post.commentCount }}</span>
          </div>
          <button @click="editPost(post)">Edit</button>
          <button @click="handleDeletePost(post.id)">Delete</button>
        </div>
      </article>

      <hr v-if="index !== posts.length - 1">
    </div>
  </div>
</template>

<script>
import { getPosts, updatePost, deletePost } from "@/services/api";
import Toast from "primevue/toast";

export default {
  components: {
    Toast,
  },
  data() {
    return {
      posts: [],
      editingPostId: null,
      editedContent: "",
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
    editPost(post) {
      this.editingPostId = post.id;
      this.editedContent = post.content;
    },
    cancelEdit() {
      this.editingPostId = null;
      this.editedContent = "";
    },
    async handleUpdatePost(postId) {
      console.log("Attempting to update post ID:", postId);
      console.log("New content:", this.editedContent);

      if (!postId) {
        console.error("Invalid postId detected:", postId);
        return;
      }

      // Check if API requires a numeric ID instead of "post_123"
      const cleanPostId = postId.replace("post_", "");

      try {
        const response = await updatePost(cleanPostId, { content: this.editedContent });
        console.log("API Update Response:", response.data);

        if (response.data?.status === "success") {
          this.posts = this.posts.map((post) =>
            post.id === postId ? { ...post, content: this.editedContent } : post
          );
          this.cancelEdit();
        } else {
          console.warn("Failed to update post:", response.data);
          alert("Failed to update post. API response: " + response.data.message);
        }
      } catch (error) {
        console.error("Error updating post:", error.response?.data || error);
        alert("Error updating post: " + (error.response?.data?.message || "Unknown error"));
      }
    },
    async handleDeletePost(postId) {
      console.log("Attempting to delete post ID:", postId);

      // Check if API requires a numeric ID
      const cleanPostId = postId.replace("post_", "");

      try {
        const response = await deletePost(cleanPostId);
        if (response.status === 200) {
          this.posts = this.posts.filter((post) => post.id !== postId);
        } else {
          console.warn("Failed to delete post:", response.data);
          alert("Failed to delete post. API response: " + response.data.message);
        }
      } catch (error) {
        console.error("Error deleting post:", error.response?.data || error);
        alert("Error deleting post: " + (error.response?.data?.message || "Unknown error"));
      }
    },
  },
  mounted() {
    this.fetchPosts();
  },
};
</script>
